import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { processInvitation } from '../../api/invitationApi';
import { ReceivedInvitation, RequestAction } from '../../types/memberRequest';

interface ReceivedInvitationItemProps {
  invitation: ReceivedInvitation;
  userId: number;
}

const ReceivedInvitationItem: React.FC<ReceivedInvitationItemProps> = ({
  invitation,
  userId,
}) => {
  const queryClient = useQueryClient();
  const { invitationId, roomName, hostName, createdAt } = invitation;

  // Format date for better readability
  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

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
      // Also invalidate rooms list if it exists
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
    },
  });

  const handleAccept = () => {
    processMutation({ invitationId, action: 'accept' });
  };

  const handleDecline = () => {
    processMutation({ invitationId, action: 'reject' });
  };

  return (
    <li className='p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors'>
      <div className='flex flex-col gap-1'>
        <p className='font-medium text-base truncate'>{roomName}</p>
        <p className='text-sm text-gray-600'>from {hostName}</p>
        <p className='text-xs text-gray-500'>{formattedDate}</p>
        <div className='flex gap-2 mt-2'>
          <button
            onClick={handleAccept}
            disabled={isPending}
            className='px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors flex-1 disabled:opacity-50'
          >
            Accept
          </button>
          <button
            onClick={handleDecline}
            disabled={isPending}
            className='px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded hover:bg-gray-300 transition-colors flex-1 disabled:opacity-50'
          >
            Decline
          </button>
        </div>
      </div>
    </li>
  );
};

export default ReceivedInvitationItem;
