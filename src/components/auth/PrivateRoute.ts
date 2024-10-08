import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../stores/useAuthStore';

interface PrivateRouteProps {
  children: ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const navigate = useNavigate();
  const userId = useAuthStore((state) => state.user.id);

  useEffect(() => {
    if (!userId) {
      alert('Please login!');
      navigate('/login');
    }
  }, [userId, navigate]);

  if (!userId) {
    return null;
  }

  return children;
}
