import React, { ChangeEvent, FocusEvent, FormEvent, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

import Button from '../../../components/ui/Button';
import FormInput from '../../../components/ui/FormInput';
import FormTextArea from '../../../components/ui/FormTextArea';
import { cleanObject } from '../../../utils/cleanObject';
import { useImageUpload } from '../../image-upload/hooks/useImageUpload';
import { useRoomId } from '../../room/view/store/useRoomInfoStore';
import { createMoment } from '../api';
import { CreateMomentRequest } from '../api/dto';

const CreateMomentForm: React.FC = () => {
  // --- STATE ---
  const [momentDescription, setMomentDescription] = useState<string>('');

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // --- HOOKS ---
  const navigate = useNavigate();
  const {
    previewUrl,
    imageKey: momentImageKey,
    uploadStatus,
    fileErrorMessage,
    handleFileChange,
    handleCancelImage,
  } = useImageUpload('moment');
  const roomId = useRoomId() as number;

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setMomentDescription(e.target.value);

  const handleBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setMomentDescription(e.target.value.trim());

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (uploadStatus === 'uploading') {
      alert('Uploading image...');
      return;
    }
    if (!momentImageKey) {
      setErrorMessage('Attach an image!');
      return;
    }
    const momentPayload = cleanObject({
      roomId,
      momentImageKey,
      momentDescription: momentDescription.trim(),
    });

    try {
      setErrorMessage('');
      setLoading(true);
      const momentId = await createMoment(momentPayload as CreateMomentRequest);
      navigate(`/rooms/${roomId}/moments/${momentId}`);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(`${error.message}`);
      } else {
        setErrorMessage('Moment creation failed due to an unknown error');
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className='w-full mt-4 flex flex-col items-center text-lg'>
      <div className='w-80 max-w-100'>
        <div className='my-4 text-center text-2xl font-bold text-brand'>
          Archive the moment!
        </div>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col items-start gap-2'
        >
          <FormInput
            type='file'
            id='moment-image'
            name='image'
            label='Attach the image of the moment!'
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
              <div
                className='absolute right-1 top-1'
                onClick={handleCancelImage}
              >
                <IoClose className='text-red text-lg cursor-pointer hover-white hover:bg-opacity-35 rounded-full' />
              </div>
              )
            </div>
          )}
          {fileErrorMessage && (
            <p className='text-red text-sm font-medium'>{fileErrorMessage}</p>
          )}
          <FormTextArea
            label='Leave a memo about the moment.'
            id='room-description'
            name='description'
            value={momentDescription}
            onChange={handleInputChange}
            onBlur={handleBlur}
            placeholder='Your memo here...'
            rows={3}
          />
          <Button
            label='Archive'
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
      </div>
    </div>
  );
};

export default CreateMomentForm;
