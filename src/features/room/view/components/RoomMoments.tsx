import React from 'react';
import { IoImages } from 'react-icons/io5';
import { Link, useParams } from 'react-router-dom';

import MomentCard from '../../../../components/moment/MomentCard';
import ErrorDisplay from '../../../../components/ui/ErrorDisplay';
import { useRoomMoments } from '../api/queries';

const RoomMoments: React.FC = () => {
  const roomId = +(useParams().roomId as string);
  const { data: moments, isLoading, error } = useRoomMoments(roomId);

  if (isLoading) {
    return <></>;
  }
  if (error || !moments) {
    return (
      <ErrorDisplay message={error?.message || 'Failed to load moments'} />
    );
  }
  return (
    <div className='flex-1 flex'>
      {!!moments?.length && (
        <ul className='w-full gap-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
          {moments.map((moment) => (
            <MomentCard
              key={moment.momentId}
              momentId={moment.momentId}
              momentImage={moment.momentImageUrl}
            />
          ))}
        </ul>
      )}
      {!moments?.length && (
        <div className='flex-1 flex flex-col justify-center items-center gap-2 text-gray'>
          <IoImages className='text-5xl mb-2 text-lightGray' />
          <p>There are no moments in the room.</p>
          <div className='flex items-center gap-1'>
            <Link
              to='moments/new'
              className='underline inline-block text-brand font-semibold'
            >
              Archive
            </Link>
            <p>the first moment!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomMoments;
