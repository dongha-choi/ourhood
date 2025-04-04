import React from 'react';

import { ReceivedInvitation } from '../../types/memberRequest';
import ReceivedInvitationItem from '../member-request/ReceivedInvitationItem';

interface ReceivedInvitationListProps {
  receivedInvitations: ReceivedInvitation[];
}

const ReceivedInvitationList: React.FC<ReceivedInvitationListProps> = ({
  receivedInvitations,
}) => {
  return (
    <div>
      <p className='w-full text-xl font-semibold'>Invitations</p>
      {receivedInvitations.length > 0 ? (
        <ul className='mt-1 flex flex-col gap-3'>
          {receivedInvitations.map((invitation) => (
            <ReceivedInvitationItem
              key={invitation.invitationId}
              invitation={invitation}
            />
          ))}
        </ul>
      ) : (
        <div className='text-midGray text-sm font-light'>No invitations.</div>
      )}
    </div>
  );
};

export default ReceivedInvitationList;
