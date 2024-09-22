import React, { useState } from 'react';
import { RoomView } from '../../types/room';
// import { Moment } from '../../types/moments';
import MomentList from '../MomentList';
import MemberList from './MemberList';
import useRoomStore from '../../stores/useRoomStore';
import { Moment } from '../../types/moment';
import RoomLockScreen from './RoomLockScreen';
import ViewToggle from './ViewToggle';

// interface RoomBodyProps {
//   moments: Moment[];
//   members: string[];
// }
// interface RoomBodyProps {
//   isMember: boolean;
// }

const RoomBody: React.FC = () => {
  const id = useRoomStore((state) => state.roomInfo?.roomId);
  console.log(id);
  const isMember = useRoomStore((state) => state.roomInfo?.isMember);
  const [view, setView] = useState<RoomView>('moments');
  const roomDetail = isMember
    ? useRoomStore.getState().roomInfo?.roomDetail
    : null;
  const { moments, members } = roomDetail ?? {};

  return (
    <div className='min-h-72'>
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
      {!isMember && <RoomLockScreen />}
    </div>
  );
};

export default RoomBody;
