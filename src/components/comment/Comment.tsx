import React, { useState } from 'react';
import { MomentComment } from '../../types/moment';
import { getRelativeTime } from '../../utils/dateConverter';
import useAuthStore from '../../stores/useAuthStore';
import { useParams } from 'react-router-dom';
import EditInput from '../ui/EditInput';
import useMomentMutation from '../../hooks/useMomentMutation';

export interface CommentProps {
  comment: MomentComment;
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
  const userId = useAuthStore((state) => state.user.id);
  const momentId = +(useParams().momentId as string);
  const { deleteCommentMutation } = useMomentMutation(momentId);

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
