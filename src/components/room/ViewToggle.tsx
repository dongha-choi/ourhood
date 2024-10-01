import React, { Dispatch, SetStateAction } from 'react';
import { RoomView } from '../../types/room';
import useRoomStore from '../../stores/useRoomStore';

interface ViewToggleProps {
  view: RoomView;
  setView: Dispatch<SetStateAction<RoomView>>;
}

const ViewToggle: React.FC<ViewToggleProps> = ({ view, setView }) => {
  const numOfMoments = useRoomStore(
    (state) => state.roomInfo?.roomDetail?.moments.length
  );
  const numOfMembers = useRoomStore(
    (state) => state.roomInfo?.roomDetail?.members.length
  );
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
          <span>{numOfMoments}</span>
        </button>
        <button
          className={
            'h-full px-1 py-3 flex gap-1 ' +
            (view === 'members' ? 'font-bold' : '')
          }
          onClick={() => setView('members')}
        >
          <span>Members</span>
          <span>{numOfMembers}</span>
        </button>
      </div>
    </div>
  );
};

export default ViewToggle;
