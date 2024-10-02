import React, { ChangeEvent, FocusEvent, FormEvent, useState } from 'react';
import useAuthStore from '../../stores/useAuthStore';
import { useNavigate, useParams } from 'react-router-dom';
import createFormData from '../../utils/createFormData';
import { createMoment } from '../../api/momentApi';
import FormInput from '../ui/FormInput';
import FormTextArea from '../ui/FormTextArea';
import Button from '../ui/Button';
import { useQueryClient } from '@tanstack/react-query';

export interface MomentData {
  description: string;
  image: File | null;
}

// router: '/rooms/:roomId/moments/:momentId'
const NewMoment: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const userId = useAuthStore().user.id as number;
  const roomId = +(useParams().roomId as string);
  const [momentData, setMomentData] = useState<MomentData>({
    description: '',
    image: null,
  });
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setMomentData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.length) {
      setMomentData((prev) => ({
        ...prev,
        image: files[0],
      }));
    }
  };

  const handleBlur = (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setMomentData({
      ...momentData,
      [name]: value.trim(),
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const data = {
      userId,
      roomId,
      momentImage: momentData.image as File,
      momentDescription: momentData.description.trim(),
    };
    const momentFormData = createFormData(data);

    try {
      setError('');
      setLoading(true);
      const momentId = await createMoment(momentFormData);
      queryClient.invalidateQueries({ queryKey: ['roomInfo', roomId, userId] });
      navigate(`/rooms/${roomId}/moments/${momentId}`);
    } catch (error) {
      if (error instanceof Error) {
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
            value={momentData.description}
            onChange={handleInputChange}
            onBlur={handleBlur}
            placeholder='Your memo here...'
            rows={3}
          />
          <Button
            label='Archive'
            loading={loading}
            onClick={handleSubmit}
            type='submit'
          />
        </form>
        {error && <p className='text-red text-sm font-medium'>{error}</p>}
      </div>
    </div>
  );
};

export default NewMoment;
