import React from 'react';
import { useQueryClient } from '@tanstack/react-query';
import useAuthStore from '../../stores/useAuthStore';
import { useParams } from 'react-router-dom';
import { IoCheckmarkSharp, IoClose } from 'react-icons/io5';
import { getRelativeTime } from '../../utils/dateConverter';
import { processJoinRequest } from '../../api/joinRequestApi';
import { RequestAction } from '../../types/memberRequest';

interface ReceivedJoinRequestItemProps {
  joinRequestId: number;
  nickname: string;
  createdAt: string;
}

const ReceivedJoinRequestItem: React.FC<ReceivedJoinRequestItemProps> = ({
  joinRequestId,
  nickname,
  createdAt,
}) => {
  const queryClient = useQueryClient();
  const userId = useAuthStore().user.id;
  const roomId = +(useParams().roomId as string);
  const date = getRelativeTime(createdAt);

  const handleJoinRequest = async (action: RequestAction) => {
    await processJoinRequest(joinRequestId, action);
    queryClient.invalidateQueries({
      queryKey: ['receivedJoinRequests', roomId, userId],
    });
  };

  return (
    <li className='w-full p-2 flex  justify-between items-center gap-2 rounded-lg shadow-xs'>
      <div className='flex flex-1 items-center justify-between'>
        <span className='pl-0.5 font-medium'>{nickname}</span>
        <span className=' text-2.5xs font-normal text-gray'>{date}</span>
      </div>
      <div className='flex items-center'>
        <button onClick={() => handleJoinRequest('accept')}>
          <IoCheckmarkSharp className='text-green text-lg cursor-pointer rounded-full hover-white' />
        </button>
        <button onClick={() => handleJoinRequest('reject')}>
          <IoClose className='text-red text-lg cursor-pointer rounded-full hover-white' />
        </button>
      </div>
    </li>
  );
};

export default ReceivedJoinRequestItem;
