import React from 'react';
import { MdOutlinePhoto } from 'react-icons/md';
import { Link } from 'react-router-dom';

import Navbar from './Navbar';

const Header: React.FC = () => {
  return (
    <header className='w-full flex justify-center border-b border-midWhite'>
      <div className='w-full max-w-screen-xl px-6 py-3 flex justify-between '>
        <section className='flex items-center text-xl font-bold text-brand '>
          <MdOutlinePhoto className='text-2xl' />
          <Link to='/'>OurHood</Link>
        </section>
        <Navbar />
      </div>
    </header>
  );
};

export default Header;
