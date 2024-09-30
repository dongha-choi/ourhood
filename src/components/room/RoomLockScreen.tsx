import React, { useState } from 'react';
import { IoIosLock } from 'react-icons/io';
import useRoomStore from '../../stores/useRoomStore';
import { sendJoinRequest } from '../../api/joinRequestApi';
import useAuthStore from '../../stores/useAuthStore';
import { useParams } from 'react-router-dom';

const RoomLockScreen: React.FC = () => {
  const userId = useAuthStore((state) => state.user.id) as number;
  const roomId = +(useParams().roomId as string);
  const [isJoinRequestSent, setIsJoinRequestSent] = useState(
    useRoomStore.getState().roomInfo?.isJoinRequestSent
  );
  console.log(isJoinRequestSent);
  const handleJoinRequest = async () => {
    // delete request function has not been implemented
    if (isJoinRequestSent) {
      return;
    }
    const data = {
      userId,
      roomId,
    };
    sendJoinRequest(data);
    setIsJoinRequestSent((prev) => !prev);
  };
  return (
    <div className='h-full pt-20 pb-24 flex flex-col items-center gap-4'>
      <IoIosLock className='text-5xl text-lightGray' />
      <p>You are not a member of this room.</p>
      <button
        className='ml-2 px-2.5 py-1 inline-block rounded-md bg-brand text-white font-semibold'
        onClick={handleJoinRequest}
      >
        {isJoinRequestSent ? 'Requested' : 'Join!'}
      </button>
    </div>
  );
};

export default RoomLockScreen;
