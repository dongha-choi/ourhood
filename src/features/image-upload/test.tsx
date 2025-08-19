// ImageUploader.tsx

import React, { useEffect, useRef, useState } from 'react';

// 서버 API 응답 타입 정의
interface PresignedUrlResponse {
  imageKey: string;
  presignedUrl: string;
}

// Mock API 함수들 (실제 구현에서는 axios나 fetch를 사용)
const getPresignedUrl = async (
  fileName: string
): Promise<PresignedUrlResponse> => {
  console.log(`서버에 Presigned URL 요청: ${fileName}`);
  // 실제로는 여기서 서버 API를 호출합니다.
  // 예: const response = await axios.post('/api/images/presigned-url', { fileName });
  await new Promise((resolve) => setTimeout(resolve, 500)); // 네트워크 지연 시뮬레이션

  const imageKey = `images/${Date.now()}_${fileName}`;
  return {
    imageKey,
    presignedUrl: `https://mock-s3-bucket.com/${imageKey}?signature=...`, // 실제로는 서버가 생성한 URL
  };
};

const uploadFileToS3 = async (presignedUrl: string, file: File) => {
  console.log('Presigned URL로 파일 업로드 시작...');
  // 실제로는 이 URL에 PUT 요청으로 파일을 업로드합니다.
  // 예: await axios.put(presignedUrl, file, { headers: { 'Content-Type': file.type } });
  await new Promise((resolve) => setTimeout(resolve, 1000)); // 업로드 시간 시뮬레이션
  console.log('파일 업로드 성공!');
};

const submitMainForm = async (formData: {
  content: string;
  imageKey: string | null;
}) => {
  console.log('메인 폼 제출:', formData);
  // 예: await axios.post('/api/posts', formData);
  await new Promise((resolve) => setTimeout(resolve, 500));
  alert('폼 제출 성공!');
};

// 컴포넌트 시작
const ImageUploader: React.FC = () => {
  // --- STATE ---
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageKey, setImageKey] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<
    'idle' | 'uploading' | 'success' | 'error'
  >('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  // 텍스트 입력을 위한 상태 (폼의 다른 데이터)
  const [textContent, setTextContent] = useState<string>('');

  // --- REFS ---
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- EFFECTS ---
  // previewUrl이 변경될 때마다 이전 URL을 메모리에서 해제
  useEffect(() => {
    // cleanup 함수
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  // --- HANDLERS ---
  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // 이전 상태 초기화
    resetImageState();

    // 이미지 파일 유효성 검사 (예: 타입, 크기)
    if (!file.type.startsWith('image/')) {
      setUploadStatus('error');
      setErrorMessage('이미지 파일만 업로드할 수 있습니다.');
      return;
    }

    // 미리보기 생성 및 상태 업데이트
    const newPreviewUrl = URL.createObjectURL(file);
    setPreviewUrl(newPreviewUrl);
    setImageFile(file);

    // Presigned URL을 받아와서 업로드 실행
    uploadImage(file);
  };

  const uploadImage = async (file: File) => {
    setUploadStatus('uploading');
    setErrorMessage('');

    try {
      // 1. 서버로부터 Presigned URL과 imageKey를 받아옴
      const { presignedUrl, imageKey } = await getPresignedUrl(file.name);

      // 2. 받아온 Presigned URL로 실제 파일을 S3에 업로드
      await uploadFileToS3(presignedUrl, file);

      // 3. 업로드 성공 후 imageKey를 상태에 저장
      setImageKey(imageKey);
      setUploadStatus('success');
    } catch (error) {
      console.error('업로드 실패:', error);
      setUploadStatus('error');
      setErrorMessage('이미지 업로드에 실패했습니다. 다시 시도해주세요.');
      resetImageState(); // 실패 시 모든 상태 초기화
    }
  };

  const handleCancelImage = () => {
    resetImageState();
  };

  const resetImageState = () => {
    // input 값 초기화. 이걸 안하면 같은 파일을 다시 선택했을 때 onChange가 발생하지 않음.
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setImageFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    setImageKey(null);
    setUploadStatus('idle');
    setErrorMessage('');
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (uploadStatus === 'uploading') {
      alert('이미지가 업로드 중입니다. 잠시만 기다려주세요.');
      return;
    }
    if (uploadStatus === 'success' && !imageKey) {
      alert('이미지 정보가 올바르지 않습니다. 다시 업로드해주세요.');
      return;
    }

    // 서버에 보낼 최종 데이터
    const formData = {
      content: textContent,
      imageKey: imageKey, // 이미지가 없으면 null
    };

    try {
      await submitMainForm(formData);
      // 성공 후 폼 초기화
      setTextContent('');
      resetImageState();
    } catch (error) {
      alert('폼 제출에 실패했습니다.');
    }
  };

  // --- RENDER ---
  return (
    <div className='max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md'>
      <h2 className='text-2xl font-bold mb-4'>이미지 업로드</h2>

      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label
            htmlFor='content'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            내용
          </label>
          <textarea
            id='content'
            value={textContent}
            onChange={(e) => setTextContent(e.target.value)}
            className='w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500'
            rows={4}
            placeholder='내용을 입력하세요...'
          />
        </div>

        <div className='border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition-colors'>
          {/* 숨겨진 실제 파일 input */}
          <input
            type='file'
            accept='image/*'
            ref={fileInputRef}
            onChange={handleFileChange}
            className='hidden'
          />

          {!previewUrl && (
            <div onClick={handleFileSelect}>
              <p className='text-gray-500'>클릭하여 이미지 업로드</p>
              <p className='text-xs text-gray-400 mt-1'>
                PNG, JPG, GIF up to 10MB
              </p>
            </div>
          )}

          {previewUrl && (
            <div className='relative group'>
              <img
                src={previewUrl}
                alt='미리보기'
                className='max-h-60 mx-auto rounded-md'
              />
              <div
                className='absolute top-2 right-2 p-1.5 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-75 transition-opacity'
                onClick={handleCancelImage}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                    clipRule='evenodd'
                  />
                </svg>
              </div>
            </div>
          )}
        </div>

        {/* 업로드 상태 메시지 */}
        <div className='h-6 mt-2 text-sm text-center'>
          {uploadStatus === 'uploading' && (
            <p className='text-blue-600'>업로드 중...</p>
          )}
          {uploadStatus === 'success' && (
            <p className='text-green-600'>✅ 업로드 성공!</p>
          )}
          {uploadStatus === 'error' && (
            <p className='text-red-600'>⚠️ {errorMessage}</p>
          )}
        </div>

        <button
          type='submit'
          className='w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400'
          disabled={uploadStatus === 'uploading'}
        >
          제출하기
        </button>
      </form>
    </div>
  );
};

export default ImageUploader;
