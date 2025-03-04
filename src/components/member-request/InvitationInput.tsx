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

interface InvitationInputProps {
  setIsInviteMemberClicked: Dispatch<SetStateAction<boolean>>;
}

const InvitationInput: React.FC<InvitationInputProps> = ({
  setIsInviteMemberClicked,
}) => {
  const roomId = +(useParams().roomId as string);
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
      const joinRequestId = await sendInvitation(data);
      if (joinRequestId) {
        // conflict between join-request and invitation
        setPendingJoinRequestId(joinRequestId);
      } else {
        setMessage('Invitation sent!');
      }
      setName('');
    } catch (error) {
      if (error instanceof Error) {
        setErrorMsg(error.message);
      }
    }
  };
  const handleConflictConfirm = async (joinRequestId: number) => {
    await processJoinRequest(joinRequestId, 'accept');
    setPendingJoinRequestId(null);
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
          message={`${name} has already sent a request to join the room. Would you add ${name} as a member of the room right away?`}
          confirmText='Add'
          handleConfirm={() => handleConflictConfirm(pendingJoinRequestId)}
          handleCancel={() => setPendingJoinRequestId(null)}
        />
      )}
    </div>
  );
};

export default InvitationInput;
