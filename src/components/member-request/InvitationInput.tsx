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
import { AxiosError } from 'axios';

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
  const handleInvitation = async () => {
    setMessage('');
    setErrorMsg('');
    const data = {
      nickname: name,
      roomId,
    };
    try {
      await sendInvitation(data);
      setName('');
      setMessage('Invitation sent!');
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const errorCode = error.response.data.code;
        if (errorCode === 40401) {
          setErrorMsg(`${name} does not exist!`);
        } else if (errorCode === 40904) {
          setErrorMsg(`${name} is already invited!`);
        } else if (errorCode === 40905) {
          setErrorMsg(`${name} is already in your room!`);
        }
      } else {
        setErrorMsg('An unknown error occurred.');
      }
    }
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
    </div>
  );
};

export default InvitationInput;
