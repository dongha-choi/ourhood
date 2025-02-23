import React from 'react';
import { IoClose } from 'react-icons/io5';
import { useQueryClient } from '@tanstack/react-query';
import useAuthStore from '../../stores/useAuthStore';
import { useParams } from 'react-router-dom';
import { getRelativeTime } from '../../utils/dateConverter';
import { cancelSentJoinRequest } from '../../api/joinRequestApi';

interface SentInvitationItemProps {
  invitationId: number;
  nickname: string;
  createdAt: string;
}

const SentInvitationItem: React.FC<SentInvitationItemProps> = ({
  invitationId,
  nickname,
  createdAt,
}) => {
  const queryClient = useQueryClient();
  const userId = useAuthStore().user.id;
  const roomId = +(useParams().roomId as string);
  const date = getRelativeTime(createdAt);
  const handleCancel = async () => {
    if (confirm('Are you sure you want to cancel?')) {
      await cancelSentJoinRequest(invitationId);
      queryClient.invalidateQueries({
        queryKey: ['sentInvitations', roomId, userId],
      });
    } else {
      return;
    }
  };

  return (
    <li className='w-full p-2 flex justify-between items-center gap-1 rounded-lg shadow-xs'>
      <div className='flex flex-1 items-center justify-between'>
        <span className='pl-0.5 font-medium'>{nickname}</span>
        <span className=' text-2.5xs font-normal text-gray'>{date}</span>
      </div>
      <button onClick={handleCancel}>
        <IoClose className='text-red text-lg cursor-pointer rounded-full hover-white' />
      </button>
    </li>
  );
};

export default SentInvitationItem;
