import React from 'react';
import { useParams } from 'react-router-dom';
import useAuthStore from '../../stores/useAuthStore';
import { useQuery } from '@tanstack/react-query';
import { fetchReceivedJoinRequests } from '../../api/joinRequestApi';

import ReceivedJoinRequestItem from './ReceivedJoinRequestItem';

const ReceivedJoinRequestPopover: React.FC = () => {
  const userId = useAuthStore().user.id;
  const roomId = +(useParams().roomId as string);
  const {
    data: receivedJoinRequests,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['receivedJoinRequests', roomId, userId],
    queryFn: () => fetchReceivedJoinRequests(roomId),
  });

  if (isLoading) {
    return <div></div>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  return (
    <div className='w-56 absolute z-10 top-10 -right-12 m-0 p-4 rounded-xl font-semibold text-sm bg-white light-shadow'>
      {receivedJoinRequests && receivedJoinRequests.length > 0 ? (
        <div>
          <p className='text-center pb-2 border-b border-darkWhite text-brand whitespace-nowrap'>
            New Join Requests
          </p>
          <ul className='mt-3 mb-1 flex flex-col gap-3'>
            {receivedJoinRequests.map(({ joinId, nickname, createdAt }) => (
              <ReceivedJoinRequestItem
                key={joinId}
                joinRequestId={joinId}
                nickname={nickname}
                createdAt={createdAt}
              />
            ))}
          </ul>
        </div>
      ) : (
        <div className='text-center font-medium whitespace-nowrap text-lightGray'>
          No join requests received.
        </div>
      )}
    </div>
  );
};

export default ReceivedJoinRequestPopover;
