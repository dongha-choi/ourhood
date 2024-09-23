import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoomCardInfo } from '../../types/room';
import { IoPerson } from 'react-icons/io5';
import DefaultImage from '../ui/DefaultImage';

interface RoomCardProps {
  roomCardInfo: RoomCardInfo;
}

const RoomCard: React.FC<RoomCardProps> = ({ roomCardInfo }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const { roomId, roomName, hostName, numOfMembers, thumbnail } = roomCardInfo;
  const createdAt = `${roomCardInfo.createdAt.slice(0, 10)}`;
  return (
    <li className='w-full'>
      <div
        onClick={() => navigate(`/rooms/${roomId}`)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className='w-full hover:cursor-pointer'
      >
        <div className='w-full aspect-[8/5] rounded-lg overflow-hidden'>
          {thumbnail ? (
            <img
              src={thumbnail}
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
        <p className='mt-2 font-semibold text-base'>{roomName}</p>
      </div>

      <div className='font-light text-sm '>
        <div className='w-full flex justify-between items-center text-gray'>
          <div className='flex gap-1 items-center'>
            <span>{hostName} &#183;</span>
            <div className='flex items-center text-xs '>
              <IoPerson />
              <span>{numOfMembers}</span>
            </div>
          </div>
          <p>{createdAt}</p>
        </div>
      </div>
    </li>
  );
};

export default RoomCard;
