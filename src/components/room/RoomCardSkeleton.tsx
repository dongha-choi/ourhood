import React from 'react';

const RoomCardSkeleton: React.FC = () => {
  return (
    <li className='w-full animate-pulse'>
      {/* Thumbnail placeholder */}
      <div className='w-full aspect-[8/5] rounded-lg overflow-hidden bg-midWhite'></div>

      {/* Room name placeholder */}
      <div className='mt-2 px-0.5 h-6 w-3/4 bg-midWhite rounded'></div>

      {/* Room info placeholder */}
      <div className='mt-1 px-0.5'>
        <div className='w-full flex justify-between items-center'>
          <div className='flex gap-1 items-center'>
            {/* Host name placeholder */}
            <div className='h-4 w-20 bg-midWhite rounded'></div>

            {/* Number of members placeholder */}
            <div className='flex items-end ml-2'>
              <div className='h-4 w-10 bg-midWhite rounded'></div>
            </div>
          </div>

          {/* Date placeholder */}
          <div className='h-4 w-16 bg-midWhite rounded'></div>
        </div>
      </div>
    </li>
  );
};

export default RoomCardSkeleton;
