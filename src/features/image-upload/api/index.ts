import authApiClient from '../../../apis/clients/authApiClient';
import { Feature } from '../types';
import { PresignRequest, PresignResponse } from './dto';

export const getPresignedUrl = async (
  data: PresignRequest,
  feature: Feature
): Promise<PresignResponse> => {
  const res = await authApiClient.post(`/images/${feature}s/upload-url`, data);
  return res.data.result;
};

export const uploadFileToS3 = async (presignedUrl: string, file: File) => {
  console.log('Presigned URL로 파일 업로드 시작...');
  await authApiClient.put(presignedUrl, file, {
    headers: { 'Content-Type': file.type },
  });
  console.log('파일 업로드 성공!');
};
