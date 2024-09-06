import React from 'react';
import { useParams } from 'react-router-dom';
import useRooms from '../hooks/useRooms';
import useAuthStore from '../stores/useAuthStore';
import { useQuery } from '@tanstack/react-query';
import { FetchRoomInfoResponse } from '../types/apis/rooms';
import DefaultImage from '../components/ui/DefaultImage';

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

  if (isLoading) {
    return <p>loading...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  const {
    isMember,
    thumbnail,
    roomName,
    roomDescription,
    hostName,
    roomDetail: { members, moments },
  } = roomInfo as FetchRoomInfoResponse;
  return (
    <section>
      <div className='pb-64'>
        {thumbnail ? (
          <img
            src={thumbnail}
            alt='background-image'
            className='absolute left-0 w-screen h-48 object-cover'
          />
        ) : (
          <DefaultImage style='absolute left-0 w-screen h-48' />
        )}
      </div>
      <div>
        <h1>{roomName}</h1>
        <h2>{roomDescription}</h2>
        <span>{hostName}</span>
      </div>
      <aside>
        <span>Members</span>
        <span>{members.length}</span>
        {isMember && (
          <ul>
            Is member!
            {moments.map((moment) => (
              <li>
                {moment.momentId}
                <img src={moment.imageUrl} alt='' />
              </li>
            ))}
          </ul>
        )}
      </aside>
    </section>
  );
};

export default Room;
