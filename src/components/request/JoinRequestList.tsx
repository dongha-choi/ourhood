import React from 'react';
import { useParams } from 'react-router-dom';
import useAuthStore from '../../stores/useAuthStore';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  fetchJoinRequests,
  processJoinRequest,
} from '../../api/joinRequestApi';
import ReqeustItem from './ReqeustItem';
import { RequestAction } from '../../types/request';

const JoinRequestList: React.FC = () => {
  const queryClient = useQueryClient();
  const userId = useAuthStore().user.id;
  const roomId = +(useParams().roomId as string);
  const {
    data: joinList,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['joinList', roomId, userId],
    queryFn: () => fetchJoinRequests(roomId),
    staleTime: 60 * 1000,
  });

  const handleProcess = async (joinId: number, action: RequestAction) => {
    await processJoinRequest(joinId, action);
    queryClient.invalidateQueries({ queryKey: ['joinList', roomId, userId] });
    queryClient.invalidateQueries({ queryKey: ['roomInfo', roomId, userId] });
  };

  if (isLoading) {
    return <div></div>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  console.log('join-req:', joinList);
  return (
    <ul className='absolute z-10 top-10 -right-1 m-0 p-4 flex flex-col gap-3 rounded-xl font-semibold text-sm bg-white light-shadow'>
      {joinList && joinList.length > 0 ? (
        joinList.map(({ joinId, nickName }) => (
          <ReqeustItem
            key={joinId}
            joinId={joinId}
            nickname={nickName}
            handleProcess={handleProcess}
          />
        ))
      ) : (
        <div className='w-44 text-lightGray'> There are no join requests.</div>
      )}
    </ul>
  );
};

export default JoinRequestList;
