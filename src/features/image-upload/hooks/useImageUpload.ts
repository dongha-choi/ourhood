import { useEffect, useRef, useState } from 'react';

import { getPresignedUrl, uploadFileToS3 } from '../api';
import { ALLOWED_EXTENSIONS, Feature, ImageFileExtension, UploadStatus } from '../types';

const getFileExtension = (fileName: string) => {
  const extension = fileName.split('.').pop()?.toUpperCase() || '';
  return extension === 'JPG' ? 'JPEG' : extension;
};

// --- 타입 가드 함수 ---
// 이 함수는 string 타입의 값을 받아서 ImageFileExtension 타입인지 검사하고,
// 맞다면 TypeScript에게 "이 변수는 ImageFileExtension 타입이야"라고 알려줍니다.
const isImageFileExtension = (ext: string): ext is ImageFileExtension => {
  return (ALLOWED_EXTENSIONS as readonly string[]).includes(ext);
};
export const useImageUpload = (feature: Feature) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageKey, setImageKey] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>('idle');
  const [fileErrorMessage, setFileErrorMessage] = useState<string>('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const resetImageState = () => {
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setImageKey(null);
    setUploadStatus('idle');
    setFileErrorMessage('');
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    resetImageState();

    if (!file.type.startsWith('image/')) {
      setUploadStatus('error');
      setFileErrorMessage('이미지 파일만 업로드할 수 있습니다.');
      return;
    }

    const imageFileExtension = getFileExtension(file.name);

    if (!isImageFileExtension(imageFileExtension)) {
      setUploadStatus('error');
      setFileErrorMessage('JPEG, PNG, WEBP 파일만 업로드할 수 있습니다.');
      return;
    }

    const newPreviewUrl = URL.createObjectURL(file);
    setPreviewUrl(newPreviewUrl);

    // 업로드 로직 실행
    setUploadStatus('uploading');
    setFileErrorMessage('');
    try {
      const { presignedUrl, imageKey } = await getPresignedUrl(
        { imageFileExtension },
        feature
      );
      await uploadFileToS3(presignedUrl, file);
      setImageKey(imageKey);
      setUploadStatus('success');
    } catch (error) {
      console.error('업로드 실패:', error);
      setUploadStatus('error');
      setFileErrorMessage('이미지 업로드에 실패했습니다.');
      resetImageState();
    }
  };

  // UI 컴포넌트에서 사용할 상태와 함수들을 반환
  return {
    previewUrl,
    imageKey,
    uploadStatus,
    fileErrorMessage,
    fileInputRef,
    handleFileSelect,
    handleFileChange,
    handleCancelImage: resetImageState, // 취소는 초기화와 동일
  };
};
