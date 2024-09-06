import React from 'react';
import { Link } from 'react-router-dom';
import { MdOutlinePhoto } from 'react-icons/md';
import Navbar from '../Navbar';

const Header: React.FC = () => {
  return (
    <header className='px-4 py-3 flex justify-between w-full max-w-screen-xl'>
      <section className='flex items-center text-xl font-bold text-brand '>
        <MdOutlinePhoto className='text-2xl' />
        <Link to='/'>OurHood</Link>
      </section>
      <Navbar />
    </header>
  );
};

export default Header;
