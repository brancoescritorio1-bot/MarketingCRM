import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export function SetupAdminPage() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [checking, setChecking] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAdminExists();
  }, []);

  const checkAdminExists = async () => {
    if (!supabase) return;
    const { data } = await supabase
      .from('usuarios')
      .select('id')
      .eq('email', 'larapecanha2015@gmail.com')
      .maybeSingle();

    if (data) {
      navigate('/login');
    } else {
      setChecking(false);
    }
  };

  const handleSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    
    setLoading(true);
    setError('');

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: 'larapecanha2015@gmail.com',
        password,
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error('Falha ao criar usuário');

      const { error: dbError } = await (supabase as any).from('usuarios').insert([
        {
          id: authData.user.id,
          email: 'larapecanha2015@gmail.com',
          nome: 'Administrador',
          perfil: 'administrador',
          status: 'ativo',
        },
      ]);

      if (dbError) throw dbError;

      navigate('/');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (checking) return <div>Verificando...</div>;

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
