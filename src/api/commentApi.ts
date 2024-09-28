import { AddCommentRequest } from '../types/apis/comment';
import authApiClient from './clients/authApiClient';

export const addComment = async (data: AddCommentRequest) => {
  await authApiClient.post('/comments', data);
};
