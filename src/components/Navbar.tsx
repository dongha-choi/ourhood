import React from 'react';
import { useCookies } from 'react-cookie';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const [cookies] = useCookies(['token']);
  const token = cookies.token;
  const { logout } = useAuthContext();
  console.log(token);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };
  const goToLogin = () => [navigate('/login', { state: pathname })];
  const goToSignup = () => [navigate('/signup', { state: pathname })];
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
