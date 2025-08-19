import React, { ChangeEvent, FocusEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface RoomForm {
  roomName: string;
  roomDescription?: string;
  thumbnailImageKey?: string;
}

const RoomForm: React.FC = () => {
  const navigate = useNavigate();

  // --- STATE ---
  const [roomData, setRoomData] = useState<RoomForm>({
    roomName: '',
    roomDescription: '',
    thumbnailImageKey: '',
  });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);


  // --- EFFECTS ---
  // previewUrl이 변경될 때마다 이전 URL을 메모리에서 해제
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  // --- HANDLERS ---
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setRoomData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 이전 상태 초기화
    resetImageState();

    // 이미지 파일 유효성 검사 (예: 타입, 크기)
    if (!file.type.startsWith('image/')) {
        setUploadStatus('error');
        setErrorMessage('이미지 파일만 업로드할 수 있습니다.');
        return;
    }

    
    const newPreviewUrl = URL.createObjectURL(file);
    setPreviewUrl(newPreviewUrl);


    const resetImageState = () => {
    // input 값 초기화. 이걸 안하면 같은 파일을 다시 선택했을 때 onChange가 발생하지 않음.
    
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
    const trimmedName = (roomData.roomName as string).trim();
    if (trimmedName === '') {
      setErrorMessage('Please write the name of your room!');
      return;
    }
    const trimmedDescription = (roomData.roomDescription as string).trim();
    if (trimmedDescription === '') {
      setErrorMessage('Please write a description of your room!');
      return;
    }
    const payload = {
      roomName: trimmedName,
      roomDescription: trimmedDescription,
      thumbnailUrl: '',
    };
    if (roomData.thumbnailUrl) {
      payload.thumbnailUrl = roomData.thumbnailUrl;
    }

    try {
      setErrorMessage('');
      setLoading(true);
      const roomId = await createRoom(payload);
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
          value={roomData.roomName}
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
          label='Attach a thumbnail for your room!'
          onChange={handleFileChange}
        />
        <Button
          label='Create'
          disabled={loading}
          onClick={handleSubmit}
          size='full'
          shape='primary'
          type='submit'
        />
      </form>
      {errorMessage && <p className='text-red text-sm font-medium'>{errorMessage}</p>}
    </>
  );
};

export default RoomForm;
