import React from 'react';

import ImageGallery from '../components/home/ImageGallery';
import Slogan from '../components/home/Slogan';

const Home: React.FC = () => {
  return (
    <div className='w-full '>
      <section className='w-full h-[600px] flex items-center gap-4'>
        <Slogan />
        <ImageGallery />
      </section>
    </div>
  );
};

export default Home;
