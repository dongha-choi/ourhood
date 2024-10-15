import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import FormInput from '../ui/FormInput';
import Button from '../ui/Button';
import { useNavigate } from 'react-router-dom';
import useRoom from '../../hooks/useRoom';
import { RoomData } from '../../types/room';
import useRoomStore from '../../stores/useRoomStore';
import createImageFile from '../../utils/createImageFile';
import useForm from '../../hooks/useForm';
import { useQueryClient } from '@tanstack/react-query';
import useAuthStore from '../../stores/useAuthStore';

const RoomEdit: React.FC = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { editRoom } = useRoom();

  const userId = useAuthStore().user.id as number;
  const roomId = useRoomStore((state) => state.roomInfo?.roomId) as number;
  const roomName = useRoomStore((state) => state.roomInfo?.roomName);
  const roomDescription = useRoomStore(
    (state) => state.roomInfo?.roomDescription
  );
  const originalUrl = useRoomStore((state) => state.roomInfo?.thumbnail);
  const [originalImg, setOriginalImg] = useState<File | null>(null);

  const {
    formData: roomData,
    setFormData: setRoomData,
    url,
    setUrl,
    handleInputChange,
    handleBlur,
  } = useForm<RoomData>({
    roomId: null,
    roomName: '',
    roomDescription: '',
    thumbnail: null,
  });

  const handleThumbnailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files?.length) {
      console.log(files[0]);
      setRoomData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
      setUrl(URL.createObjectURL(files[0]));
    } else {
      setUrl(originalUrl as string);
      setRoomData((prev) => ({
        ...prev,
        [name]: originalImg,
      }));
    }
  };

  useEffect(() => {
    if (!roomId || !roomName || !roomDescription || !originalUrl) {
      return;
    }
    setRoomData((prev) => ({
      ...prev,
      roomId,
      roomName,
      roomDescription,
    }));
    setUrl(originalUrl);
    createImageFile(originalUrl, `${roomName}-thumbnail`).then((imgFile) => {
      setOriginalImg(imgFile);
      setRoomData((prev) => ({
        ...prev,
        thumbnail: imgFile,
      }));
    });
  }, [roomId, roomName, roomDescription, originalUrl, setRoomData, setUrl]);

  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { roomId, ...roomPayload } = roomData;

    try {
      setError('');
      setLoading(true);
      await editRoom(roomId as number, roomPayload);
      queryClient.invalidateQueries({ queryKey: ['roomInfo', roomId, userId] });
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
  console.log('url', url);
  console.log('original', JSON.stringify(originalImg));
  console.log('roomData', roomData.thumbnail);
  return (
    <section className='w-full mt-4 flex flex-col items-center text-lg'>
      <div className='w-80 max-w-100'>
        <div className='my-4 text-center text-2xl font-bold text-brand'>
          Edit Room
        </div>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col items-start gap-2'
        >
          <FormInput
            type='text'
            id='room-name'
            name='roomName'
            value={roomData.roomName}
            label='Room Name'
            onChange={handleInputChange}
            onBlur={handleBlur}
          />
          <label
            htmlFor='room-description'
            className='w-full mt-2 text-sm font-semibold'
          >
            Room Description
          </label>
          <textarea
            id='room-description'
            name='roomDescription'
            value={roomData.roomDescription}
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
            label='Attach an image to change thumbnail.'
            onChange={handleThumbnailChange}
          />
          {url && (
            <img src={url} alt='room-thumbnail' className='w-full h-auto' />
          )}
          <Button
            label='Save'
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

export default RoomEdit;
