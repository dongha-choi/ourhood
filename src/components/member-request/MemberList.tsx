import React, { useState } from 'react';
import useRoomStore from '../../stores/useRoomStore';
import InvitationInput from './InvitationInput';
import Button from '../ui/Button';

const MemberList: React.FC = () => {
  const members = useRoomStore((state) => state.roomInfo?.roomPrivate?.members);
  const [isInviteMemberClicked, setIsInviteMemberClicked] =
    useState<boolean>(false);
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

export default MemberList;
