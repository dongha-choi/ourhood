import React, { ChangeEvent, useState } from 'react';
import FormInput from '../ui/FormInput';
import { FiSend } from 'react-icons/fi';
import { addComment } from '../../api/commentApi';
import useAuthStore from '../../stores/useAuthStore';
import { useParams } from 'react-router-dom';

const NewComment: React.FC = () => {
  const userId = useAuthStore((state) => state.user.id) as number;
  const momentId = +(useParams().momentId as string);
  const [commentContent, setCommentContent] = useState<string>('');
  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setCommentContent(e.target.value);
  const handleSubmit = () => {
    const data = {
      userId,
      momentId,
      commentContent,
    };
    addComment(data);
  };
  return (
    <form className='flex items-center gap-1' onSubmit={handleSubmit}>
      <FormInput
        type='text'
        id='new-comment'
        name='comment'
        value={commentContent}
        placeholder='Add a comment...'
        onChange={onChange}
      ></FormInput>
      <button className='flex items-center'>
        <FiSend className='text-2xl' />
      </button>
    </form>
  );
};

export default NewComment;
