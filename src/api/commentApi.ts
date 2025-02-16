import { AddCommentRequest, EditCommentRequest } from '../types/apis/comment';
import authApiClient from './clients/authApiClient';

export const addComment = async (data: AddCommentRequest) => {
  await authApiClient.post('/comments', data);
};

export const editComment = async ({
  commentId,
  commentContent,
}: EditCommentRequest) => {
  await authApiClient.put(`comments/${commentId}`, {
    commentContent: commentContent,
  });
};

export const deleteComment = async ({ commentId }: EditCommentRequest) => {
  await authApiClient.delete(`comments/${commentId}`);
};
