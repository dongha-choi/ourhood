import React from 'react';
import { MomentComment } from '../../types/moment';
import Comment from './Comment';

export interface CommentListProps {
  comments: MomentComment[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  return (
    <ul className='pt-3 pb-1 flex flex-col gap-2'>
      {comments.map((comment) => (
        <Comment key={comment.commentId} comment={comment} />
      ))}
    </ul>
  );
};

export default CommentList;
