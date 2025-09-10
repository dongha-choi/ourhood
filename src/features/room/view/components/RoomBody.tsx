import React, { useState } from 'react';

import { RoomView } from '../../types';
import { useRoomInfoState } from '../store/useRoomInfoStore';
import RoomLockScreen from './RoomLockScreen';
import RoomMembers from './RoomMembers';
import RoomMoments from './RoomMoments';
import RoomViewToggle from './RoomViewToggle';

const RoomBody: React.FC = () => {
  const isMember = useRoomInfoState()?.userContext.isMember;
  const [view, setView] = useState<RoomView>('moments');
  return (
    <div className='w-full min-h-96 flex flex-col'>
      {!isMember && <RoomLockScreen />}
      {isMember && (
        <>
          <RoomViewToggle view={view} setView={setView} />
          {view === 'moments' ? <RoomMoments /> : <RoomMembers />}
        </>
      )}
    </div>
  );
};

export default RoomBody;
