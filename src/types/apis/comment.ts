export interface AddCommentRequest {
  momentId: number;
  userId: number;
  commentContent: string;
}

export interface EditCommentRequest {
  commentId: number;
  commentContent?: string;
}
