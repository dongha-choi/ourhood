import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../../stores/useAuthStore';
import useAuth from '../../hooks/useAuth';

const Navbar: React.FC = () => {
  const { logout } = useAuth();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  console.log(typeof user.id);
  return (
    <nav className='flex gap-4'>
      {user.id && <div className='link-style'>Hi {user.name}!</div>}
      {user.id && (
        <Link to='/' className='link-style'>
          My Page
        </Link>
      )}
      <button onClick={() => navigate('/rooms')} className='link-style'>
        Rooms
      </button>
      {user.id && (
        <button onClick={handleLogout} className='link-style'>
          Logout
        </button>
      )}
      {!user.id && (
        <button onClick={() => navigate('/login')} className='link-style'>
          Login
        </button>
      )}
      {!user.id && (
        <button
          onClick={() => navigate('/signup')}
          className='link-style border-2 rounded-md border-brand'
        >
          Sign up
        </button>
      )}
    </nav>
  );
};

export default Navbar;
