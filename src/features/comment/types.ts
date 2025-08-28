export interface CommentInfo {
  parentId: number | null; // 대댓글이 아니면 null
  commentId: number;
  commentContent: string;
  userId: number; // comment 등록한 사용자 id
  nickname: string; // comment 등록한 사용자 nickname
  createdAt: string;
  replyComments: CommentInfo[] | [];
}
