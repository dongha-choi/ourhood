// Room.tsx
import React, { useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';

import ErrorDisplay from '../../../components/ui/ErrorDisplay';
import { useRoomInfo } from '../view/api/queries';
import RoomHeader from '../view/components/RoomHeader';
import { useRoomInfoActions } from '../view/store/useRoomInfoStore';

const Room: React.FC = () => {
  const roomId = +(useParams().roomId as string);
  const { setRoomInfo, clearRoomInfo } = useRoomInfoActions();

  const { data: roomInfo, isLoading, error } = useRoomInfo(roomId);

  useEffect(() => {
    if (roomInfo) {
      setRoomInfo(roomInfo);
    }
    return () => {
      clearRoomInfo();
    };
  }, [roomInfo, setRoomInfo, clearRoomInfo]);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <ErrorDisplay message={error.message} />;
  }
  if (!roomInfo) {
    return <ErrorDisplay message='Failed to load RoomInfo' />;
  }

  return (
    <section
      key={roomInfo.roomMetadata.roomId}
      className='w-full max-w-screen-xl px-16 font-light'
    >
      <RoomHeader />
      <Outlet />
    </section>
  );
};

export default Room;
