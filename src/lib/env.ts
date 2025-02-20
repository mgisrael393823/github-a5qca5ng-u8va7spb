export function getEnvVar(key: string): string {
  const value = import.meta.env[key]?.trim();
  if (!value) {
    console.warn(`Environment variable ${key} is not set`);
  }
  return value || null;
}

export const OPENAI_API_KEY = getEnvVar('VITE_OPENAI_API_KEY');
export const OPENAI_ASSISTANT_ID = getEnvVar('VITE_OPENAI_ASSISTANT_ID');