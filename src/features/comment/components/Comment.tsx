import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import EditInput from '../../../components/ui/EditInput';
import useAuthStore from '../../../stores/useAuthStore';
import { getRelativeTime } from '../../../utils/dateConverter';
import { useDeleteComment } from '../api/mutations';
import { CommentInfo } from '../types';

export interface CommentProps {
  comment: CommentInfo;
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
  const userId = useAuthStore((state) => state.user.id);
  const momentId = +(useParams().momentId as string);
  const deleteCommentMutation = useDeleteComment(momentId);

  const {
    commentId,
    nickname,
    commentContent,
    createdAt,
    userId: commentorId,
  } = comment;
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this comment?')) {
      deleteCommentMutation.mutateAsync({ commentId });
    } else {
      return;
    }
  };
  return (
    <li key={commentId} className='flex flex-col'>
      <div className='h-8 flex items-center'>
        <span className='mr-2 font-bold'>{nickname}</span>
        {isEditMode ? (
          <EditInput
            type='comment'
            momentId={momentId}
            commentId={commentId}
            originalContent={commentContent}
            setIsEditMode={setIsEditMode}
          />
        ) : (
          <span>{commentContent}</span>
        )}
      </div>
      <div className='flex gap-2 text-2xs'>
        <p className='text-gray font-light'>{getRelativeTime(createdAt)}</p>
        {userId === commentorId && (
          <>
            <button
              className='font-medium text-gray'
              onClick={() => setIsEditMode(true)}
            >
              Edit
            </button>
            <button className='font-medium text-gray' onClick={handleDelete}>
              Delete
            </button>
          </>
        )}
      </div>
    </li>
  );
};

export default Comment;
