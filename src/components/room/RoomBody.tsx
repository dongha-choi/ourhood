import React, { useState } from 'react';
import { RoomView } from '../../types/room';
import MomentList from '../moment/MomentList';
import MemberList from './MemberList';
import useRoomStore from '../../stores/useRoomStore';
import { Moment } from '../../types/moment';
import RoomLockScreen from './RoomLockScreen';
import ViewToggle from './ViewToggle';

const RoomBody: React.FC = () => {
  const isMember = useRoomStore((state) => state.roomInfo?.isMember);
  const [view, setView] = useState<RoomView>('moments');
  const roomDetail = isMember
    ? useRoomStore.getState().roomInfo?.roomDetail
    : null;
  const { moments, members } = roomDetail ?? {};

  return (
    <div className='min-h-80 flex flex-col'>
      {!isMember && <RoomLockScreen />}
      {isMember && (
        <>
          <ViewToggle
            view={view}
            setView={setView}
            numOfMoments={moments?.length as number}
            numOfMembers={members?.length as number}
          />
          {view === 'moments' ? (
            <MomentList moments={moments as Moment[]} />
          ) : (
            <MemberList members={members as string[]} />
          )}
        </>
      )}
    </div>
  );
};

export default RoomBody;
