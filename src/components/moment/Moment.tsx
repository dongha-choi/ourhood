import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMomentInfo } from '../../api/momentApi';
import CommentList from '../comment/CommentList';
import { MomentComment } from '../../types/moment';
import NewComment from '../comment/NewComment';
import { MdEdit } from 'react-icons/md';
import useAuthStore from '../../stores/useAuthStore';
import EditInput from '../ui/EditInput';

const Moment: React.FC = () => {
  const userId = useAuthStore((state) => state.user.id);
  const momentId = +(useParams().momentId as string);
  const {
    data: momentInfo,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['momentInfo', momentId],
    queryFn: () => fetchMomentInfo(momentId),
  });

  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  if (isLoading) {
    return <p>loading...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }

  const { momentMetadata, momentDetail, comments } = momentInfo ?? {};
  const {
    momentImage,
    userId: publisherId,
    nickname,
    createdAt,
  } = momentMetadata ?? {};
  const { momentDescription } = momentDetail ?? {};
  const date = createdAt?.substring(0, 10).replace(/-/g, '.');

  return (
    <div className='w-full flex text-sm'>
      <div className='w-3/5'>
        <img
          src={momentImage}
          alt='moment-image'
          className='w-full h-auto object-contain rounded-md shadow'
        />
      </div>
      <aside className='w-2/5 ml-4 flex flex-col justify-between'>
        <div>
          <div className='pb-3 border-b border-darkWhite '>
            {userId === publisherId &&
              (isEditMode ? (
                <EditInput
                  type='moment'
                  contentId={momentId as number}
                  originalContent={momentDescription as string}
                  setIsEditMode={setIsEditMode}
                />
              ) : (
                <div className='h-8 flex justify-between text-base/7'>
                  {momentDescription ? (
                    <p className='h-8'>{momentDescription}</p>
                  ) : (
                    <p className='pt-0.5 text-gray text-sm'>No description.</p>
                  )}
                  <button onClick={() => setIsEditMode((prev) => !prev)}>
                    <MdEdit className='mb-1 hover:cursor-pointer' />
                  </button>
                </div>
              ))}
            <div className='text-gray text-xs flex justify-between'>
              <span>{date}</span>
              <div>
                <span className='mr-1'>posted by</span>
                <span className='font-semibold text-darkGray'>{nickname}</span>
              </div>
            </div>
          </div>
          <CommentList comments={comments as MomentComment[]} />
        </div>
        <NewComment />
      </aside>
    </div>
  );
};

export default Moment;
