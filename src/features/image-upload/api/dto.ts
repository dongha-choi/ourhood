import { ImageFileExtension } from '../types';

export interface PresignRequest {
  imageFileExtension: ImageFileExtension;
}

export interface PresignResponse {
  imageKey: string;
  presignedUrl: string;
}
