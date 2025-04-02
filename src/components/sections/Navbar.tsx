import React from 'react';
import { useNavigate } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';
import useAuthStore from '../../stores/useAuthStore';

const Navbar: React.FC = () => {
  const { logout } = useAuth();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  return (
    <nav className='flex gap-4 text-sm'>
      {user.id && <div className='px-2 py-1'>Hi {user.name}!</div>}
      {user.id && (
        <button onClick={() => navigate('/mypage')} className='nav-btn'>
          My Page
        </button>
      )}
      <button onClick={() => navigate('/rooms')} className='nav-btn'>
        Rooms
      </button>
      {user.id && (
        <button onClick={handleLogout} className='nav-btn'>
          Logout
        </button>
      )}
      {!user.id && (
        <button onClick={() => navigate('/login')} className='nav-btn'>
          Login
        </button>
      )}
      {!user.id && (
        <button
          onClick={() => navigate('/signup')}
          className='nav-btn border-2 rounded-md border-brand'
        >
          Sign up
        </button>
      )}
    </nav>
  );
};

export default Navbar;
