import { Outlet } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { InitialCheck } from './InitialCheck';

export function ProtectedRoute() {
  const { session, loading } = useAuth();

  if (loading) return <div>Loading...</div>; // TODO: Styled loader
  if (!session) return <InitialCheck />;

  return <Outlet />;
}
