import React from 'react';

interface MemberListProps {
  members: string[];
}

const MemberList: React.FC<MemberListProps> = ({ members }) => {
  return (
    <div className='h-full mt-2 flex flex-col items-center gap-2'>
      {/* using index as key of mapping is not a good practice! */}
      {members.map((member, index) => (
        <div
          key={index}
          className='w-56 py-1 text-center border border-darkWhite rounded-md font-semibold'
        >
          {member}
        </div>
      ))}
      <button className='w-56 py-1 text-center text-brand border-2 border-brand rounded-md font-semibold'>
        + Invite Member
      </button>
    </div>
  );
};

export default MemberList;
