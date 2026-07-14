import { useState } from 'react';
import { supabase } from '@/lib/supabase';

const ALLOWED_TYPES = [
  'image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/svg+xml',
  'application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/msword', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'text/plain', 'application/zip', 'application/x-rar-compressed',
  'video/mp4', 'video/quicktime', 'video/x-msvideo', 'audio/mpeg'
];

export function useFileUpload() {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const uploadFile = async (
    bucket: string,
    path: string,
    file: File
  ) => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      setError('Tipo de arquivo não permitido.');
      return null;
    }

    setLoading(true);
    setProgress(0);
    setError(null);

    // Using XHR to track progress as Supabase JS SDK doesn't natively support it
    return new Promise((resolve, reject) => {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      
      const xhr = new XMLHttpRequest();
      xhr.open('POST', `${supabaseUrl}/storage/v1/object/${bucket}/${path}`);
      xhr.setRequestHeader('Authorization', `Bearer ${supabaseAnonKey}`);
      xhr.setRequestHeader('apikey', supabaseAnonKey);

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 100);
          setProgress(percent);
        }
      };

      xhr.onload = () => {
        setLoading(false);
        if (xhr.status === 200 || xhr.status === 201) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          setError('Erro ao enviar arquivo: ' + xhr.statusText);
          reject(xhr.statusText);
        }
      };

      xhr.onerror = () => {
        setLoading(false);
        setError('Erro na rede ao enviar arquivo.');
        reject('Erro na rede.');
      };

      xhr.send(file);
    });
  };

  return { uploadFile, loading, progress, error };
}
