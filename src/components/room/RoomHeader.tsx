import React from 'react';
import {
  MdNotificationsNone,
  MdOutlineAddPhotoAlternate,
} from 'react-icons/md';
import useRoomStore from '../../stores/useRoomStore';
import { Link } from 'react-router-dom';
import getTimeNotation from '../../utils/getTimeNotation';

// interface RoomHeaderProps {
//   isMember: boolean;
// }
const RoomHeader: React.FC = () => {
  const roomInfo = useRoomStore((state) => state.roomInfo);
  const { roomId, isMember, roomName, roomDescription, createdAt } =
    roomInfo ?? {};

  const numOfNewJoinRequests = isMember
    ? roomInfo?.roomDetail?.numOfNewJoinRequests
    : null;

  return (
    <div className='pt-2 pb-6 flex justify-between items-center'>
      <div>
        <Link to={`/rooms/${roomId}`}>
          <h1 className='text-3xl font-semibold'>{roomName}</h1>
        </Link>
        <h2 className='text-base'>{roomDescription}</h2>
        <p>since {createdAt?.slice(0, 10)}</p>
      </div>
      <aside className='text-3xl flex gap-1 mr-1'>
        <Link to={`/rooms/${roomId}/moments/new`}>
          <MdOutlineAddPhotoAlternate />
        </Link>
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
  );
};

export default RoomHeader;
