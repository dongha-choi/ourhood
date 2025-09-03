import React from 'react';
import { IoClose } from 'react-icons/io5';

import { getRelativeTime } from '../../../utils/dateConverter';
import { useAuthUserId } from '../../auth/store/useAuthStore';
import { useCancelSentJoinRequest } from '../api/mutations';
import { SentJoinRequest } from '../types';

interface SentJoinRequestItemProps {
  joinRequest: SentJoinRequest;
}

const SentJoinRequestItem: React.FC<SentJoinRequestItemProps> = ({
  joinRequest,
}) => {
  const userId = useAuthUserId() as number;
  const { joinRequestId, roomName, createdAt } = joinRequest;
  const {
    mutateAsync: cancelJoinRequest,
    isPending,
    error,
  } = useCancelSentJoinRequest(joinRequestId, userId);
  if (error) return <p>{error.message}</p>;
  const date = getRelativeTime(createdAt);

  const handleCancel = async () => {
    await cancelJoinRequest();
  };

  return (
    <li className='w-full p-2 flex justify-between items-center gap-1 rounded-lg shadow-xs'>
      <div className='flex flex-1 items-center justify-between'>
        <span className='text-sm pl-0.5 font-medium'>{roomName}</span>
        <span className=' text-2.5xs font-normal text-gray'>{date}</span>
      </div>
      <button onClick={handleCancel} disabled={isPending}>
        <IoClose className='text-red text-lg cursor-pointer rounded-full hover-white' />
      </button>
    </li>
  );
};

export default SentJoinRequestItem;
