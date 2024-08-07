import React, { ChangeEvent, FormEvent, useState } from 'react';
import useRooms from '../hooks/useRooms';
import Button from '../components/ui/Button';
import FormInput from '../components/ui/FormInput';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../stores/useAuthStore';

export interface RoomData {
  roomName: string;
  roomDescription: string;
}

const NewRoom: React.FC = () => {
  const { createRoom } = useRooms();
  const { user } = useAuthStore();
  const [roomData, setRoomData] = useState<RoomData>({
    roomName: '',
    roomDescription: '',
    // roomThumbnail: ''
  });
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setRoomData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    for (const key in roomData) {
      if (!roomData[key as keyof RoomData].trim()) {
        setError(`${key} is empty!`);
        return;
      }
    }

    try {
      setError('');
      setLoading(true);
      const data = { ...roomData, userId: user.id };
      const roomId = await createRoom(data);
      console.log(roomId);
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
            name='roomName'
            value={roomData.roomName}
            label='What is the name of your Room?'
            onChange={handleInputChange}
          />
          <p className='w-full mt-2 text-sm font-semibold'>
            Write a description of the room.
          </p>
          <textarea
            name='roomDescription'
            value={roomData.roomDescription}
            onChange={handleInputChange}
            placeholder='Explain about your room...'
            className='w-full border-light p-1 text-sm min-h-12 appearance-none rounded'
            rows={3}
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
