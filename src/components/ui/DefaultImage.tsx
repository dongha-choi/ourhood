import React from 'react';

interface DefaultImageProps {
  roomName?: string;
  style: string;
}

const DefaultImage: React.FC<DefaultImageProps> = ({ roomName, style }) => {
  return (
    <div className={`flex justify-center items-center bg-default ${style}`}>
      {roomName && <p className='text-white text-2xl'>{roomName}</p>}
    </div>
  );
};

export default DefaultImage;
