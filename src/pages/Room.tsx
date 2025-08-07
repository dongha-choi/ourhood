// Room.tsx
import React, { useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';

import RoomBanner from '../components/room/RoomBanner';
import useRoomStore from '../features/room/store/useRoomStore';
import { useRoomInfo } from '../hooks/queries/roomQueries';

const Room: React.FC = () => {
  const roomId = +(useParams().roomId as string);
  const { setRoomInfo, clearRoomInfo } = useRoomStore();

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
    return <p>{error.message}</p>;
  }

  if (!roomInfo) {
    return <p>No room data available</p>;
  }

  return (
    <section
      key={roomInfo.roomMetadata.roomId}
      className='w-full max-w-screen-xl px-16 font-light'
    >
      <RoomBanner />
      <Outlet />
    </section>
  );
};

export default Room;
