import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) {
      setError('Supabase não configurado');
      return;
    }
    setLoading(true);
    setError('');

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    else navigate('/');
    setLoading(false);
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <form onSubmit={handleLogin} className="w-full max-w-sm p-8 bg-white rounded-lg shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-navy-900 mb-6">Login</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="mb-4" />
        <Input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} className="mb-6" />
        <Button type="submit" className="w-full" disabled={loading}>{loading ? 'Entrando...' : 'Entrar'}</Button>
      </form>
    </div>
  );
}
