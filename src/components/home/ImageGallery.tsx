import React, { useEffect, useRef, useState } from 'react';

interface ImageItem {
  id: number;
  url: string;
  alt: string;
}

const ImageGallery: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const imagesRef = useRef<ImageItem[]>([
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
  ]);

  const totalImages = imagesRef.current.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalImages);
    }, 3000);
    return () => clearInterval(interval);
  }, [totalImages]);

  // Function to get position type based on relative index
  const getPositionType = (index: number) => {
    // relative position (-2, -1, 0, 1, 2)
    const relativePos = (index - currentIndex + totalImages) % totalImages;

    if (relativePos === 0) return 'center';
    if (relativePos === 1) return 'rightSide';
    if (relativePos === totalImages - 1) return 'leftSide';
    if (relativePos === 2) return 'behindNext';
    if (relativePos === totalImages - 2) return 'behindPrev';
    return 'hidden';
  };

  return (
    <div className='pr-24 relative w-full h-[70%]  max-w-2xl mx-auto'>
      {/* Main container*/}
      <div className='relative w-full h-full perspective-1000'>
        {imagesRef.current.map((image, index) => {
          const position = getPositionType(index);

          // Skip rendering completely hidden images
          if (position === 'hidden') return null;

          let styles = {
            zIndex: 0,
            opacity: 0,
            transform: 'translateX(0) scale(0)',
            transitionDelay: '0ms',
          };

          switch (position) {
            case 'center':
              styles = {
                zIndex: 50,
                opacity: 1,
                transform: 'translateX(0) scale(1)',
                transitionDelay: '100ms',
              };
              break;
            case 'leftSide':
              styles = {
                zIndex: 40,
                opacity: 0.8,
                transform: 'translateX(-100px) scale(0.85) rotateY(10deg)',
                transitionDelay: '50ms',
              };
              break;
            case 'rightSide':
              styles = {
                zIndex: 40,
                opacity: 0.8,
                transform: 'translateX(100px) scale(0.85) rotateY(-10deg)',
                transitionDelay: '50ms',
              };
              break;
            case 'behindNext':
            case 'behindPrev':
              styles = {
                zIndex: 10,
                opacity: 0.1,
                transform: 'translateX(0) scale(0.9)',
                transitionDelay: '0ms',
              };
              break;
          }

          return (
            <div
              key={image.id}
              className='absolute top-0 left-0 rounded-lg overflow-hidden right-0 h-full transition-all duration-500 ease-in-out'
              style={{
                ...styles,
                transformOrigin: 'center center',
                boxShadow:
                  position === 'center'
                    ? '0 10px 30px rgba(0,0,0,0.3)'
                    : '0 5px 15px rgba(0,0,0,0.2)',
              }}
            >
              <img
                src={image.url}
                alt={image.alt}
                className='w-full h-full object-cover '
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ImageGallery;
