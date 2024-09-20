import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useRooms from '../hooks/useRooms';
import useAuthStore from '../stores/useAuthStore';
import { useQuery } from '@tanstack/react-query';
// import { FetchRoomInfoResponse } from '../types/apis/rooms';
import RoomHeader from '../components/room/RoomHeader';
import RoomBody from '../components/room/RoomBody';
import useRoomStore from '../stores/useRoomStore';
import { FetchRoomInfoResponse } from '../types/apis/rooms';

const Room: React.FC = () => {
  const userId = useAuthStore().user.id;
  const roomId = useParams().roomId || '';

  const { fetchRoomInfo } = useRooms();
  const { setRoomInfo, clearRoomInfo } = useRoomStore();
  const {
    data: roomInfo,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['roomInfo', roomId],
    queryFn: () => fetchRoomInfo(roomId, { userId }),
  });

  useEffect(() => {
    if (roomInfo) {
      console.log('set room info: ', roomInfo);
      setRoomInfo({ roomInfo });
    }
    return () => {
      clearRoomInfo();
    };
  }, [roomInfo, setRoomInfo, clearRoomInfo]);

  if (isLoading) {
    return <p>loading...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  const { isMember } = roomInfo as FetchRoomInfoResponse;

  // const { isMember, thumbnail, roomName, roomDescription, hostName } =
  //   roomInfo as FetchRoomInfoResponse;

  // const roomDetail = isMember ? roomInfo?.roomDetail : null;
  // const { moments, members, numOfNewJoinRequests } = roomDetail || {
  //   moments: [],
  //   members: [],
  //   numOfNewJoinRequests: null,
  // };

  // console.log(hostName);
  return (
    <section className='w-full max-w-screen-xl px-16 font-light'>
      {/* <RoomHeader
        isMember={isMember}
        thumbnail={thumbnail}
        roomName={roomName}
        roomDescription={roomDescription}
        numOfNewJoinRequests={numOfNewJoinRequests}
      />
      <RoomBody moments={moments} members={members} /> */}
      <RoomHeader isMember={isMember} />
      <RoomBody isMember={isMember} />
    </section>
  );
};

export default Room;
