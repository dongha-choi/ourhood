import React, { useEffect, useState } from 'react';

interface ImageItem {
  id: number;
  url: string;
  alt: string;
}

const ImageT: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Using placeholder services that provide real images
  const images: ImageItem[] = [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1548705085-101177834f47?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Neighborhood scene',
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Community event',
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1533228876829-65c94e7b5025?q=80&w=2793&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Friends gathering',
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1616604248350-6038cc1af5e4?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Family outdoors',
    },
    {
      id: 5,
      url: 'https://images.unsplash.com/photo-1656582117510-3a177bf866c3?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Celebration',
    },
  ];

  const length = images.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className='relative w-[50%]'>
      {/* Cards stack container */}
      <div className='relative h-80'>
        {images.map((image, index) => {
          let isLeftSide = false;
          let isCenter = false;
          let isRightSide = false;

          if ((index + 1) % length === activeIndex) {
            isLeftSide = true;
          } else if (index === activeIndex) {
            isCenter = true;
          } else if ((index - 1) % length === activeIndex) {
            isRightSide = true;
          } else {
            return;
          }
          // Calculate z-index (center has highest)
          const zIndex = isCenter ? 30 : 10;

          // Calculate x-translation
          let translateX = 0;
          if (isCenter) translateX = -200; // Left stack
          if (isRightSide) translateX = -200; // Right stack

          return (
            <div
              key={image.id}
              className='absolute top-0 left-0 right-0 transition-all duration-700 ease-in-out transform-gpu'
              style={{
                zIndex: zIndex,
                transform: `translateX(${translateX}px) translateZ(${
                  isCenter ? 0 : -30
                }px) scale(${isCenter ? 1 : 0.9})`,
                opacity: isCenter ? 1 : 0.8,
                filter: isCenter ? 'none' : 'brightness(0.7)',
                // transformOrigin: isLeftSide
                //   ? 'right center'
                //   : isRightSide
                //   ? 'left center'
                //   : 'center',
                boxShadow: isCenter
                  ? '0 10px 30px rgba(0,0,0,0.3)'
                  : '0 5px 15px rgba(0,0,0,0.2)',
                width: '90%',
                aspectRatio: 5 / 4,
                overflow: 'hidden',
              }}
            >
              <img
                src={image.url}
                alt={image.alt}
                className='w-full h-full  object-cover rounded-lg'
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ImageT;
