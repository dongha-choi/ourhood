import React from 'react';
import { MomentComment } from '../../types/moment';
import getTimeNotation from '../../utils/getTimeNotation';

export interface CommentProps {
  comment: MomentComment;
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
  const { commentId, nickname, commentContent, createdAt } = comment;
  return (
    <li key={commentId} className='flex flex-col'>
      <div>
        <span className='mr-2 font-bold'>{nickname}</span>
        <span>{commentContent}</span>
      </div>
      <p className='text-gray text-xs font-light'>
        {getTimeNotation(createdAt)}
      </p>
    </li>
  );
};

export default Comment;
