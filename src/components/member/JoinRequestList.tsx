import React from 'react';
import { useParams } from 'react-router-dom';
import useAuthStore from '../../stores/useAuthStore';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  fetchJoinRequests,
  processJoinRequest,
} from '../../api/joinRequestApi';
import JoinReqeustItem from './JoinReqeustItem';
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
  return (
    <div className='absolute z-10 top-10 -right-1 m-0 p-4 rounded-xl font-semibold text-sm bg-white light-shadow'>
      {joinList && joinList.length > 0 ? (
        <div>
          <p className='pb-2 border-b border-darkWhite text-brand whitespace-nowrap'>
            {`New join reqeust${
              joinList.length === 1 ? ' has' : 's have'
            } arrived!`}
          </p>
          <ul className='pt-3 flex flex-col gap-3'>
            {joinList.map(({ joinId, nickname }) => (
              <JoinReqeustItem
                key={joinId}
                joinId={joinId}
                nickname={nickname}
                handleProcess={handleProcess}
              />
            ))}
          </ul>
        </div>
      ) : (
        <div className='whitespace-nowrap text-lightGray'>
          There are no join requests.
        </div>
      )}
    </div>
  );
};

export default JoinRequestList;
