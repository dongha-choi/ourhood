import React, { Dispatch, SetStateAction } from 'react';

import { RoomView } from '../../../../types/room';

interface RoomViewToggleProps {
  view: RoomView;
  setView: Dispatch<SetStateAction<RoomView>>;
  momentsCount: number;
  membersCount: number;
}

const RoomViewToggle: React.FC<RoomViewToggleProps> = ({
  view,
  setView,
  momentsCount,
  membersCount,
}) => {
  return (
    <div className='border-t text-xs flex justify-center'>
      <div className='w-44 relative flex justify-between gap-8'>
        <div
          className={`absolute w-[72px] h-[1px] bg-black transition-translate duration-300 ${
            view === 'moments' ? 'translate-x-0' : 'translate-x-end'
          }`}
        ></div>
        <button
          className={
            'h-full px-1 py-3 flex gap-1 ' +
            (view === 'moments' ? 'font-bold' : '')
          }
          onClick={() => setView('moments')}
        >
          <span>Moments</span>
          <span>{momentsCount}</span>
        </button>
        <button
          className={
            'h-full px-1 py-3 flex gap-1 ' +
            (view === 'members' ? 'font-bold' : '')
          }
          onClick={() => setView('members')}
        >
          <span>Members</span>
          <span>{membersCount}</span>
        </button>
      </div>
    </div>
  );
};

export default RoomViewToggle;
