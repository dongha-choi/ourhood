import React, { useState } from 'react';
import { IoIosLock } from 'react-icons/io';
import useRoomStore from '../../stores/useRoomStore';
import { sendJoinRequest } from '../../api/joinRequestApi';
import useAuthStore from '../../stores/useAuthStore';
import { useParams } from 'react-router-dom';
import Button from '../ui/Button';

const RoomLockScreen: React.FC = () => {
  const userId = useAuthStore((state) => state.user.id) as number;
  const roomId = +(useParams().roomId as string);
  const [sentJoinRequestId, setSentJoinRequestId] = useState<number | null>(
    useRoomStore(
      (state) => state.roomInfo?.userContext?.sentJoinRequestId as number | null
    )
  );
  const handleJoinRequest = async () => {
    // delete request function has not been implemented
    if (sentJoinRequestId) {
      return;
    }
    const data = {
      userId,
      roomId,
    };
    const joinRequestId = await sendJoinRequest(data);
    setSentJoinRequestId(joinRequestId);
  };
  return (
    <div className='h-full pt-20 pb-24 flex flex-col items-center gap-4'>
      <IoIosLock className='text-5xl text-lightGray' />
      <p>You are not a member of this room.</p>
      <Button
        label={sentJoinRequestId ? 'Requested!' : 'Join'}
        onClick={handleJoinRequest}
        size='small'
        shape='primary'
      />
    </div>
  );
};

export default RoomLockScreen;
