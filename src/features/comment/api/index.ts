import authApiClient from '../../../apis/clients/authApiClient';
import { CommentInfo } from '../types';
import { CreateCommentRequest, EditCommentRequest } from './dto';

export const createComment = async (
  data: CreateCommentRequest
): Promise<CommentInfo> => {
  const res = await authApiClient.post('/comments', data);
  return res.data.result;
};

export const fetchCommentList = async (
  momentId: number
): Promise<CommentInfo[]> => {
  const res = await authApiClient.get(`/moments/${momentId}/comments`);
  return res.data.result.comments;
};

export const editComment = async (
  commentId: number,
  data: EditCommentRequest
): Promise<void> => {
  await authApiClient.put(`/comments/${commentId}`, data);
};

export const deleteComment = async (commentId: number): Promise<void> => {
  await authApiClient.delete(`/comments/${commentId}`);
};
