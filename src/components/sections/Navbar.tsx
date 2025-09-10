import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useLogout } from '../../features/auth/api/mutations';
import {
  useAuthUser,
  useIsLoggedIn,
} from '../../features/auth/store/useAuthStore';

const Navbar: React.FC = () => {
  const isLoggedIn = useIsLoggedIn();
  const logout = useLogout();
  const user = useAuthUser();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout.mutateAsync();
    navigate('/');
  };
  return (
    <nav className='flex gap-4 text-sm'>
      {isLoggedIn && <div className='px-2 py-1'>Hi {user?.nickname}!</div>}
      {isLoggedIn && (
        <button onClick={() => navigate('/mypage')} className='nav-btn'>
          My Page
        </button>
      )}
      <button onClick={() => navigate('/rooms')} className='nav-btn'>
        Rooms
      </button>
      {isLoggedIn && (
        <button onClick={handleLogout} className='nav-btn'>
          Logout
        </button>
      )}
      {!isLoggedIn && (
        <button onClick={() => navigate('/login')} className='nav-btn'>
          Login
        </button>
      )}
      {!isLoggedIn && (
        <button
          onClick={() => navigate('/signup')}
          className='nav-btn rounded-md bg-brand aurora-hover text-white'
        >
          Sign up
        </button>
      )}
    </nav>
  );
};

export default Navbar;
