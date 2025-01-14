import React from 'react';
import useRoomStore from '../../stores/useRoomStore';
import DefaultImage from '../ui/DefaultImage';

const RoomBanner: React.FC = () => {
  const thumbnailUrl = useRoomStore((state) => state.roomInfo?.thumbnail);
  return (
    <div className='pb-52'>
      {thumbnailUrl ? (
        <img
          src={thumbnailUrl}
          alt='background-image'
          className='absolute left-0 w-screen h-48 object-cover'
        />
      ) : (
        <DefaultImage style='absolute left-0 w-screen h-48' />
      )}
    </div>
  );
};

export default RoomBanner;
