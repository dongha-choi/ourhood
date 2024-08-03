import { useContext } from 'react';
import { AuthContextType, AuthContext } from '../context/AuthContext';

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
