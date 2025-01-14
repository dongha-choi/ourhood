import React from 'react';
import { InvitationInfo, RequestAction } from '../../types/member';
import getTimeNotation from '../../utils/getTimeNotation';

interface InvitationItemProps {
  invitationInfo: InvitationInfo;
  handleProcess: (invitationId: number, action: RequestAction) => Promise<void>;
}

const InvitationItem: React.FC<InvitationItemProps> = ({
  invitationInfo: { invitationId, roomName, hostName, createdAt },
  handleProcess,
}) => {
  const time = getTimeNotation(createdAt);
  return (
    <div className='p-3 pt-2 border border-darkWhite rounded-lg'>
      <span className='px-0.5'>{roomName}</span>
      <div className='px-0.5 text-xs font-light text-gray flex justify-between'>
        <span className='leading-[0.5rem]'>{hostName}</span>
        <span className='leading-[0.5rem]'>{time}</span>
      </div>
      <div className='mt-2 flex items-center gap-1 text-sm'>
        <button
          className='w-full h-7 font-semibold text-white bg-brand rounded-sm'
          onClick={() => handleProcess(invitationId, 'accept')}
        >
          Join
        </button>
        <button
          className='w-full h-7 rounded-sm hover-white text-brand border border-brand'
          onClick={() => handleProcess(invitationId, 'reject')}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default InvitationItem;
