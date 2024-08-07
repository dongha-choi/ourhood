import React from 'react';
import { RoomInfo } from '../types/rooms';
import { IoPerson } from 'react-icons/io5';

interface RoomCardProps {
  roomInfo: RoomInfo;
}

const RoomCard: React.FC<RoomCardProps> = ({ roomInfo }) => {
  // const navigate = useNavigate();
  const { roomName, hostName, numOfMembers, thumbnail } = roomInfo;
  const createdAt = `${roomInfo.createdAt.slice(0, 10)}`;
  return (
    <li className='max-w-64'>
      <div className='rounded-lg overflow-hidden h-40'>
        <img
          src={thumbnail}
          alt='roomName'
          className='object-cover w-full h-full transition-transform duration-200 ease-in transform hover:scale-110'
        />
      </div>
      <div className='p-1 font-light text-sm '>
        <p className='my-1 font-semibold text-base'>{roomName}</p>
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
