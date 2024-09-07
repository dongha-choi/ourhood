import React from 'react';
import DefaultImage from './ui/DefaultImage';
import {
  MdNotificationsNone,
  MdOutlineAddPhotoAlternate,
} from 'react-icons/md';

interface RoomHeaderProps {
  isMember: boolean;
  thumbnail: string;
  roomName: string;
  roomDescription: string;
  numOfNewJoinRequests: number;
}
const RoomHeader: React.FC<RoomHeaderProps> = ({
  // isMember,
  thumbnail,
  roomName,
  roomDescription,
  // numOfNewJoinRequests
}) => {
  return (
    <>
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
      <div className='pt-2 pb-6 flex justify-between items-center'>
        <div>
          <h1 className='text-3xl font-semibold'>{roomName}</h1>
          <h2 className='text-base'>{roomDescription}</h2>
        </div>
        <aside className='text-3xl flex gap-1 mr-1'>
          <button>
            <MdOutlineAddPhotoAlternate />
          </button>
          <button className='relative'>
            <MdNotificationsNone />
            <div className='w-3 h-3 absolute rounded-full top-0.5 right-0.5 bg-red text-2xs text-white font-semibold'>
              3
            </div>
          </button>
        </aside>
      </div>
    </>
  );
};

export default RoomHeader;
