import { useState, useRef, useCallback, useEffect } from "react";
import { useChat } from "@/hooks/use-chat";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
    ImageIcon,
    FileUp,
    Figma,
    MonitorIcon,
    CircleUserRound,
    ArrowUpIcon,
    Paperclip,
    PlusIcon,
} from "lucide-react";

import { ChatDialogue } from './ChatDialogue';

interface UseAutoResizeTextareaProps {
    minHeight: number;
    maxHeight?: number;
}

function useAutoResizeTextarea({
    minHeight,
    maxHeight,
}: UseAutoResizeTextareaProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const adjustHeight = useCallback(
        (reset?: boolean) => {
            const textarea = textareaRef.current;
            if (!textarea) return;

            if (reset) {
                textarea.style.height = `${minHeight}px`;
                return;
            }

            // Temporarily shrink to get the right scrollHeight
            textarea.style.height = `${minHeight}px`;

            // Calculate new height
            const newHeight = Math.max(
                minHeight,
                Math.min(
                    textarea.scrollHeight,
                    maxHeight ?? Number.POSITIVE_INFINITY
                )
            );

            textarea.style.height = `${newHeight}px`;
        },
        [minHeight, maxHeight]
    );

    useEffect(() => {
        // Set initial height
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = `${minHeight}px`;
        }
    }, [minHeight]);

    // Adjust height on window resize
    useEffect(() => {
        const handleResize = () => adjustHeight();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [adjustHeight]);

    return { textareaRef, adjustHeight };
}

export function VercelV0Chat() {
    const [value, setValue] = useState("");
    const [files, setFiles] = useState<File[]>([]);
    const { 
        messages, 
        isLoading, 
        isUploading,
        error, 
        sendMessage, 
        uploadProgress,
        uploadedFileIds 
    } = useChat();
    const { textareaRef, adjustHeight } = useAutoResizeTextarea({
        minHeight: 56,
        maxHeight: 200,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!value.trim() && files.length === 0) return;

        setValue("");
        adjustHeight(true);
        await sendMessage(value, files);
        setFiles([]);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(e.target.files || []);
        setFiles(prev => [...prev, ...selectedFiles]);
    };

    const removeFile = (index: number) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
    };
    const hasOpenAIConfig = Boolean(import.meta.env.VITE_OPENAI_API_KEY && import.meta.env.VITE_OPENAI_ASSISTANT_ID);

    if (!hasOpenAIConfig) {
        return (
            <div className="w-full max-w-3xl mx-auto flex flex-col gap-4">
                <div className="flex flex-col items-center justify-center p-8 text-center bg-white rounded-xl border border-neutral-200 shadow-sm">
                    <h2 className="text-2xl font-semibold mb-4">OpenAI Configuration Required</h2>
                    <p className="text-muted-foreground mb-6">
                        To use the chat feature, you need to configure your OpenAI API key and Assistant ID.
                        Add these to your <code className="px-2 py-1 bg-neutral-100 rounded">.env</code> file:
                    </p>
                    <pre className="bg-neutral-100 p-4 rounded-lg text-sm mb-6 text-left">
                        <code>{`VITE_OPENAI_API_KEY=your_api_key_here
VITE_OPENAI_ASSISTANT_ID=your_assistant_id_here`}</code>
                    </pre>
                    <Button 
                        variant="outline" 
                        onClick={() => window.open('https://platform.openai.com/api-keys', '_blank')}
                    >
                        Get API Key
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-3xl mx-auto flex flex-col gap-4">
            <ChatDialogue 
                messages={messages} 
                isLoading={isLoading} 
                error={error}
                uploadProgress={uploadProgress}
            />

            <form onSubmit={handleSubmit} className="relative">
                <div className="relative flex flex-col w-full bg-white rounded-xl border border-neutral-200 shadow-sm">
                    {files.length > 0 && (
                        <div className="p-4 border-b border-neutral-200">
                            <div className="flex flex-wrap gap-2">
                                {files.map((file, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-2 bg-neutral-100 px-3 py-1.5 rounded-full text-sm"
                                    >
                                        <Paperclip className="w-4 h-4 text-neutral-500" />
                                        <span className="max-w-[200px] truncate">
                                            {file.name}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => removeFile(index)}
                                            className="text-neutral-400 hover:text-neutral-600"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="flex items-end p-4 gap-4">
                        <Textarea
                            ref={textareaRef}
                            tabIndex={0}
                            rows={1}
                            value={value}
                            onChange={(e) => {
                                setValue(e.target.value);
                                adjustHeight();
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSubmit(e);
                                }
                            }}
                            placeholder="Send a message..."
                            spellCheck={false}
                            className="min-h-[56px] w-full resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none sm:text-sm"
                        />
                        <div className="flex gap-2 items-center">
                            <input
                                type="file"
                                id="file-upload"
                                multiple
                                className="hidden"
                                onChange={handleFileChange}
                            />
                            <label
                                htmlFor="file-upload"
                                className="p-2 -m-2 hover:bg-neutral-100 rounded-lg cursor-pointer transition-colors"
                            >
                                <PlusIcon className="w-6 h-6 text-neutral-600" />
                            </label>
                            <button
                                type="submit"
                                disabled={!value.trim() && files.length === 0 || isUploading}
                                className="bg-primary text-white p-2 -m-2 rounded-lg opacity-90 hover:opacity-100 transition-opacity disabled:opacity-50"
                            >
                                <ArrowUpIcon className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}