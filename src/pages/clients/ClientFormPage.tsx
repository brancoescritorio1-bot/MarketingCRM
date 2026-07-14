import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export function ClientFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(!!id);
  const [formData, setFormData] = useState<{
    name: string;
    company: string;
    trade_name: string;
    cpf_cnpj: string;
    segment: string;
    description: string;
    status: 'active' | 'inactive';
  }>({
    name: '',
    company: '',
    trade_name: '',
    cpf_cnpj: '',
    segment: '',
    description: '',
    status: 'active',
  });

  useEffect(() => {
    if (id) {
      fetchClient();
    }
  }, [id]);

  const fetchClient = async () => {
    try {
      const res = await fetch(`/api/clients/${id}`);
      if (res.ok) {
        const data = await res.json();
        setFormData({
          name: data.name || '',
          company: data.company || '',
          trade_name: data.tradeName || '',
          cpf_cnpj: data.cpfCnpj || '',
          segment: data.segment || '',
          description: data.description || '',
          status: data.status || 'active',
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
      const url = id ? `/api/clients/${id}` : '/api/clients';
      const method = id ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Erro ao salvar cliente');
      }
      navigate('/clients');
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
      <h1 className="text-2xl font-bold text-navy-900">{id ? 'Editar Cliente' : 'Novo Cliente'}</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm space-y-4">
        <Input placeholder="Nome" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
        <Input placeholder="Empresa" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} />
        <Button type="submit" disabled={loading}>{loading ? 'Salvando...' : 'Salvar Cliente'}</Button>
      </form>
    </div>
  );
}
