import React from 'react';
import useAuthStore from '../../stores/useAuthStore';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import SentInvitationItem from './SentInvitationItem';
import { fetchSentInvitations } from '../../api/invitationApi';

const SentInvitationPopover: React.FC = () => {
  const userId = useAuthStore().user.id;
  const roomId = +(useParams().roomId as string);
  const {
    data: sentInvitations,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['sentInvitations', roomId, userId],
    queryFn: () => fetchSentInvitations(roomId),
  });

  if (isLoading) {
    return <div></div>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  return (
    <div className='w-56 absolute z-10 top-10 -right-16 m-0 p-4 rounded-xl font-semibold text-sm bg-white light-shadow'>
      {sentInvitations && sentInvitations.length > 0 ? (
        <div>
          <p className='text-center pb-2 border-b border-darkWhite text-brand whitespace-nowrap'>
            Sent Invitations
          </p>
          <ul className='mt-3 mb-1 flex flex-col gap-2'>
            {sentInvitations.map(({ invitationId, nickname, createdAt }) => (
              <SentInvitationItem
                key={invitationId}
                invitationId={invitationId}
                nickname={nickname}
                createdAt={createdAt}
              />
            ))}
          </ul>
        </div>
      ) : (
        <div className='whitespace-nowrap text-lightGray'>
          No invitations sent.
        </div>
      )}
    </div>
  );
};

export default SentInvitationPopover;
