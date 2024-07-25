import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav>
      <Link to='/'>home</Link>
      <Link to='/login'>login</Link>
      <Link to='/signup'>sign up</Link>
      <Link to='/rooms'>rooms</Link>
    </nav>
  );
};

export default Navbar;
