import React from 'react';
import { useParams } from 'react-router-dom';
import useRooms from '../hooks/useRooms';
import useAuthStore from '../stores/useAuthStore';
import { useQuery } from '@tanstack/react-query';
import { FetchRoomInfoResponse } from '../types/apis/rooms';

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
    roomDetail,
  } = roomInfo as FetchRoomInfoResponse;
  const { members, moments } = roomDetail;
  return (
    <section>
      <div>
        <img src={thumbnail} alt='background-image' className='w-64 h-auto' />
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
