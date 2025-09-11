import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useQueryClient } from '@tanstack/react-query';

import ConfirmModal from '../../../components/ui/ConfirmModal';
import { useAuthUserId } from '../../auth/store/useAuthStore';
import { processJoinRequest } from '../../join-request/api';
import { sendInvitation } from '../api';

interface InvitationInputProps {
  setIsInviteMemberClicked: Dispatch<SetStateAction<boolean>>;
}

const InvitationInput: React.FC<InvitationInputProps> = ({
  setIsInviteMemberClicked,
}) => {
  const queryClient = useQueryClient();
  const roomId = +(useParams().roomId as string);
  const userId = useAuthUserId();
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  const [name, setName] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);

  const [pendingJoinRequestId, setPendingJoinRequestId] = useState<
    number | null
  >(null);

  const handleInvitation = async () => {
    setMessage('');
    setErrorMessage('');
    const data = {
      nickname: name,
      roomId,
    };
    try {
      const result = await sendInvitation(data);
      if (result.isPending) {
        // conflict between join-request and invitation
        setPendingJoinRequestId(result.pendingJoinRequestId);
      } else {
        setMessage('Invitation sent!');
        setName('');
      }
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    }
  };

  const handleConfirmPendingJoinRequest = async (
    pendingJoinRequestId: number
  ) => {
    await processJoinRequest(pendingJoinRequestId, 'accept');
    setPendingJoinRequestId(null);
    setName('');
    queryClient.invalidateQueries({ queryKey: ['roomInfo', roomId, userId] });
  };

  return (
    <div>
      <div className='mb-1 w-full p-2 border-2 border-brand rounded-md'>
        <input
          ref={inputRef}
          type='text'
          name='invitation-name'
          id='invitation-name'
          value={name}
          onChange={handleChange}
          placeholder='Enter the nickname...'
          className={`w-full p-1 font-normal outline-none ${
            name ? 'text-center' : 'pl-8 text-left'
          }`}
        />
        <div className='mt-1 flex justify-center gap-8'>
          <button
            className='font-semibold text-brand'
            onClick={handleInvitation}
          >
            Invite
          </button>
          <button onClick={() => setIsInviteMemberClicked(false)}>
            Cancel
          </button>
        </div>
      </div>
      {message && (
        <p className='text-sm font-medium text-[#11ab00] text-center'>
          {message}
        </p>
      )}
      {errorMessage && (
        <p className='text-sm font-medium text-red text-center'>
          {errorMessage}
        </p>
      )}
      {pendingJoinRequestId && (
        <ConfirmModal
          title={`Add ${name} right away?`}
          message={`${name} has already sent a request to join the room. Would you add ${name} right away?`}
          confirmText='Add'
          handleConfirm={() =>
            handleConfirmPendingJoinRequest(pendingJoinRequestId)
          }
          handleCancel={() => setPendingJoinRequestId(null)}
        />
      )}
    </div>
  );
};

export default InvitationInput;
