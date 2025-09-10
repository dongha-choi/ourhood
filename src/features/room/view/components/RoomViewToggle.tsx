import React, { Dispatch, SetStateAction } from 'react';

import ErrorDisplay from '../../../../components/ui/ErrorDisplay';
import { RoomView } from '../../types';
import { useRoomViewCounts } from '../api/queries';
import { useRoomId } from '../store/useRoomInfoStore';

interface RoomViewToggleProps {
  view: RoomView;
  setView: Dispatch<SetStateAction<RoomView>>;
}

const RoomViewToggle: React.FC<RoomViewToggleProps> = ({ view, setView }) => {
  const roomId = useRoomId() as number;
  const [momentsResult, membersResult] = useRoomViewCounts(roomId);

  const isLoading = momentsResult.isLoading || membersResult.isLoading;
  const error = momentsResult.error || membersResult.error;

  if (isLoading) {
    return <></>;
  }
  if (error) {
    return <ErrorDisplay message={error.message} />;
  }
  const momentsCount = momentsResult.data;
  const membersCount = membersResult.data;

  if (
    typeof momentsCount === 'undefined' ||
    typeof membersCount === 'undefined'
  ) {
    return <ErrorDisplay message='데이터를 불러오는 데 실패했습니다.' />;
  }

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
