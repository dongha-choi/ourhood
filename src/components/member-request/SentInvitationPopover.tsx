import React from 'react';
import useAuthStore from '../../stores/useAuthStore';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { fetchSentInvitations } from '../../api/memberRequestApi';
import SentInvitationItem from './SentInvitationItem';

const SentInvitationPopover: React.FC = () => {
  const userId = useAuthStore().user.id;
  const roomId = +(useParams().roomId as string);
  const {
    data: sentInvitationList,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['sentInvitation', roomId, userId],
    queryFn: () => fetchSentInvitations(roomId),
  });

  if (isLoading) {
    return <div></div>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  return (
    <div className='w-56 absolute z-10 top-10 -right-16 m-0 px-4 pt-1 pb-5 rounded-xl font-semibold text-sm bg-white light-shadow'>
      {sentInvitationList && sentInvitationList.length > 0 ? (
        <div>
          <p className='text-center py-2 border-b border-darkWhite text-brand whitespace-nowrap'>
            Sent Invitations
          </p>
          <ul className='mt-3 flex flex-col gap-2'>
            {sentInvitationList.map(({ invitationId, nickname, createdAt }) => (
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
          There are no sent invitations.
        </div>
      )}
    </div>
  );
};

export default SentInvitationPopover;
