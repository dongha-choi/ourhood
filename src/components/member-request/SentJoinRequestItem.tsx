import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cancelSentJoinRequest } from '../../api/joinRequestApi'; // You'll need to implement this API function
import { SentJoinRequest } from '../../types/memberRequest';
import useAuthStore from '../../stores/useAuthStore';
import { getRelativeTime } from '../../utils/dateConverter';
import { IoClose } from 'react-icons/io5';

interface SentJoinRequestItemProps {
  joinRequest: SentJoinRequest;
}

const SentJoinRequestItem: React.FC<SentJoinRequestItemProps> = ({
  joinRequest,
}) => {
  const queryClient = useQueryClient();
  const userId = useAuthStore().user.id;
  const { joinRequestId, roomName, createdAt } = joinRequest;
  const date = getRelativeTime(createdAt);

  const { mutate: cancelMutation, isPending } = useMutation({
    mutationFn: (requestId: number) => cancelSentJoinRequest(requestId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mypage', userId] });
    },
  });

  const handleCancel = () => {
    cancelMutation(joinRequestId);
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
