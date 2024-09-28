import React, { ChangeEvent, FormEvent, useState } from 'react';
import FormInput from '../ui/FormInput';
import { FiSend } from 'react-icons/fi';
import { addComment } from '../../api/commentApi';
import useAuthStore from '../../stores/useAuthStore';
import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const NewComment: React.FC = () => {
  const queryClient = useQueryClient();
  const userId = useAuthStore((state) => state.user.id) as number;
  const momentId = +(useParams().momentId as string);
  const [commentContent, setCommentContent] = useState<string>('');
  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setCommentContent(e.target.value);
  const momentMutation = useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['momentInfo', momentId] });
    },
  });
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const data = {
      userId,
      momentId,
      commentContent,
    };
    momentMutation.mutateAsync(data);
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
