import { CommentInfo } from '../types';

/** 댓글의 경로 정보를 담는 타입 */
interface CommentPath {
  parentIndex: number;
  replyIndex?: number; // 대댓글일 경우에만 존재
}

/**
 * 중첩된 댓글 배열에서 특정 commentId를 가진 댓글의 경로를 찾습니다.
 * @param comments 댓글 전체 배열
 * @param commentId 찾고자 하는 댓글의 ID
 * @returns CommentPath 객체, 찾지 못하면 null
 */
const findCommentPath = (
  comments: CommentInfo[],
  commentId: number
): CommentPath | null => {
  for (let i = 0; i < comments.length; i++) {
    // 1. 부모 댓글에서 찾기
    if (comments[i].commentId === commentId) {
      return { parentIndex: i };
    }

    // 2. 대댓글에서 찾기
    if (comments[i].replyComments?.length) {
      const replyIndex = comments[i].replyComments.findIndex(
        (reply) => reply.commentId === commentId
      );
      if (replyIndex !== -1) {
        return { parentIndex: i, replyIndex: replyIndex };
      }
    }
  }
  return null; // 어디에서도 찾지 못함
};

export default findCommentPath;
