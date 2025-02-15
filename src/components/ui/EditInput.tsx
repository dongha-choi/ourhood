import React, { ChangeEvent, FormEvent, useState } from 'react';
import FormInput from './FormInput';
import { useQueryClient } from '@tanstack/react-query';
import { editMoment } from '../../api/momentApi';

interface EditInputProps {
  type: 'moment' | 'comment';
  contentId: number;
  originalContent: string;
  setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditInput: React.FC<EditInputProps> = ({
  type,
  contentId,
  originalContent,
  setIsEditMode,
}) => {
  const [editContent, setEditContent] = useState<string>(originalContent);

  const queryClient = useQueryClient();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (type === 'moment') {
      await editMoment(contentId, editContent);
      await queryClient.invalidateQueries({
        queryKey: ['momentInfo', contentId],
      });
    } else if (type === 'comment') {
      () => {};
    }
    setEditContent('');
    setIsEditMode(false);
  };
  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setEditContent(e.target.value);
  return (
    <form className='h-8 flex items-center gap-1' onSubmit={handleSubmit}>
      <FormInput
        type='text'
        id='edit-content'
        name='edit-content'
        value={editContent}
        onChange={onChange}
      />
      <div className='flex gap-2 justify-between items-center'>
        <button onClick={handleSubmit}>Save</button>
        <button onClick={() => setIsEditMode(false)}>Cancel</button>
      </div>
    </form>
  );
};

export default EditInput;
