import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Header: React.FC = () => {
  return (
    <header>
      <section>
        <Link to='/'>OurHood</Link>
      </section>
      <Navbar />
    </header>
  );
};

export default Header;
