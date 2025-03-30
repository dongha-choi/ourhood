import React from 'react';
import { useParams } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';

import { fetchMomentInfo } from '../../api/momentApi';
import { MomentComment, MomentInfo } from '../../types/moment';
import CommentList from '../comment/CommentList';
import NewComment from '../comment/NewComment';
import MomentDetail from './MomentDetail';

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

  const momentImage = momentInfo?.momentMetadata?.momentImage;
  const comments = momentInfo?.comments;

  return (
    <div className='w-full flex text-sm'>
      <div className='w-[70%]'>
        <img
          src={momentImage}
          alt='moment-image'
          className='w-auto h-auto max-h-screen object-contain rounded-md shadow'
        />
      </div>
      <aside className='w-[30%] ml-4 flex flex-col justify-between'>
        <div>
          <MomentDetail momentInfo={momentInfo as MomentInfo} />
          <CommentList comments={comments as MomentComment[]} />
        </div>
        <NewComment />
      </aside>
    </div>
  );
};

export default Moment;
