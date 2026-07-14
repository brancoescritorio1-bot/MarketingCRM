import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export function SetupAdminPage() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSetup = async (e: React.FormEvent) => {
    e.preventDefault();
        
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'larapecanha2015@gmail.com', password, name: 'Administrador' })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Erro ao configurar admin');
      }
      
      navigate('/');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <form onSubmit={handleSetup} className="w-full max-w-sm p-8 bg-white rounded-lg shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-navy-900 mb-6">Configurar Administrador</h1>
        <p className="mb-4 text-gray-600">Defina a senha para larapecanha2015@gmail.com</p>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <Input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} className="mb-6" />
        <Button type="submit" className="w-full" disabled={loading}>{loading ? 'Configurando...' : 'Concluir'}</Button>
      </form>
    </div>
  );
}
