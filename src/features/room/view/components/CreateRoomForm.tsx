import React, { ChangeEvent, FocusEvent, FormEvent, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

import Button from '../../../../components/ui/Button';
import FormInput from '../../../../components/ui/FormInput';
import { cleanObject } from '../../../../utils/cleanObject';
import { useImageUpload } from '../../../image-upload/hooks/useImageUpload';
import { createRoom } from '../api';
import { CreateRoomRequest } from '../api/dto';

interface CreateRoomFormValues {
  roomName: string;
  roomDescription: string;
  thumbnailImageKey: string | null;
}

const CreateRoomForm: React.FC = () => {
  // --- STATE ---
  const [formValues, setFormValues] = useState<CreateRoomFormValues>({
    roomName: '',
    roomDescription: '',
    thumbnailImageKey: null,
  });
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // --- HOOKS ---
  const navigate = useNavigate();
  const {
    previewUrl,
    imageKey,
    uploadStatus,
    fileErrorMessage,
    // fileInputRef,
    // handleFileSelect,
    handleFileChange,
    handleCancelImage,
  } = useImageUpload('room');

  // --- HANDLERS ---
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleBlur = (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value.trim(),
    });
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (uploadStatus === 'uploading') {
      alert('Uploading image...');
      return;
    }
    const trimmedName = formValues.roomName.trim();
    if (trimmedName === '') {
      setErrorMessage('Please write the name of your room!');
      return;
    }
    const trimmedDescription = formValues.roomDescription.trim();

    const payload = cleanObject({
      roomName: trimmedName,
      roomDescription: trimmedDescription,
      thumbnailImageKey: imageKey,
    });

    try {
      setErrorMessage('');
      setLoading(true);
      const roomId = await createRoom(payload as CreateRoomRequest);
      navigate(`/rooms/${roomId}`);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(`${error.message}`);
      } else {
        setErrorMessage('Room creation failed due to an unknown error');
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit} className='flex flex-col items-start gap-2'>
        <FormInput
          type='text'
          id='room-name'
          name='roomName'
          value={formValues.roomName}
          label='What is the name of your Room?'
          onChange={handleInputChange}
          onBlur={handleBlur}
        />
        <label
          htmlFor='room-description'
          className='w-full mt-2 text-sm font-semibold'
        >
          Write a description of the room.
        </label>
        <textarea
          id='room-description'
          name='roomDescription'
          value={formValues.roomDescription}
          onChange={handleInputChange}
          onBlur={handleBlur}
          placeholder='Explain about your room...'
          className='w-full border-light p-1 text-sm min-h-12 appearance-none rounded'
          rows={3}
        />
        <FormInput
          type='file'
          id='room-thumbnail'
          name='thumbnail'
          label='Attach a thumbnail for your room!'
          onChange={handleFileChange}
        />
        {previewUrl && (
          <div className='relative'>
            <img
              src={previewUrl}
              alt='room-thumbnail'
              className='relative w-full h-auto'
            />
            (
            <div className='absolute right-1 top-1' onClick={handleCancelImage}>
              <IoClose className='text-red text-lg cursor-pointer hover-white hover:bg-opacity-35 rounded-full' />
            </div>
            )
          </div>
        )}
        {fileErrorMessage && (
          <p className='text-red text-sm font-medium'>{fileErrorMessage}</p>
        )}
        <Button
          label='Create'
          disabled={loading}
          onClick={handleSubmit}
          size='full'
          shape='primary'
          type='submit'
        />
      </form>
      {errorMessage && (
        <p className='text-red text-sm font-medium'>{errorMessage}</p>
      )}
    </>
  );
};

export default CreateRoomForm;
