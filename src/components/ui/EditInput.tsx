import React, { ChangeEvent, FormEvent, useState } from 'react';
import FormInput from './FormInput';
import { useQueryClient } from '@tanstack/react-query';
import { editMoment } from '../../api/momentApi';
import { editComment } from '../../api/commentApi';

interface EditInputProps {
  type: 'moment' | 'comment';
  momentId?: number;
  commentId?: number;
  originalContent: string;
  setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditInput: React.FC<EditInputProps> = ({
  type,
  momentId,
  commentId,
  originalContent,
  setIsEditMode,
}) => {
  const [editContent, setEditContent] = useState<string>(originalContent);

  const queryClient = useQueryClient();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (type === 'moment') {
      await editMoment(momentId as number, editContent);
      await queryClient.invalidateQueries({
        queryKey: ['momentInfo', momentId],
      });
    } else if (type === 'comment') {
      await editComment(commentId as number, editContent);
      await queryClient.invalidateQueries({
        queryKey: ['momentInfo', momentId],
      });
    }
    setEditContent('');
    setIsEditMode(false);
  };
  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setEditContent(e.target.value);
  return (
    <form
      className='h-8 w-full inline-flex justify-between items-center gap-2'
      onSubmit={handleSubmit}
    >
      <FormInput
        type='text'
        id='edit-content'
        name='edit-content'
        value={editContent}
        onChange={onChange}
      />
      <div className='flex gap-3 justify-between items-center'>
        <button onClick={handleSubmit}>Save</button>
        <button onClick={() => setIsEditMode(false)}>Cancel</button>
      </div>
    </form>
  );
};

export default EditInput;
