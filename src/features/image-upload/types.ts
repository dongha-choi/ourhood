export const ALLOWED_EXTENSIONS = ['JPEG', 'PNG', 'WEBP'] as const;
export type ImageFileExtension = (typeof ALLOWED_EXTENSIONS)[number];

export type Feature = 'room' | 'moment';

export type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';
