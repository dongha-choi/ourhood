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
    queryFn: () => fetchRoomInfo(roomId, { userId }),
  });

  useEffect(() => {
    if (roomInfo) {
      setRoomInfo({ roomInfo });
    }
    return () => {
      clearRoomInfo();
    };
  }, [roomInfo, setRoomInfo, clearRoomInfo]);

  if (isLoading) {
    return <p></p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  console.log('room component:', roomInfo);
  return (
    <section
      key={roomInfo?.roomId}
      className='w-full max-w-screen-xl px-16 font-light'
    >
      <RoomBanner />
      <Outlet />
    </section>
  );
};

export default Room;
