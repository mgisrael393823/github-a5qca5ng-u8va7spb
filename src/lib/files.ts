import { OPENAI_API_KEY } from './env';
import { toast } from 'sonner';
import { FileValidationError, APIError } from '@/lib/errors';

interface UploadProgress {
  filename: string;
  progress: number;
}

interface FileError {
  file: string;
  message: string;
}

const ALLOWED_TYPES = ['pdf', 'doc', 'docx', 'txt'];
const MAX_FILE_SIZE = 512 * 1024 * 1024; // 512MB

type ProgressCallback = (progress: UploadProgress) => void;

interface OpenAIFile {
  id: string;
  bytes: number;
  created_at: number;
  filename: string;
  purpose: string;
}

export async function uploadFiles(files: File[], onProgress?: (progress: UploadProgress) => void): Promise<OpenAIFile[]> {
  if (!OPENAI_API_KEY) {
    throw new Error('OpenAI API key is not configured');
  }
  
  // Validate files before uploading
  for (const file of files) {
    const extension = file.name.split('.').pop()?.toLowerCase();
    
    if (!extension || !ALLOWED_TYPES.includes(extension)) {
      throw new FileValidationError(
        `"${file.name}" is not supported. Allowed formats: ${ALLOWED_TYPES.join(', ')}`
      );
    }
    
    if (file.size > MAX_FILE_SIZE) {
      throw new FileValidationError(
        `"${file.name}" is too large (${(file.size / 1024 / 1024).toFixed(1)}MB). Max size: 512MB`
      );
    }
  }

  const uploadedFiles: OpenAIFile[] = [];
  const errors: FileError[] = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('purpose', 'assistants');

      // Report initial progress
      onProgress?.({
        filename: file.name,
        progress: 0
      });

      // Upload file to OpenAI
      const response = await fetch('https://api.openai.com/v1/files', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new APIError(errorData.error?.message || 'File upload failed');
      }

      const data: OpenAIFile = await response.json();
      
      // Validate file ID was returned
      if (!data.id) {
        throw new FileValidationError('File was rejected. Please try a different format.');
      }

      uploadedFiles.push(data);

      // Report completion
      onProgress?.({
        filename: file.name,
        progress: 100,
        fileId: data.id
      });
      
      console.log('File uploaded successfully:', {
        name: file.name,
        fileId: data.id,
        size: data.bytes,
        purpose: data.purpose
      });
      
      toast.success('File uploaded', {
        description: `"${file.name}" was uploaded successfully`
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      errors.push({
        file: file.name,
        message: errorMessage
      });
      console.error('File upload error:', {
        file: file.name,
        error: errorMessage
      });
    }
  }

  if (errors.length > 0) {
    const errorMessages = errors.map(err => `${err.file}: ${err.message}`);
    throw new FileValidationError(`Upload failed:\n${errorMessages.join('\n')}`);
  }

  return uploadedFiles;
}