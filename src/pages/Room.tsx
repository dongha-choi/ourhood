// Room.tsx
import React, { useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import useAuthStore from '../stores/useAuthStore';
import { useQuery } from '@tanstack/react-query';
import useRoomStore from '../stores/useRoomStore';
import RoomBanner from '../components/room/RoomBanner';
import { fetchRoomInfo } from '../api/roomApi';

const Room: React.FC = () => {
  const userId = useAuthStore().user.id;
  const roomId = +(useParams().roomId as string);
  const { setRoomInfo, clearRoomInfo } = useRoomStore();

  const {
    data: roomInfo,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['roomInfo', roomId, userId],
    queryFn: async () => await fetchRoomInfo(roomId, { userId }),
    // Always fetch fresh data on mount/refresh
    refetchOnMount: true,
    staleTime: 0,
  });

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
