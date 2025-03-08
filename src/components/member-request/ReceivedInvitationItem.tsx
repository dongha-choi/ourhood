import { Crown } from 'lucide-react';
import React from 'react';
import { IoCheckmarkSharp, IoClose } from 'react-icons/io5';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { processInvitation } from '../../api/invitationApi';
import useAuthStore from '../../stores/useAuthStore';
import { ReceivedInvitation, RequestAction } from '../../types/memberRequest';
import { getRelativeTime } from '../../utils/dateConverter';

// import { useNavigate } from 'react-router-dom';

interface ReceivedInvitationItemProps {
  invitation: ReceivedInvitation;
}

const ReceivedInvitationItem: React.FC<ReceivedInvitationItemProps> = ({
  invitation,
}) => {
  const queryClient = useQueryClient();
  // const navigate = useNavigate();
  const userId = useAuthStore().user.id;
  const { invitationId, roomName, hostName, createdAt } = invitation;

  const date = getRelativeTime(createdAt);

  // Create mutations for accepting and declining invitations
  const { mutate: processMutation, isPending } = useMutation({
    mutationFn: ({
      invitationId,
      action,
    }: {
      invitationId: number;
      action: RequestAction;
    }) => processInvitation(invitationId, action),
    onSuccess: () => {
      // Invalidate and refetch mypage data
      queryClient.invalidateQueries({ queryKey: ['mypage', userId] });
    },
  });

  const handleAccept = () => {
    processMutation({ invitationId, action: 'accept' });
  };

  const handleReject = () => {
    processMutation({ invitationId, action: 'reject' });
  };

  return (
    <li
      className='w-full p-2 flex justify-between items-center gap-2 rounded-lg shadow-xs'
      // onClick={()=> navigate(`rooms/${roomId}`)}
    >
      <div className='flex flex-1 items-center justify-between'>
        <div className='flex gap-2 font-medium text-sm '>
          <span className=''>{roomName}</span>
          <div className='flex items-center pt-0.5 text-midGray '>
            <Crown size={12} strokeWidth={2.5} />
            <span className='text-xs'>{hostName}</span>
          </div>
        </div>
        <span className=' text-2.5xs font-normal text-gray'>{date}</span>
      </div>
      <div className='flex items-center'>
        <button onClick={handleAccept} disabled={isPending}>
          <IoCheckmarkSharp className='text-green text-lg cursor-pointer rounded-full hover-white' />
        </button>
        <button onClick={handleReject} disabled={isPending}>
          <IoClose className='text-red text-lg cursor-pointer rounded-full hover-white' />
        </button>
      </div>
    </li>
  );
};

export default ReceivedInvitationItem;
