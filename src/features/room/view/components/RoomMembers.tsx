import React, { useState } from 'react';

import InvitationInput from '../../../../components/member-request/InvitationInput';
import Button from '../../../../components/ui/Button';
import ErrorDisplay from '../../../../components/ui/ErrorDisplay';
import { useRoomMembers } from '../api/queries';
import { useRoomId } from '../store/useRoomInfoStore';

const RoomMembers: React.FC = () => {
  const roomId = useRoomId();
  const { data: members, isLoading, error } = useRoomMembers(roomId);

  const [isInviteMemberClicked, setIsInviteMemberClicked] =
    useState<boolean>(false);

  if (isLoading) {
    return <></>;
  }
  if (error || !members) {
    return (
      <ErrorDisplay message={error?.message || 'Failed to load members'} />
    );
  }
  return (
    <div className='w-full h-full flex justify-center'>
      <div className='w-56 mt-1 flex flex-col gap-2'>
        {members?.map((member) => (
          <div
            key={member.userId}
            className='w-full py-1.5 text-sm font-medium text-center border border-darkWhite rounded-md '
          >
            {member.nickname}
          </div>
        ))}
        {isInviteMemberClicked ? (
          <InvitationInput
            setIsInviteMemberClicked={setIsInviteMemberClicked}
          />
        ) : (
          <Button
            label='+ Invite Member'
            onClick={() => setIsInviteMemberClicked(true)}
            size='medium'
            shape='primary'
          />
        )}
      </div>
    </div>
  );
};

export default RoomMembers;
