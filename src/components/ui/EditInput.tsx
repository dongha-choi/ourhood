import React, { ChangeEvent, FormEvent, useState } from 'react';
import FormInput from './FormInput';
import useMomentMutation from '../../hooks/useMomentMutation';

interface EditInputProps {
  type: 'moment' | 'comment';
  momentId: number;
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

  const { editCommentMutation } = useMomentMutation(momentId);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (originalContent === editContent) {
      setIsEditMode(false);
      return;
    }
    if (type === 'moment') {
      return;
    } else if (type === 'comment') {
      editCommentMutation.mutateAsync({
        commentId: commentId as number,
        commentContent: editContent,
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
