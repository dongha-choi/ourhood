import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';
import { fetchMomentInfo } from '../../api/momentApi';
import CommentList from '../comment/CommentList';
import { MomentComment } from '../../types/moment';
import NewComment from '../comment/NewComment';

const Moment: React.FC = () => {
  const momentId = +(useParams().momentId as string);
  const {
    data: momentInfo,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['momentInfo', momentId],
    queryFn: () => fetchMomentInfo(momentId),
  });

  if (isLoading) {
    return <p>loading...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }

  const { nickname, momentImage, momentDescription, createdAt, comments } =
    momentInfo ?? {};

  return (
    <div className='w-full flex text-sm'>
      <img
        src={momentImage}
        alt='moment-image'
        className='w-3/5 rounded-md shadow'
      />
      <aside className='w-2/5 ml-4 flex flex-col justify-between'>
        <div>
          <div className='pb-3 border-b border-darkWhite '>
            <p className='text-lg'>{momentDescription}</p>
            <div className='text-gray text-xs flex justify-between'>
              <span>{createdAt}</span>
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

{
  /* <div className='w-full flex text-sm'>
<img src={momentImage} alt='moment-image' className='w-3/5 rounded-md' />
<aside className='w-2/5 px-4 flex flex-col justify-between'>
  <div>
    <div className='pb-3 border-b border-darkWhite'>
      <p className='text-lg'>{momentDescription}</p>
      <div className='text-gray text-xs'>
        <p>{createdAt}</p>
        <span className='mr-1'>posted by</span>
        <span className='font-semibold text-darkGray'>{nickname}</span>
      </div>
    </div>
    <CommentList comments={comments as MomentComment[]} />
  </div>
  <NewComment />
</aside>
</div> */
}
