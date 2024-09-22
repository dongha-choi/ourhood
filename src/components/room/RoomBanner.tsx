import React from 'react';
import useRoomStore from '../../stores/useRoomStore';
import DefaultImage from '../ui/DefaultImage';

const RoomBanner: React.FC = () => {
  const thumbnail = useRoomStore((state) => state.roomInfo?.thumbnail);
  return (
    <div className='pb-52'>
      {thumbnail ? (
        <img
          src={thumbnail}
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
