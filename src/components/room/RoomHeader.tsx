import React from 'react';
import DefaultImage from '../ui/DefaultImage';
import {
  MdNotificationsNone,
  MdOutlineAddPhotoAlternate,
} from 'react-icons/md';
import useRoomStore from '../../stores/useRoomStore';

interface RoomHeaderProps {
  isMember: boolean;
}
const RoomHeader: React.FC<RoomHeaderProps> = ({ isMember }) => {
  console.log(isMember);
  const roomInfo = useRoomStore.getState().roomInfo ?? null;
  const { roomName, roomDescription, thumbnail } = roomInfo ?? {};

  const numOfNewJoinRequests = isMember
    ? roomInfo?.roomDetail?.numOfNewJoinRequests
    : null;

  console.log(numOfNewJoinRequests);

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
            {!!numOfNewJoinRequests && (
              <div className='w-3 h-3 absolute rounded-full top-0.5 right-0.5 bg-red text-2xs text-white font-semibold'>
                {numOfNewJoinRequests}
              </div>
            )}
          </button>
        </aside>
      </div>
    </>
  );
};

export default RoomHeader;
