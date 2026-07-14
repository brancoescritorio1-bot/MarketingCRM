import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export function ContentFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(!!id);
  const [formData, setFormData] = useState({
    title: '',
    type: 'post',
    status: 'draft',
    description: '',
  });

  useEffect(() => {
    if (id) {
      fetchContent();
    }
  }, [id]);

  const fetchContent = async () => {
    try {
      const res = await fetch(`/api/contents/${id}`);
      if (res.ok) {
        const data = await res.json();
        setFormData({
          title: data.title || '',
          type: data.type || 'post',
          status: data.status || 'draft',
          description: data.description || '',
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetching(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = id ? `/api/contents/${id}` : '/api/contents';
      const method = id ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Erro ao salvar conteúdo');
      }
      navigate('/contents');
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (isFetching) {
    return <div className="text-center py-10">Carregando...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-navy-900">{id ? 'Editar Conteúdo' : 'Novo Conteúdo'}</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm space-y-4 max-w-xl">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
          <Input required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tipo (ex: Post, Vídeo, Artigo)</label>
          <Input required value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select 
            className="w-full h-10 px-3 py-2 bg-white border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent transition-all duration-200"
            value={formData.status} 
            onChange={(e) => setFormData({...formData, status: e.target.value})}
          >
            <option value="draft">Rascunho</option>
            <option value="published">Publicado</option>
            <option value="scheduled">Agendado</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
          <textarea 
            className="w-full p-3 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent transition-all duration-200 min-h-[100px]"
            value={formData.description} 
            onChange={(e) => setFormData({...formData, description: e.target.value})} 
          />
        </div>
        <Button type="submit" disabled={loading}>{loading ? 'Salvando...' : 'Salvar Conteúdo'}</Button>
      </form>
    </div>
  );
}
