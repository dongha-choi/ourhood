import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import useAuthStore from '../stores/useAuthStore';

const Navbar: React.FC = () => {
  const { logout } = useAuthContext();
  const { user } = useAuthStore();
  console.log(user);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };
  const goToLogin = () => navigate('/login');
  const goToSignup = () => navigate('/signup');
  return (
    <nav className='flex gap-4'>
      {user.id && <div className='link-style'>Hi {user.name}!</div>}
      {user.id && (
        <Link to='/' className='link-style'>
          My Page
        </Link>
      )}
      <Link to='/rooms' className='link-style'>
        Rooms
      </Link>
      {user.id && (
        <button onClick={handleLogout} className='link-style'>
          Logout
        </button>
      )}
      {!user.id && (
        <button onClick={goToLogin} className='link-style'>
          Login
        </button>
      )}
      {!user.id && (
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
