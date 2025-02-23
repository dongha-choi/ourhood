import React from 'react';
import { cancelSentRequest } from '../../api/memberRequestApi';
import { IoClose } from 'react-icons/io5';
import { useQueryClient } from '@tanstack/react-query';
import useAuthStore from '../../stores/useAuthStore';
import { useParams } from 'react-router-dom';
import { getRelativeTime } from '../../utils/dateConverter';

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
      await cancelSentRequest('invitation', invitationId);
      queryClient.invalidateQueries({
        queryKey: ['sentInvitation', roomId, userId],
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
      <div className='flex items-center gap-1 '>
        <button onClick={handleCancel}>
          <IoClose className='text-red text-lg cursor-pointer rounded-full hover-white' />
        </button>
      </div>
    </li>
  );
};

export default SentInvitationItem;
