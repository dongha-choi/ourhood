import React, { ChangeEvent, FormEvent, useState } from 'react';
import { FiSend } from 'react-icons/fi';
import { useParams } from 'react-router-dom';

import FormInput from '../../../components/ui/FormInput';
import { useCreateComment } from '../api/mutations';

const NewComment: React.FC = () => {
  const momentId = +(useParams().momentId as string);
  const [commentContent, setCommentContent] = useState<string>('');
  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setCommentContent(e.target.value);
  const createCommentMutation = useCreateComment(momentId);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const data = {
      momentId,
      commentContent,
    };
    createCommentMutation.mutateAsync(data);
    setCommentContent('');
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
      />
      <button className='flex items-center'>
        <FiSend className='text-lg' />
      </button>
    </form>
  );
};

export default NewComment;
