import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export function ClientFormPage() {
  const navigate = useNavigate();
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    const { error } = await supabase.from('clients').insert([formData] as any);
    if (error) alert(error.message);
    else navigate('/clients');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-navy-900">Novo Cliente</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm space-y-4">
        <Input label="Nome" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
        <Input label="Empresa" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} />
        <Button type="submit">Salvar Cliente</Button>
      </form>
    </div>
  );
}
