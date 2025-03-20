import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoomCardInfo } from '../../types/room';
import { IoPerson } from 'react-icons/io5';
import DefaultImage from '../ui/DefaultImage';

interface RoomCardProps {
  roomCardInfo: RoomCardInfo;
  isUpdating?: boolean;
}

const RoomCard: React.FC<RoomCardProps> = ({
  roomCardInfo,
  isUpdating = false,
}) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const {
    roomMetadata: { roomId, hostName, numOfMembers },
    roomDetail: { roomName, thumbnail },
  } = roomCardInfo;
  const createdAt = roomCardInfo.roomMetadata.createdAt.slice(0, 10);

  return (
    <li
      className={`w-full ${
        isUpdating ? 'opacity-70 transition-opacity duration-300' : ''
      }`}
    >
      <div
        onClick={() => navigate(`/rooms/${roomId}`)}
        className='w-full hover:cursor-pointer'
      >
        <div
          className='w-full aspect-[8/5] rounded-lg overflow-hidden'
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {thumbnail ? (
            <img
              src={thumbnail as string}
              alt='roomName'
              className={`w-full h-full object-cover transition-transform duration-700 ease-out transform ${
                isHovered && 'scale-110'
              }`}
            />
          ) : (
            <DefaultImage
              roomName={roomName}
              style={`w-full h-full transition-transform duration-700 ease-out transform ${
                isHovered && 'scale-110'
              }`}
            />
          )}
        </div>
        <p className='mt-2 px-0.5 font-semibold text-base'>{roomName}</p>
      </div>
      <div className='font-light text-xs px-0.5'>
        <div className='w-full flex justify-between items-center text-gray'>
          <div className='flex gap-1 items-center'>
            <span className='text-sm'>{hostName} &#183;</span>
            <div className='flex items-end '>
              <IoPerson />
              <span className='leading-[0.65rem] font-medium'>
                {numOfMembers}
              </span>
            </div>
          </div>
          <p>{createdAt}</p>
        </div>
      </div>
    </li>
  );
};

export default RoomCard;
