import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

export function InitialCheck() {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    checkAdmin();
  }, []);

  const checkAdmin = async () => {
    if (!supabase) {
        navigate('/login');
        return;
    }
    
    // Check if user is already logged in
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      navigate('/');
      return;
    }

    if (localStorage.getItem('checkedAdmin')) {
      navigate('/login');
      return;
    }

    const { data } = await supabase
      .from('usuarios')
      .select('id')
      .eq('email', 'larapecanha2015@gmail.com')
      .maybeSingle();

    localStorage.setItem('checkedAdmin', 'true');

    if (data) {
      navigate('/login');
    } else {
      navigate('/setup-admin');
    }
  };

  return <div>Verificando sistema...</div>;
}
