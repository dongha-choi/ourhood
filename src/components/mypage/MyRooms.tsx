import { ImageOff } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { RoomCardInfo } from '../../types/room';
import RoomCard from '../room/RoomCard';

interface MyRoomsProps {
  myRooms: RoomCardInfo[];
}

const MyRooms: React.FC<MyRoomsProps> = ({ myRooms }) => {
  const navigate = useNavigate();
  return (
    <div className='flex-1'>
      <h2 className='text-2xl font-bold mb-6'>My Rooms</h2>
      {myRooms.length > 0 ? (
        <ul className='w-full gap-x-4 gap-y-8 place-items-center grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
          {myRooms.map((roomCardInfo: RoomCardInfo) => (
            <RoomCard
              key={roomCardInfo.roomMetadata.roomId}
              roomCardInfo={roomCardInfo}
            />
          ))}
          <li className='w-full h-full flex cursor-pointer'>
            <div className='w-full'>
              <div className='w-full  aspect-[8/5]  border rounded-lg flex justify-center items-center'>
                <span>Discover More</span>
              </div>
            </div>
          </li>
        </ul>
      ) : (
        <div className='py-40 flex flex-col gap-2 items-center justify-center p-10 bg-gray-50 rounded-lg'>
          <ImageOff color='gray' />
          <p className='text-sm font-normal text-gray'>
            You haven't joined any rooms yet.
          </p>
          <button
            className='mt-2 px-4 py-2 bg-brand aurora-hover text-white rounded-lg  transition-colors'
            onClick={() => navigate('/rooms')}
          >
            Discover
          </button>
        </div>
      )}
    </div>
  );
};

export default MyRooms;
