import React, { useState } from 'react';
import useRoomStore from '../../stores/useRoomStore';
import InvitationInput from './InvitationInput';

const MemberList: React.FC = () => {
  const members = useRoomStore((state) => state.roomInfo?.roomDetail?.members);
  const [isInviteMemberClicked, setIsInviteMemberClicked] =
    useState<boolean>(false);
  return (
    <div className='w-full h-full flex justify-center'>
      <div className='w-56 mt-1 flex flex-col gap-2'>
        {/* using index as key of mapping is not a good practice! */}
        {members?.map((member, index) => (
          <div
            key={index}
            className='w-full py-1 text-center border border-darkWhite rounded-md font-semibold'
          >
            {member}
          </div>
        ))}
        {isInviteMemberClicked ? (
          <InvitationInput
            setIsInviteMemberClicked={setIsInviteMemberClicked}
          />
        ) : (
          <button
            className='w-full py-1 text-center text-brand border-2 border-brand rounded-md font-semibold'
            onClick={() => setIsInviteMemberClicked(true)}
          >
            + Invite Member
          </button>
        )}
      </div>
    </div>
  );
};

export default MemberList;
