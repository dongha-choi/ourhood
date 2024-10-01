import React, { useState } from 'react';
import { RoomView } from '../../types/room';
import MomentList from '../moment/MomentList';
import MemberList from './MemberList';
import useRoomStore from '../../stores/useRoomStore';
import RoomLockScreen from './RoomLockScreen';
import ViewToggle from './ViewToggle';

const RoomBody: React.FC = () => {
  const isMember = useRoomStore((state) => state.roomInfo?.isMember);
  const [view, setView] = useState<RoomView>('moments');

  return (
    <div className='min-h-96 flex flex-col'>
      {!isMember && <RoomLockScreen />}
      {isMember && (
        <>
          <ViewToggle view={view} setView={setView} />
          {view === 'moments' ? <MomentList /> : <MemberList />}
        </>
      )}
    </div>
  );
};

export default RoomBody;
