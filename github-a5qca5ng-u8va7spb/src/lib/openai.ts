import { OPENAI_API_KEY, OPENAI_ASSISTANT_ID } from './env';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  attachments?: Array<{ type: 'file_attachment', file_id: string }>;
}

export async function createThread() {
  try {
    // Validate API key
    if (!OPENAI_API_KEY) {
      throw new Error('OpenAI API key is not configured');
    }

    const response = await fetch('https://api.openai.com/v1/threads', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
        'OpenAI-Beta': 'assistants=v2'
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to create thread');
    }

    const data = await response.json();
    return data.id;
  } catch (error) {
    console.error('Error creating thread:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      status: error instanceof Response ? error.status : undefined
    });
    throw error;
  }
}

export async function attachFilesToThread(threadId: string, fileIds: string[]) {
  try {
    if (!fileIds.length) return;

    const response = await fetch(`https://api.openai.com/v1/threads/${threadId}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
        'OpenAI-Beta': 'assistants=v2'
      },
      body: JSON.stringify({
        role: 'user',
        content: 'Analyzing attached files...',
        file_ids: fileIds
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to attach files');
    }

    return await response.json();
  } catch (error) {
    console.error('Error attaching files:', error);
    throw error;
  }
}

export async function addMessage(threadId: string, content: string, fileIds: string[] = []) {
  try {
    const messagePayload = {
      role: 'user',
      content,
      attachments: fileIds.map(id => ({
        type: 'file_attachment',
        file_id: id
      }))
    };

    const response = await fetch(`https://api.openai.com/v1/threads/${threadId}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
        'OpenAI-Beta': 'assistants=v2'
      },
      body: JSON.stringify(messagePayload)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to add message');
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding message:', {
      error: error instanceof Error ? error.message : 'Unknown error'
    });
    throw error;
  }
}

export async function runAssistant(threadId: string, instructions?: string) {
  try {
    if (!OPENAI_ASSISTANT_ID) {
      throw new Error('Assistant ID is not configured');
    }

    const payload: any = {
      assistant_id: OPENAI_ASSISTANT_ID
    };

    if (instructions) {
      payload.instructions = instructions;
    }

    const response = await fetch(`https://api.openai.com/v1/threads/${threadId}/runs`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
        'OpenAI-Beta': 'assistants=v2'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorData = await response.json();
      const error = new Error(errorData.error?.message || 'Failed to run assistant');
      error.name = 'RunError';
      throw error;
    }

    return await response.json();
  } catch (error) {
    console.error('Error running assistant:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      type: error instanceof Error ? error.name : 'Unknown type'
    });
    throw error;
  }
}

export async function checkRunStatus(threadId: string, runId: string) {
  try {
    const response = await fetch(`https://api.openai.com/v1/threads/${threadId}/runs/${runId}`, {
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
        'OpenAI-Beta': 'assistants=v2'
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to check run status');
    }

    console.log('Run status:', response.status);
    return await response.json();
  } catch (error) {
    console.error('Error checking run status:', {
      error: error instanceof Error ? error.message : 'Unknown error'
    });
    throw error;
  }
}

export async function getMessages(threadId: string) {
  try {
    const response = await fetch(`https://api.openai.com/v1/threads/${threadId}/messages?order=desc&limit=1`, {
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
        'OpenAI-Beta': 'assistants=v2'
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to get messages');
    }
    console.log('Messages response:', response.status);

    return await response.json();
  } catch (error) {
    console.error('Error getting messages:', {
      error: error instanceof Error ? error.message : 'Unknown error'
    });
    throw error;
  }
}

export async function waitForResponse(threadId: string, runId: string): Promise<Message[]> {
  const maxRetries = 180; // Maximum number of retries (3 minutes total)
  const retryDelay = 1000; // Check every second
  const terminalStates = ['completed', 'failed', 'cancelled', 'expired'];
  let retries = 0;

  while (true) {
    try {
      const runStatus = await checkRunStatus(threadId, runId);
      const status = runStatus.status;

      // Update UI with status
      if (status === 'in_progress') {
        return [{
          role: 'system',
          content: 'Thinking...'
        }];
      }

      if (status === 'completed') {
        break;
      }

      if (status === 'failed') {
        throw new Error(`Assistant run failed: ${runStatus.last_error?.message || 'Unknown error'}`);
      }

      if (status === 'cancelled') {
        throw new Error('Assistant run was cancelled');
      }

      if (status === 'expired') {
        throw new Error('Run expired: took too long to complete');
      }

      // For non-terminal states, check timeout and continue waiting
      if (retries >= maxRetries) {
        throw new Error('Timeout: Assistant took too long to respond');
      }

      await new Promise(resolve => setTimeout(resolve, retryDelay));
      retries++;
    } catch (error) {
      if (error instanceof Error && terminalStates.some(state => error.message.includes(state))) {
        throw error;
      }
      console.warn('Error checking run status:', error);
      // For transient errors, retry
      if (retries >= maxRetries / 2) { // Use shorter timeout for errors
        throw new Error('Failed to check run status after multiple retries');
      }
      retries++;
      await new Promise(resolve => setTimeout(resolve, retryDelay));
    }
  }

  const messagesResponse = await getMessages(threadId);
  if (!messagesResponse.data || !Array.isArray(messagesResponse.data)) {
    throw new Error('Invalid response format from messages endpoint');
  }

  // Get all messages from the response
  const messages = messagesResponse.data
    .filter(msg => msg.role === 'assistant' && msg.content?.[0]?.text?.value)
    .map(msg => ({
      role: msg.role,
      content: msg.content[0].text.value
    }));

  if (!messages.length) {
    throw new Error('No valid response received from assistant');
  }

  return messages;
}