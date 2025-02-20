import { useState, useCallback, useEffect } from 'react';
import { createThread, addMessage, runAssistant, waitForResponse, attachFilesToThread } from '@/lib/openai';
import { OPENAI_API_KEY } from '@/lib/env';
import { uploadFiles } from '@/lib/files';
import { FileValidationError, AssistantError, APIError } from '@/lib/errors';
import { toast } from 'sonner';

interface Message {
  id: string;
  type: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  files?: File[];
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [threadId, setThreadId] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const [currentRun, setCurrentRun] = useState<string | null>(null);
  
  // Track file upload status
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFileIds, setUploadedFileIds] = useState<string[]>([]);

  const startAssistantRun = useCallback(async (hasFiles: boolean) => {
    if (!threadId) throw new Error('No thread ID available');
    
    try {
      const instructions = hasFiles
        ? "The user has uploaded files. Please analyze them along with any messages to provide relevant insights and responses."
        : "Respond to the user's message in a helpful and informative way.";
        
      const run = await runAssistant(threadId, instructions);
      
      if (!run.id) {
        throw new Error('Failed to start assistant run: No run ID returned');
      }
      
      setCurrentRun(run.id);
      return run.id;
    } catch (error) {
      if (error instanceof Error && error.name === 'RunError') {
        throw new Error(`Assistant run failed: ${error.message}`);
      }
      throw error;
    }
  }, [threadId]);

  const handleError = (err: unknown, context: string) => {
    let errorMessage = 'An unexpected error occurred';
    
    if (err instanceof FileValidationError) {
      // File validation errors (format, size, etc)
      errorMessage = err.message; 
      toast.error('File validation failed', {
        description: err.message
      });
    } else if (err instanceof AssistantError) {
      // Assistant processing errors
      errorMessage = 'Assistant failed to process your request';
      toast.error('Processing failed', {
        description: err.message
      });
    } else if (err instanceof APIError) {
      // API errors (rate limits, auth, etc)
      errorMessage = 'API request failed';
      toast.error('API Error', {
        description: err.message
      });
    } else if (err instanceof Error) {
      // Generic errors
      errorMessage = err.message; 
      toast.error('Error', {
        description: err.message
      });
    } else {
      // Unknown errors
      console.error('Unknown error:', err);
      toast.error('An unexpected error occurred');
    }

    // Clear any system messages
    setMessages(prev => {
      const userMessages = prev.filter(m => m.type === 'user');
      if (errorMessage) {
        return [...userMessages, {
          id: Date.now().toString(),
          type: 'system',
          content: errorMessage,
          timestamp: new Date()
        }];
      }
      return userMessages;
    });

    // Reset states
    setIsLoading(false);
    setUploadProgress({});
    if (currentRun) {
      setCurrentRun(null);
    }

    setError(errorMessage);
  };
  
  useEffect(() => {
    // Create a thread when the chat is initialized
    async function initThread() {
      if (!OPENAI_API_KEY || !OPENAI_ASSISTANT_ID) {
        setError('OpenAI configuration missing. Please check your environment variables.');
        return;
      }

      try {
        // Create empty thread
        const id = await createThread();
        setThreadId(id);
      } catch (err) {
        handleError(err, 'Failed to initialize chat');
      }
    }
    initThread();
  }, [OPENAI_API_KEY]);

  const sendMessage = useCallback(async (content: string, files: File[] = []) => {
    // Validate thread ID and API key
    if (!threadId) {
      setError('Chat session not initialized. Please refresh and try again.');
      return;
    }
    if (!OPENAI_API_KEY || !OPENAI_ASSISTANT_ID) {
      setError('OpenAI configuration missing. Please check your environment variables.');
      return;
    }

    setIsLoading(true);
    setError(null);
    
    // Add user message to UI immediately
    try {
      setIsUploading(true);
      let fileIds: string[] = [];
      
      // Upload files first if any
      if (files.length > 0) {
        try {
          // Add upload status message
          setMessages(prev => [...prev, {
            id: Date.now().toString(),
            type: 'system',
            content: `Uploading ${files.length} file${files.length > 1 ? 's' : ''}...`,
            timestamp: new Date(),
            files
          }]);
           
          // Upload files and track progress
          const uploadedFiles = await uploadFiles(files, ({ filename, progress }) => {
            setUploadProgress(prev => ({
              ...prev,
              [filename]: progress
            }));
          });
          
          // Store file IDs for message
          fileIds = uploadedFiles.map(file => file.id);
          setUploadedFileIds(fileIds);

          // Update status message
          setMessages(prev => prev.map(m => 
            m.type === 'system' ? {
              ...m,
              content: 'Attaching files to conversation...'
            } : m
          ));
          
          // Attach files to thread
          const attachResult = await attachFilesToThread(threadId, fileIds);
          if (!attachResult) {
            throw new Error('Failed to attach files to thread');
          }
          
          // Remove upload status message
          setMessages(prev => prev.filter(m => m.type !== 'system'));
        } catch (err) {
          setIsUploading(false);
          setUploadProgress({});
          handleError(err, 'Failed to upload files');
          return;
        }
      }

      setIsUploading(false);

      // Add user message after successful upload
      const userMessage: Message = {
        id: Date.now().toString(),
        type: 'user',
        content,
        files,
        timestamp: new Date()
      };
      setMessages(prev => [...prev.filter(m => m.type !== 'system'), userMessage]);

      // Show processing message
      const processingMessage = {
        id: 'processing',
        type: 'system',
        content: 'Processing your request...',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, processingMessage]);

      // Add message to thread with file IDs
      const messagePayload = {
        content,
        file_ids: fileIds,
        metadata: {
          type: 'message',
          has_files: fileIds.length > 0
        }
      };
      
      // Then add the actual message
      const messageResponse = await addMessage(threadId, content);
      if (!messageResponse) {
        throw new Error('Failed to add message to thread');
      }
      
      // Clean up system messages
      setMessages(prev => prev.filter(m => m.type !== 'system'));
      
      // Start run with appropriate instructions based on file presence
      const runId = await startAssistantRun(fileIds.length > 0);

      // Poll for response
      while (!error) {
        try {
          const response = await waitForResponse(threadId, runId);
            
          // Update messages based on response
          setMessages(prev => {
            const withoutSystem = prev.filter(m => m.type !== 'system');
            const newMessages = response.map((msg, index) => ({
              id: (Date.now() + index).toString(),
              type: msg.role as 'assistant' | 'system',
              content: msg.content,
              timestamp: new Date()
            }));
              
            // If we got an actual assistant message, break the loop
            if (newMessages.some(m => m.type === 'assistant')) {
              return [...withoutSystem, ...newMessages.filter(m => m.type === 'assistant')];
            }
              
            // Keep showing the processing message
            return [...withoutSystem, processingMessage];
          });
            
          await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (err) {
          // Handle terminal error states
          if (err instanceof Error && err.message.match(/failed|cancelled|expired/)) {
            throw err;
          }
          // For transient errors, continue polling
          console.warn('Error checking run status:', err);
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
    } catch (err) {
      setMessages(prev => prev.filter(m => m.type !== 'system'));
      handleError(err, 'Failed to get response');
    } finally {
      setUploadProgress({});
      setCurrentRun(null);
      setUploadedFileIds([]);
      setIsLoading(false);
      setIsUploading(false);
    }
  }, [threadId, OPENAI_API_KEY, startAssistantRun]);

  return {
    messages,
    isLoading,
    isUploading,
    error,
    sendMessage,
    uploadProgress,
    uploadedFileIds
  };
}

export type { Message };