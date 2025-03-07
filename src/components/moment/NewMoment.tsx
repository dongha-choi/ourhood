import React, { ChangeEvent, FocusEvent, FormEvent, useState } from 'react';
import useAuthStore from '../../stores/useAuthStore';
import { useNavigate, useParams } from 'react-router-dom';
import { createMoment } from '../../api/momentApi';
import FormInput from '../ui/FormInput';
import FormTextArea from '../ui/FormTextArea';
import Button from '../ui/Button';
import { useQueryClient } from '@tanstack/react-query';
import { MomentForm } from '../../types/moment';

const NewMoment: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const userId = useAuthStore().user.id as number;
  const roomId = +(useParams().roomId as string);
  const [momentForm, setMomentForm] = useState<MomentForm>({
    description: '',
    image: null,
  });
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setMomentForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.length) {
      setMomentForm((prev) => ({
        ...prev,
        image: files[0],
      }));
    }
  };

  const handleBlur = (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setMomentForm({
      ...momentForm,
      [name]: value.trim(),
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!momentForm.image) {
      setError('Attach an image!');
      return;
    }
    const momentPayload = {
      userId,
      roomId,
      momentImage: momentForm.image as File,
      momentDescription: momentForm.description.trim(),
    };

    try {
      setError('');
      setLoading(true);
      const momentId = await createMoment(momentPayload);
      queryClient.invalidateQueries({ queryKey: ['roomInfo', roomId, userId] });
      navigate(`/rooms/${roomId}/moments/${momentId}`);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        setError(`${error.message}`);
      } else {
        setError('Moment creation failed due to an unknown error');
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
          <FormTextArea
            label='Leave a memo about the moment.'
            id='room-description'
            name='description'
            value={momentForm.description}
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
        {error && <p className='text-red text-sm font-medium'>{error}</p>}
      </div>
    </div>
  );
};

export default NewMoment;
