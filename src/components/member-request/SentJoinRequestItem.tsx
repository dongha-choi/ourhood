import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cancelSentJoinRequest } from '../../api/joinRequestApi'; // You'll need to implement this API function
import { SentJoinRequest } from '../../types/memberRequest';

interface SentJoinRequestItemProps {
  request: SentJoinRequest;
  userId: number;
}

const SentJoinRequestItem: React.FC<SentJoinRequestItemProps> = ({
  request,
  userId,
}) => {
  const queryClient = useQueryClient();
  const { joinRequestId, roomName, createdAt } = request;

  // Format date for better readability
  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  // Create mutation for canceling join request
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
    <li className='p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors'>
      <div className='flex flex-col gap-1'>
        <p className='font-medium text-base truncate'>{roomName}</p>
        <p className='text-xs text-gray-500'>Requested on {formattedDate}</p>
        <div className='flex justify-end mt-2'>
          <button
            onClick={handleCancel}
            disabled={isPending}
            className='px-3 py-1 bg-red-100 text-red-600 text-sm rounded hover:bg-red-200 transition-colors disabled:opacity-50'
          >
            Cancel Request
          </button>
        </div>
      </div>
    </li>
  );
};

export default SentJoinRequestItem;
