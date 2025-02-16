import { AddCommentRequest } from '../types/apis/comment';
import authApiClient from './clients/authApiClient';

export const addComment = async (data: AddCommentRequest) => {
  await authApiClient.post('/comments', data);
};

export const editComment = async (
  commentId: number,
  commentContent: string
) => {
  await authApiClient.put(`comments/${commentId}`, {
    commentContent,
  });
};

export const deleteComment = async (commentId: number) => {
  await authApiClient.delete(`comments/${commentId}`);
};
