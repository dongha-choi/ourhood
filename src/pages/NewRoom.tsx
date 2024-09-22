import React, { ChangeEvent, FocusEvent, FormEvent, useState } from 'react';
import useRoom from '../hooks/useRoom';
import Button from '../components/ui/Button';
import FormInput from '../components/ui/FormInput';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../stores/useAuthStore';

export interface RoomData {
  name: string;
  description: string;
  thumbnail: File | null;
}

const NewRoom: React.FC = () => {
  const navigate = useNavigate();
  const { createRoom } = useRoom();
  const userId = useAuthStore().user.id as number;
  const [roomData, setRoomData] = useState<RoomData>({
    name: '',
    description: '',
    thumbnail: null,
  });

  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setRoomData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.length) {
      setRoomData((prev) => ({
        ...prev,
        thumbnail: files[0],
      }));
    }
  };

  const handleBlur = (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setRoomData({
      ...roomData,
      [name]: value.trim(),
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const data = {
      userId,
      roomName: roomData.name.trim(),
      roomDescription: roomData.description.trim(),
      thumbnail: roomData.thumbnail,
    };
    if (data.roomName === '') {
      setError('Please write the name of your room!');
      return;
    }
    if (data.roomDescription === '') {
      setError('Please write a description for your room!');
      return;
    }
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value) {
        if (value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, value.toString());
        }
      }
    });
    console.log(formData);

    try {
      setError('');
      setLoading(true);
      const roomId = await createRoom(formData);
      console.log(`room creation success: ${roomId}`);
      navigate(`/rooms/${roomId}`);
    } catch (error) {
      if (error instanceof Error) {
        setError(`${error.message}`);
      } else {
        setError('Room creation failed due to an unknown error');
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className='w-full mt-4 flex flex-col items-center text-lg'>
      <div className='w-80 max-w-100'>
        <div className='my-4 text-center text-2xl font-bold text-brand'>
          Create Room
        </div>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col items-start gap-2'
        >
          <FormInput
            type='text'
            id='room-name'
            name='name'
            value={roomData.name}
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
            name='description'
            value={roomData.description}
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
          <Button
            label='Create'
            loading={loading}
            onClick={handleSubmit}
            type='submit'
          />
        </form>
        {error && <p className='text-red text-sm font-medium'>{error}</p>}
      </div>
    </section>
  );
};

export default NewRoom;
