import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { sendInvitation } from '../../api/invitationApi';
import { useParams } from 'react-router-dom';
import ConfirmModal from '../ui/ConfirmModal';
import { processJoinRequest } from '../../api/joinRequestApi';
import { useQueryClient } from '@tanstack/react-query';
import useAuthStore from '../../stores/useAuthStore';

interface InvitationInputProps {
  setIsInviteMemberClicked: Dispatch<SetStateAction<boolean>>;
}

const InvitationInput: React.FC<InvitationInputProps> = ({
  setIsInviteMemberClicked,
}) => {
  const queryClient = useQueryClient();
  const roomId = +(useParams().roomId as string);
  const userId = useAuthStore((state) => state.user.id);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  const [name, setName] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);

  const [pendingJoinRequestId, setPendingJoinRequestId] = useState<
    number | null
  >(null);

  const handleInvitation = async () => {
    setMessage('');
    setErrorMsg('');
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
        setErrorMsg(error.message);
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
      {errorMsg && (
        <p className='text-sm font-medium text-red text-center'>{errorMsg}</p>
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
