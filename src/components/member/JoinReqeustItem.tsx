import React from 'react';
import { IoClose } from 'react-icons/io5';
import { RequestAction } from '../../types/member';
interface JoinRequestItemProps {
  joinId: number;
  nickname: string;
  handleProcess: (joinId: number, action: RequestAction) => Promise<void>;
}

const JoinReqeustItem: React.FC<JoinRequestItemProps> = ({
  joinId,
  nickname,
  handleProcess,
}) => {
  return (
    <li className='flex justify-between items-center gap-4'>
      <span>{nickname}</span>
      <div className='flex items-center gap-1 '>
        <button
          className='px-1.5 py-1 text-xs font-semibold text-white bg-brand rounded-sm'
          onClick={() => handleProcess(joinId, 'accept')}
        >
          Accept
        </button>
        <button onClick={() => handleProcess(joinId, 'reject')}>
          <IoClose className='text-red text-lg cursor-pointer rounded-full hover-white' />
        </button>
      </div>
    </li>
  );
};

export default JoinReqeustItem;
