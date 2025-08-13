import React, { useState } from 'react';
import { IoIosLock } from 'react-icons/io';

import { useQueryClient } from '@tanstack/react-query';

import { processInvitation } from '../../../../apis/invitationApi';
import {
  cancelSentJoinRequest,
  sendJoinRequest,
} from '../../../../apis/joinRequestApi';
import ConfirmModal from '../../../../components/ui/ConfirmModal';
import {
  useRoomId,
  useRoomInfoActions,
  useRoomInfoState,
} from '../store/useRoomInfoStore';

const RoomLockScreen: React.FC = () => {
  const queryClient = useQueryClient();
  const roomId = useRoomId();
  const sentJoinRequestId = useRoomInfoState()?.userContext.sentJoinRequestId;
  const { updateSentJoinRequestId } = useRoomInfoActions();

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
          className='px-4 py-1.5 text-sm aurora-hover text-white text-center bg-brand rounded-md box-border inline-block font-medium'
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
