import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className='flex gap-4'>
      <Link to='/rooms' className='link-style'>
        Rooms
      </Link>
      <Link to='/login' className='link-style'>
        Login
      </Link>
      <Link
        to='/signup'
        className='link-style border-2 rounded-md border-brand'
      >
        Sign up
      </Link>
    </nav>
  );
};

export default Navbar;
