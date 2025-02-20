import React from 'react';
import { cn } from "@/lib/utils";
import { Bot, User, Paperclip } from 'lucide-react';
import { motion } from 'framer-motion';

interface Message {
  id: string;
  type: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  files?: File[];
}

interface ChatDialogueProps {
  messages: Message[];
  isLoading?: boolean;
  error?: string | null;
  uploadProgress?: {[key: string]: number};
}

export function ChatDialogue({ messages, isLoading, error, uploadProgress }: ChatDialogueProps) {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="w-full bg-white rounded-xl border border-neutral-200 shadow-sm">
      <div 
        ref={scrollRef}
        className="h-[calc(100vh-20rem)] overflow-y-auto p-4 space-y-6"
      >
        {messages.map((message) => (
          <motion.div 
            key={`${message.id}-${message.type}-${message.timestamp.getTime()}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={message.type === 'system' ? "flex justify-center" : cn(
              "flex gap-3 items-start",
              message.type === 'user' && "flex-row-reverse"
            )}
          >
            {message.type === 'system' ? (
              <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm flex items-center gap-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
                {message.content}
                {uploadProgress && Object.keys(uploadProgress).length > 0 && (
                  <div className="mt-2 space-y-2">
                    {Object.entries(uploadProgress).map(([filename, progress]) => (
                      <div key={`upload-${filename}-${progress}`} className="flex items-center gap-2">
                        <div className="w-full h-1 bg-blue-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-500 transition-all duration-300"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <span className="text-xs whitespace-nowrap">{progress}%</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
            <div 
              className={cn(
                "h-8 w-8 rounded-lg flex items-center justify-center shrink-0",
                message.type === 'assistant' ? "bg-primary/10" : "bg-neutral-100"
              )}>
              {message.type === 'assistant' ? (
                <Bot className="h-5 w-5 text-primary" />
              ) : (
                <User className="h-5 w-5 text-neutral-600" />
              )}
            </div>)}

            <div 
              className={cn(
                "rounded-2xl px-4 py-2 max-w-[80%]",
                message.type === 'assistant' && "bg-neutral-100 text-neutral-900",
                message.type === 'user' && "bg-primary text-white",
                "transition-all duration-200 hover:shadow-md"
              )}
            >
              <p className="text-sm sm:text-base whitespace-pre-wrap leading-relaxed prose prose-sm max-w-none">
                {message.content}
              </p>
              {message.files && message.files.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {message.files.map((file, index) => (
                    <div
                      key={index}
                      className="text-xs bg-black/5 px-2 py-1 rounded-full flex items-center gap-1"
                    >
                      <Paperclip className="w-3 h-3" />
                      {file.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}

        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center gap-2 text-neutral-500"
          >
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
              <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
            </div>
            <span className="text-sm text-center">
              {messages.find(m => m.type === 'system')?.content || 'Processing...'}
            </span>
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center gap-2 text-red-500 bg-red-50/50 backdrop-blur-sm p-6 rounded-xl border border-red-100 shadow-sm"
          >
            <div className="text-center space-y-2">
              <p className="text-sm font-medium">{error}</p>
              <p className="text-xs text-red-400">
                Need help? Check our <a href="#" className="underline hover:text-red-600">documentation</a>
              </p>
            </div>
            <button
              className="mt-2 px-4 py-1.5 text-xs font-medium text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-full transition-colors"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </motion.div>
        )}

        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <Bot className="h-12 w-12 text-neutral-300 mb-4" />
            <h3 className="text-lg font-medium text-neutral-900 mb-2">
              How can I help with your marketing?
            </h3>
            <p className="text-sm text-neutral-500 max-w-sm">
              Ask me anything about digital marketing, content strategy, or how to improve your current campaigns.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}