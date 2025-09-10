import React from 'react';

import { useImageUpload } from '../hooks/useImageUpload';
import { Feature } from '../types';

interface ImageUploaderProps {
  feature: Feature;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ feature }) => {
  const {
    previewUrl,
    uploadStatus,
    fileErrorMessage,
    fileInputRef,
    // imageKey,
    handleFileSelect,
    handleFileChange,
    handleCancelImage,
  } = useImageUpload(feature);

  const handleSubmit = () => {};
  return (
    <div className='max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md'>
      {/* ... 폼과 JSX ... */}
      <h2 className='text-2xl font-bold mb-4'>이미지 업로드 (모듈화)</h2>
      <form onSubmit={handleSubmit}>
        {/* ... textarea ... */}
        <div className='border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition-colors'>
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
                onClick={handleCancelImage}
                className='absolute top-2 right-2 ...'
              >
                {/* ... X 아이콘 ... */}
              </div>
            </div>
          )}
        </div>
        <div className='h-6 mt-2 text-sm text-center'>
          {uploadStatus === 'uploading' && (
            <p className='text-blue-600'>업로드 중...</p>
          )}
          {/* ... 나머지 상태 메시지 ... */}
        </div>
        <button
          type='submit'
          disabled={uploadStatus === 'uploading'}
          className='...'
        >
          제출하기
        </button>
      </form>
      {fileErrorMessage && <p>{fileErrorMessage}</p>}
    </div>
  );
};

export default ImageUploader;
