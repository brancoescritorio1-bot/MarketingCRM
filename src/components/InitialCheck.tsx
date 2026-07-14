import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

export function InitialCheck() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    checkAdmin();
  }, []);

  const checkAdmin = async () => {
    if (user) {
      navigate('/');
      return;
    }
    
    if (localStorage.getItem('checkedAdmin')) {
      navigate('/login');
      return;
    }

    try {
      const res = await fetch('/api/auth/check-admin');
      const data = await res.json();
      localStorage.setItem('checkedAdmin', 'true');
      if (data.exists) {
        navigate('/login');
      } else {
        navigate('/setup-admin');
      }
    } catch (e) {
      navigate('/login');
    }
  };

  return <div>Verificando sistema...</div>;
}
