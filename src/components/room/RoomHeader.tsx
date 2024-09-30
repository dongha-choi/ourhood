import React, { useState } from 'react';
import {
  MdNotificationsNone,
  MdOutlineAddPhotoAlternate,
} from 'react-icons/md';
import useRoomStore from '../../stores/useRoomStore';
import { Link } from 'react-router-dom';
import JoinRequestList from '../request/JoinRequestList';

const RoomHeader: React.FC = () => {
  const roomInfo = useRoomStore((state) => state.roomInfo);
  const { roomId, isMember, roomName, roomDescription, createdAt } =
    roomInfo ?? {};

  const numOfNewJoinRequests = isMember
    ? roomInfo?.roomDetail?.numOfNewJoinRequests
    : null;

  const [isNotificationClicked, setIsNotificationClicked] =
    useState<boolean>(false);

  return (
    <div className='pt-2 pb-6 flex justify-between items-center'>
      <div>
        <Link to={`/rooms/${roomId}`}>
          <h1 className='text-3xl font-semibold'>{roomName}</h1>
        </Link>
        <h2 className='text-base'>{roomDescription}</h2>
        <p className='font-hakgyoansim text-xs'>
          since {createdAt?.slice(0, 10).replace(/-/g, '.')}
        </p>
      </div>
      <aside className='relative text-3xl w-20 flex justify-center gap-1 mr-1'>
        <Link to={`/rooms/${roomId}/moments/new`}>
          <MdOutlineAddPhotoAlternate />
        </Link>
        <button
          className='relative'
          onClick={() => setIsNotificationClicked((prev) => !prev)}
        >
          <MdNotificationsNone />
          {!!numOfNewJoinRequests && (
            <div className='w-3 h-3 text-3xs absolute rounded-full top-0.5 right-0.5 bg-red text-white font-semibold'>
              {numOfNewJoinRequests}
            </div>
          )}
        </button>
        {isNotificationClicked && <JoinRequestList />}
      </aside>
    </div>
  );
};

export default RoomHeader;
