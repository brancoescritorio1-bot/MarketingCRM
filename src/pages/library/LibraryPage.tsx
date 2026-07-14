import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Trash2, ExternalLink } from 'lucide-react';

export function LibraryPage() {
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [category, setCategory] = useState('geral');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/library');
      if (res.ok) {
        const data = await res.json();
        setFiles(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleAddFile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/library', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, url, category })
      });
      if (res.ok) {
        const newFile = await res.json();
        setFiles([...files, newFile]);
        setTitle('');
        setUrl('');
      } else {
        alert('Erro ao salvar arquivo');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Deseja excluir este link?')) return;
    try {
      const res = await fetch(`/api/library/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setFiles(files.filter(f => f.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-navy-900">Biblioteca de Arquivos</h1>
      
      <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
        <h2 className="text-lg font-medium text-navy-900 mb-4">Adicionar Link</h2>
        <form onSubmit={handleAddFile} className="flex flex-col gap-4 max-w-xl">
          <Input required placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)} />
          <Input required placeholder="URL (Google Drive, Dropbox, etc)" value={url} onChange={(e) => setUrl(e.target.value)} />
          <select 
            className="h-10 px-3 py-2 bg-white border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-navy-500"
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="geral">Geral</option>
            <option value="templates">Templates</option>
            <option value="ativos">Ativos / Logos</option>
          </select>
          <Button type="submit" disabled={saving}>{saving ? 'Adicionando...' : 'Adicionar'}</Button>
        </form>
      </div>

      <div className="bg-white rounded-lg border border-gray-100 shadow-sm">
        {loading ? (
          <div className="p-6 text-center text-gray-500">Carregando...</div>
        ) : files.length === 0 ? (
          <div className="p-6 text-center text-gray-500">Nenhum arquivo cadastrado.</div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase">
              <tr>
                <th className="px-6 py-4">Título</th>
                <th className="px-6 py-4">Categoria</th>
                <th className="px-6 py-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {files.map(file => (
                <tr key={file.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-navy-900">{file.title}</td>
                  <td className="px-6 py-4 text-gray-600 capitalize">{file.category}</td>
                  <td className="px-6 py-4 flex items-center justify-end gap-3">
                    <a href={file.url} target="_blank" rel="noreferrer" className="text-navy-600 hover:text-navy-900">
                      <ExternalLink className="w-5 h-5" />
                    </a>
                    <button onClick={() => handleDelete(file.id)} className="text-red-500 hover:text-red-700">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
