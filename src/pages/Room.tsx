import React from 'react';
import { useParams } from 'react-router-dom';
import useRooms from '../hooks/useRooms';
import useAuthStore from '../stores/useAuthStore';
import { useQuery } from '@tanstack/react-query';
import { FetchRoomInfoResponse } from '../types/apis/rooms';
import DefaultImage from '../components/ui/DefaultImage';
import {
  MdNotificationsNone,
  MdOutlineAddPhotoAlternate,
} from 'react-icons/md';
import { FaRegImage } from 'react-icons/fa';

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
    <section className='w-full max-w-screen-lg px-16 font-light'>
      <div className='pb-52'>
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
      <div className='pt-2 pb-6 flex justify-between items-center'>
        <div>
          <h1 className='text-3xl font-semibold'>{roomName}</h1>
          <h2 className='text-base'>{roomDescription}</h2>
        </div>
        <aside className='text-3xl flex gap-1 mr-1'>
          <button>
            <MdOutlineAddPhotoAlternate />
          </button>
          <button className='relative'>
            <MdNotificationsNone />
            <div className='w-3 h-3 absolute rounded-full top-0.5 right-0.5 bg-red text-2xs text-white font-semibold'>
              3
            </div>
          </button>
        </aside>
      </div>
      <div className='border-t text-xs flex justify-center gap-8'>
        <button className='h-full px-1 py-2 flex gap-1 border-t box-border font-bold'>
          <span>Moments</span>
          <span>{moments.length}</span>
        </button>
        <button className='h-full px-1 py-2 flex gap-1 border-t border-transparent'>
          <span>Members</span>
          <span>{members.length}</span>
        </button>
      </div>
      {isMember && (
        <ul>
          {moments.map((moment) => (
            <li>
              {moment.momentId}
              <img src={moment.imageUrl} alt='' />
            </li>
          ))}
        </ul>
      )}
      {!isMember && <p>You are not a memeber of this room.</p>}
    </section>
  );
};

export default Room;
