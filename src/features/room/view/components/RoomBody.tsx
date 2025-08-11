import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { RoomView } from '../../../../types/room';
import { useRoomMoments } from '../api/queries';
import { useRoomInfoState } from '../store/useRoomInfoStore';
import RoomLockScreen from './RoomLockScreen';
import RoomMembers from './RoomMembers';
import RoomMoments from './RoomMoments';
import RoomViewToggle from './RoomViewToggle';

const RoomBody: React.FC = () => {
  const roomId = +(useParams().roomId as string);
  const isMember = useRoomInfoState()?.userContext.isMember;
  const { data: moments, isLoading, isError } = useRoomMoments(roomId);
  const [view, setView] = useState<RoomView>('moments');

  return (
    <div className='w-full min-h-96 flex flex-col'>
      {!isMember && <RoomLockScreen />}
      {isMember && (
        <>
          <RoomViewToggle view={view} setView={setView} />
          {view === 'moments' ? (
            <RoomMoments moments={moments} />
          ) : (
            <RoomMembers />
          )}
        </>
      )}
    </div>
  );
};

export default RoomBody;
