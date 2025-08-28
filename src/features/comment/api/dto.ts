import { CommentInfo } from '../types';

export interface CreateCommentRequest {
  momentId: number;
  commentContent: string;
  parentId?: number;
}
export interface EditCommentRequest {
  commentContent: string;
}
export interface CommentListReponse {
  comments: CommentInfo[];
}
