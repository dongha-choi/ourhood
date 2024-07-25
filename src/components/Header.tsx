import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header>
      <h1>header</h1>
      <Link to='/'>home</Link>
      <Link to='/login'>login</Link>
      <Link to='/signup'>sign up</Link>
      <Link to='/rooms'>rooms</Link>
    </header>
  );
};

export default Header;
