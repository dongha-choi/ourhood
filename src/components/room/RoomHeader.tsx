import React from 'react';
import useRoomStore from '../../stores/useRoomStore';
import { Link } from 'react-router-dom';
import RoomMenu from './RoomMenu';

const RoomHeader: React.FC = () => {
  const roomInfo = useRoomStore((state) => state.roomInfo);
  const { roomId, isMember, roomName, roomDescription, createdAt } =
    roomInfo ?? {};

  return (
    <div className='pt-2 pb-6 flex justify-between items-center'>
      <div>
        <Link to={`/rooms/${roomId}`}>
          <h1 className='text-3xl font-semibold'>{roomName}</h1>
        </Link>
        <h2 className='pl-0.5 text-base'>{roomDescription}</h2>
        <p className='pl-0.5 lora font-semibold text-xs'>
          since {createdAt?.slice(0, 10).replace(/-/g, '.')}
        </p>
      </div>
      {isMember && <RoomMenu />}
    </div>
  );
};

export default RoomHeader;
