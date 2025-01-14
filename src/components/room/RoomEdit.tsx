import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import FormInput from '../ui/FormInput';
import { useNavigate, useParams } from 'react-router-dom';
import useRoom from '../../hooks/useRoom';
import { RoomData } from '../../types/room';
import useRoomStore from '../../stores/useRoomStore';
import useForm from '../../hooks/useForm';
import { useQueryClient } from '@tanstack/react-query';
import useAuthStore from '../../stores/useAuthStore';
import { IoClose } from 'react-icons/io5';

const RoomEdit: React.FC = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { editRoom } = useRoom();

  const userId = useAuthStore().user.id as number;
  // 추후에 useRoomStore에 roomDetail로 묶어서 저장
  const roomId = +(useParams().roomId as string);
  const roomName = useRoomStore((state) => state.roomInfo?.roomName);
  const roomDescription = useRoomStore(
    (state) => state.roomInfo?.roomDescription
  );
  const originalUrl = useRoomStore((state) => state.roomInfo?.thumbnail);

  const {
    formData: roomData,
    setFormData: setRoomData,
    url,
    setUrl,
    handleInputChange,
    handleBlur,
  } = useForm<RoomData>({
    roomName: '',
    roomDescription: '',
    thumbnail: null,
  });

  const handleThumbnailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files?.length) {
      setRoomData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
      setUrl(URL.createObjectURL(files[0]));
    } else {
      setUrl(originalUrl as string);
      setRoomData((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };
  useEffect(() => {
    if (roomName && roomDescription) {
      setRoomData((prev) => ({
        ...prev,
        roomName,
        roomDescription,
      }));
    }
    if (originalUrl) {
      setUrl(originalUrl);
    }
  }, [roomName, roomDescription, originalUrl, setRoomData, setUrl]);

  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // filter changes
    const roomPayload: RoomData = {};
    if (roomData.roomName !== roomName) {
      roomPayload.roomName = roomData.roomName;
    }
    if (roomData.roomDescription !== roomDescription) {
      roomPayload.roomDescription = roomData.roomDescription;
    }
    if (roomData.thumbnail) {
      roomPayload.thumbnail = roomData.thumbnail;
    }

    try {
      setError('');
      setLoading(true);
      console.log(roomPayload);
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
  console.log(roomDescription);
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
            label={`Attach an image to ${
              originalUrl ? 'change' : 'enroll'
            } thumbnail.`}
            onChange={handleThumbnailChange}
          />
          {/* {originalUrl && (
            url ? (
              <div className='relative'>
              <img
                src={url}
                alt='room-thumbnail'
                className='relative w-full h-auto'
              />
                <button
                  className='absolute right-1 top-1'
                  onClick={() => setUrl('')}
                >
                  <IoClose className='text-red text-lg cursor-pointer hover-white hover:bg-opacity-35 rounded-full' />
                </button>
            </div>
            ) : (
              <div className='flex gap-2'>
              <p>Thumbnail deleted!</p>
              <button
                className='hover-white border-light'
                onClick={() => setUrl(originalUrl)}
              >
                Restore
              </button>
            </div>
            )
          )}
          {!originalUrl && (
            url ? (
              <img
                src={url}
                alt='room-thumbnail'
                className='relative w-full h-auto'
              />
            ) : (
              <div className='flex gap-2'>
              <p>Thumbnail deleted!</p>
              <button
                className='hover-white border-light'
                onClick={() => setUrl(originalUrl)}
              >
                Restore
              </button>
            </div>
            )
          )} */}
          {url ? (
            <div className='relative'>
              <img
                src={url}
                alt='room-thumbnail'
                className='relative w-full h-auto'
              />
              {originalUrl && (
                <div
                  className='absolute right-1 top-1'
                  onClick={() => setUrl('')}
                >
                  <IoClose className='text-red text-lg cursor-pointer hover-white hover:bg-opacity-35 rounded-full' />
                </div>
              )}
            </div>
          ) : (
            originalUrl && (
              <div className='flex gap-2'>
                <p>Thumbnail deleted!</p>
                <button
                  type='button'
                  className='hover-white border-light'
                  onClick={() => setUrl(originalUrl)}
                >
                  Restore
                </button>
              </div>
            )
          )}
          <div className='flex gap-2'>
            <button
              className='flex-1 px-2 py-1 rounded-lg text-white bg-brand'
              disabled={loading}
              onClick={handleSubmit}
              type='submit'
            >
              Save
            </button>
            <button type='button' disabled={loading} onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
        {error && <p className='text-red text-sm font-medium'>{error}</p>}
      </div>
    </section>
  );
};

export default RoomEdit;
