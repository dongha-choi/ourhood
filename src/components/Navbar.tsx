import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { getAccessToken } from '../utils/accessTokenManager';

const Navbar: React.FC = () => {
  const { logout } = useAuthContext();
  const token = getAccessToken();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };
  const goToLogin = () => navigate('/login');
  const goToSignup = () => navigate('/signup');
  return (
    <nav className='flex gap-4'>
      <Link to='/rooms' className='link-style'>
        Rooms
      </Link>
      {token && (
        <button onClick={handleLogout} className='link-style'>
          Logout
        </button>
      )}
      {!token && (
        <button onClick={goToLogin} className='link-style'>
          Login
        </button>
      )}
      {!token && (
        <button
          onClick={goToSignup}
          className='link-style border-2 rounded-md border-brand'
        >
          Sign up
        </button>
      )}
    </nav>
  );
};

export default Navbar;
