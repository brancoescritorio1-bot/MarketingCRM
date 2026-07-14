import { Outlet } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { InitialCheck } from './InitialCheck';

export function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>; // TODO: Styled loader
  if (!user) return <InitialCheck />;

  return <Outlet />;
}
