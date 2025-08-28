import React from 'react';

import ErrorDisplay from '../../../components/ui/ErrorDisplay';
import { useComments } from '../api/queries';
import Comment from './Comment';

interface CommentListProps {
  momentId: number;
}

const CommentList: React.FC<CommentListProps> = ({ momentId }) => {
  const { data: comments, isLoading, error } = useComments(momentId);

  if (isLoading) return <p>loading...</p>;
  if (error) return <p>{error.message}</p>;

  if (!comments) {
    return <ErrorDisplay message='Failed to load comments' />;
  }
  return (
    <ul className='pl-1 py-3 flex flex-col gap-1'>
      {comments.map((comment) => (
        <Comment key={comment.commentId} comment={comment} />
      ))}
    </ul>
  );
};

export default CommentList;
