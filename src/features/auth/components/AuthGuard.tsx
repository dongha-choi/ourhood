import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import { useIsLoggedIn } from '../store/useAuthStore';

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const navigate = useNavigate();
  const isLoggedIn = useIsLoggedIn();

  if (!isLoggedIn) {
    alert('Please login!');
    navigate('/login');
  }

  return <>{children}</>;
};

export default AuthGuard;
