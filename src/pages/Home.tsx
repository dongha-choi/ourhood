import React from 'react';

import ImageGallery from '../components/home/ImageGallery';
import Slogan from '../components/home/Slogan';
import ImageUploader from '../features/image-upload/components/ImageUploader';

const Home: React.FC = () => {
  return (
    <div className='w-full '>
      <ImageUploader feature='moment' />
      <section className='w-full h-[600px] flex items-center gap-4'>
        <Slogan />
        <ImageGallery />
      </section>
    </div>
  );
};

export default Home;
