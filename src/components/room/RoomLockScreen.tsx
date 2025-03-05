import React, { useState } from 'react';
import { IoIosLock } from 'react-icons/io';
import useRoomStore from '../../stores/useRoomStore';
import {
  cancelSentJoinRequest,
  sendJoinRequest,
} from '../../api/joinRequestApi';
import useAuthStore from '../../stores/useAuthStore';
import { useParams } from 'react-router-dom';

const RoomLockScreen: React.FC = () => {
  const userId = useAuthStore((state) => state.user.id) as number;
  const roomId = +(useParams().roomId as string);
  const [sentJoinRequestId, setSentJoinRequestId] = useState<number | null>(
    useRoomStore(
      (state) => state.roomInfo?.userContext?.sentJoinRequestId as number | null
    )
  );
  const { updateSentJoinRequestId } = useRoomStore();
  const handleJoinRequest = async () => {
    const data = {
      userId,
      roomId,
    };
    const joinRequestId = await sendJoinRequest(data);
    setSentJoinRequestId(joinRequestId);
    updateSentJoinRequestId(joinRequestId);
  };
  const handleCancel = async (joinRequestId: number) => {
    await cancelSentJoinRequest(joinRequestId);
    setSentJoinRequestId(null);
    updateSentJoinRequestId(null);
  };
  return (
    <div className='h-full pt-20 pb-24 flex flex-col items-center gap-4'>
      <IoIosLock className='text-5xl text-lightGray' />
      <p>You are not a member of this room.</p>
      {!sentJoinRequestId && (
        <button
          className='w-24 py-1.5 text-sm text-white text-center bg-brand rounded-md box-border inline-block font-medium'
          onClick={handleJoinRequest}
        >
          Join
        </button>
      )}
      {sentJoinRequestId && (
        <div className='text-center text-sm font-medium text-brand'>
          <p className='mb-1'>Join request sent!</p>
          <span>Click to </span>
          <button
            className='font-semibold underline rounded-sm inline-block'
            onClick={() => handleCancel(sentJoinRequestId)}
          >
            cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default RoomLockScreen;
