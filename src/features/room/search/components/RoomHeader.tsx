import React from 'react';
import { Link } from 'react-router-dom';

import { RoomInfo } from '../../../../types/room';
import useRoomStore from '../../view/store/useRoomStore';
import RoomMenu from './RoomMenu';

const RoomHeader: React.FC = () => {
  const roomInfo = useRoomStore((state) => state.roomInfo) as RoomInfo;
  const {
    userContext: { isMember, isHost },
    roomMetadata: { roomId, createdAt },
    roomDetail: { roomName, roomDescription },
  } = roomInfo ?? {
    userContext: { isMember: null, isHost: null },
    roomMetadata: { roomId: null, createdAt: null },
    roomDetail: { roomName: null, roomDescription: null },
  };
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
      {isMember && <RoomMenu isHost={isHost as boolean} />}
    </div>
  );
};

export default RoomHeader;
