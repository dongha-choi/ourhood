import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import ErrorDisplay from '../../../../components/ui/ErrorDisplay';
import { RoomView } from '../../../../types/room';
import { useRoomMembersCount, useRoomMomentsCount } from '../api/queries';
import { useRoomInfoState } from '../store/useRoomInfoStore';
import RoomLockScreen from './RoomLockScreen';
import RoomMembers from './RoomMembers';
import RoomMoments from './RoomMoments';
import RoomViewToggle from './RoomViewToggle';

const RoomBody: React.FC = () => {
  const roomId = +(useParams().roomId as string);
  const isMember = useRoomInfoState()?.userContext.isMember;
  const [view, setView] = useState<RoomView>('moments');
  const {
    data: momentsCount,
    isLoading: isMomentsCountLoading,
    error: momentsCountError,
  } = useRoomMomentsCount(roomId);
  const {
    data: membersCount,
    isLoading: isMembersCountLoading,
    error: membersCountError,
  } = useRoomMembersCount(roomId);

  if (isMomentsCountLoading || isMembersCountLoading) {
    return <></>;
  }
  if (momentsCountError || typeof momentsCount !== 'number') {
    return (
      <ErrorDisplay
        message={
          momentsCountError?.message || 'Failed to load number of moments'
        }
      />
    );
  }
  if (membersCountError || typeof membersCount !== 'number') {
    return (
      <ErrorDisplay
        message={
          membersCountError?.message || 'Failed to load number of members'
        }
      />
    );
  }
  return (
    <div className='w-full min-h-96 flex flex-col'>
      {!isMember && <RoomLockScreen />}
      {isMember && (
        <>
          <RoomViewToggle
            view={view}
            setView={setView}
            momentsCount={momentsCount}
            membersCount={membersCount}
          />
          {view === 'moments' ? <RoomMoments /> : <RoomMembers />}
        </>
      )}
    </div>
  );
};

export default RoomBody;
