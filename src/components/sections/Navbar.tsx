import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useLogout } from '../../features/auth/api/mutations';
import { useAuthUser } from '../../features/auth/store/useAuthStore';
import { User } from '../../features/auth/types';

const Navbar: React.FC = () => {
  const logout = useLogout();
  const { userId: id, nickname: name } = useAuthUser() as User;
  const navigate = useNavigate();
  const handleLogout = () => {
    logout.mutateAsync();
    navigate('/');
  };
  return (
    <nav className='flex gap-4 text-sm'>
      {id && <div className='px-2 py-1'>Hi {name}!</div>}
      {id && (
        <button onClick={() => navigate('/mypage')} className='nav-btn'>
          My Page
        </button>
      )}
      <button onClick={() => navigate('/rooms')} className='nav-btn'>
        Rooms
      </button>
      {id && (
        <button onClick={handleLogout} className='nav-btn'>
          Logout
        </button>
      )}
      {!id && (
        <button onClick={() => navigate('/login')} className='nav-btn'>
          Login
        </button>
      )}
      {!id && (
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
