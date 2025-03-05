import React, { useState } from 'react';
import { IoIosLock } from 'react-icons/io';
import useRoomStore from '../../stores/useRoomStore';
import {
  cancelSentJoinRequest,
  sendJoinRequest,
} from '../../api/joinRequestApi';
import useAuthStore from '../../stores/useAuthStore';
import { useParams } from 'react-router-dom';
import ConfirmModal from '../ui/ConfirmModal';
import { processInvitation } from '../../api/invitationApi';
import { useQueryClient } from '@tanstack/react-query';

const RoomLockScreen: React.FC = () => {
  const queryClient = useQueryClient();
  const userId = useAuthStore((state) => state.user.id) as number;
  const roomId = +(useParams().roomId as string);
  const [sentJoinRequestId, setSentJoinRequestId] = useState<number | null>(
    useRoomStore(
      (state) => state.roomInfo?.userContext?.sentJoinRequestId as number | null
    )
  );
  const { updateSentJoinRequestId } = useRoomStore();

  const [errorMsg, setErrorMsg] = useState<string>('');
  const [pendingInvitationId, setPendingInvitationId] = useState<number | null>(
    null
  );
  const handleJoinRequest = async () => {
    const data = {
      userId,
      roomId,
    };
    try {
      const result = await sendJoinRequest(data);
      if (result.isPending) {
        // conflict between join-request and invitation
        setPendingInvitationId(result.pendingInvitationId);
      } else {
        setSentJoinRequestId(result.sentJoinRequestId);
        updateSentJoinRequestId(result.sentJoinRequestId);
      }
    } catch (error) {
      if (error instanceof Error) {
        setErrorMsg(error.message);
      }
    }
  };
  const handleCancelSentJoinRequest = async (joinRequestId: number) => {
    await cancelSentJoinRequest(joinRequestId);
    setSentJoinRequestId(null);
    updateSentJoinRequestId(null);
  };

  const handleConfirmPendingInvitation = async (
    pendingInvitationId: number
  ) => {
    await processInvitation(pendingInvitationId, 'accept');
    setPendingInvitationId(null);
    queryClient.invalidateQueries({ queryKey: ['roomInfo', roomId, userId] });
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
            onClick={() => handleCancelSentJoinRequest(sentJoinRequestId)}
          >
            cancel
          </button>
        </div>
      )}
      {pendingInvitationId && (
        <ConfirmModal
          title={`Join right away?`}
          message={`You have already received an invitation from this room. Would you join right away?`}
          confirmText='Join'
          handleConfirm={() =>
            handleConfirmPendingInvitation(pendingInvitationId)
          }
          handleCancel={() => setPendingInvitationId(null)}
        />
      )}
      {errorMsg && (
        <p className='text-sm font-medium text-red text-center'>{errorMsg}</p>
      )}
    </div>
  );
};

export default RoomLockScreen;
