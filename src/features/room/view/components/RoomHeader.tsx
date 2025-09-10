import React from 'react';
import { Link } from 'react-router-dom';

import DefaultImage from '../../../../components/ui/DefaultImage';
import { useRoomInfoState } from '../store/useRoomInfoStore';
import RoomMenu from './RoomMenu';

const RoomHeader: React.FC = () => {
  const roomInfo = useRoomInfoState();

  if (!roomInfo) {
    return <div></div>;
  }
  const {
    userContext: { isMember, isHost },
    roomMetadata: { roomId, createdAt },
    roomDetail: { roomName, roomDescription, thumbnailUrl },
  } = roomInfo;
  return (
    <div>
      <div className='pb-52'>
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl as string}
            alt='background-image'
            className='absolute left-0 w-screen h-48 object-cover'
          />
        ) : (
          <DefaultImage style='absolute left-0 w-screen h-48' />
        )}
      </div>
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
    </div>
  );
};

export default RoomHeader;
