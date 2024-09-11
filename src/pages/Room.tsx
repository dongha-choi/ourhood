import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useRooms from '../hooks/useRooms';
import useAuthStore from '../stores/useAuthStore';
import { useQuery } from '@tanstack/react-query';
import { FetchRoomInfoResponse } from '../types/apis/rooms';
import RoomHeader from '../components/RoomHeader';
import { View } from '../types/rooms';
import RoomView from '../components/RoomView';

const Room: React.FC = () => {
  const userId = useAuthStore().user.id;
  const roomId = useParams().roomId || '';

  const { fetchRoomInfo } = useRooms();
  const {
    data: roomInfo,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['roomInfo', roomId],
    queryFn: () => fetchRoomInfo(roomId, { userId }),
  });
  const [view, setView] = useState<View>('moments');

  if (isLoading) {
    return <p>loading...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  const { isMember, thumbnail, roomName, roomDescription, hostName } =
    roomInfo as FetchRoomInfoResponse;

  const roomDetail = isMember ? roomInfo?.roomDetail : null;
  const { moments, members, numOfNewJoinRequests } = roomDetail || {
    moments: [],
    members: [],
    numOfNewJoinRequests: null,
  };

  console.log(hostName);
  return (
    <section className='w-full max-w-screen-lg px-16 font-light'>
      <RoomHeader
        isMember={isMember}
        thumbnail={thumbnail}
        roomName={roomName}
        roomDescription={roomDescription}
        numOfNewJoinRequests={numOfNewJoinRequests}
      />
      {isMember && (
        <>
          <div className='border-t text-xs flex justify-center'>
            <div className='w-44 relative flex justify-between gap-8'>
              <div
                className={`absolute w-[72px] h-[1px] bg-black transition-translate duration-300 ${
                  view === 'moments' ? 'translate-x-0' : 'translate-x-end'
                }`}
              ></div>
              <button
                className={
                  'h-full px-1 py-3 flex gap-1 ' +
                  (view === 'moments' ? 'font-bold' : '')
                }
                onClick={() => setView('moments')}
              >
                <span>Moments</span>
                <span>{moments.length}</span>
              </button>
              <button
                className={
                  'h-full px-1 py-3 flex gap-1 ' +
                  (view === 'members' ? 'font-bold' : '')
                }
                onClick={() => setView('members')}
              >
                <span>Members</span>
                <span>{members.length}</span>
              </button>
            </div>
          </div>
          <RoomView view={view} moments={moments} members={members} />
        </>
      )}
      {!isMember && <p>You are not a memeber of this room.</p>}
    </section>
  );
};

export default Room;
