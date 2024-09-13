import React, { useState } from 'react';
import { RoomView } from '../types/rooms';
import { Moment } from '../types/moments';
import MomentList from './MomentList';
import MemberList from './MemberList';

interface RoomBodyProps {
  moments: Moment[];
  members: string[];
}

const RoomBody: React.FC<RoomBodyProps> = ({ moments, members }) => {
  const [view, setView] = useState<RoomView>('moments');
  return (
    <>
      {false && (
        <>
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
                <span>{moments.length}</span>
              </button>
              <button
                className={
                  'h-full px-1 py-3 flex gap-1 ' +
                  (view === 'members' ? 'font-bold' : '')
                }
                onClick={() => setView('members')}
              >
                <span>Members</span>
                <span>{members.length}</span>
              </button>
            </div>
          </div>
          <div>
            {view === 'moments' && <MomentList moments={moments} />}
            {view === 'members' && <MemberList members={members} />}
          </div>
        </>
      )}
      {true && <p>You are not a memeber of this room.</p>}
    </>
  );
};

export default RoomBody;
