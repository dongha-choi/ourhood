import React from 'react';
import { MomentComment } from '../../types/moment';
import Comment from './Comment';

export interface CommentListProps {
  comments: MomentComment[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  return (
    <ul className='pl-1 py-3 flex flex-col gap-1'>
      {comments.map((comment) => (
        <Comment key={comment.commentId} comment={comment} />
      ))}
    </ul>
  );
};

export default CommentList;
