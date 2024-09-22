import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';
import { fetchMomentInfo } from '../api/momentApi';

const Moment: React.FC = () => {
  const momentId = Number(useParams().momentId as string);
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
  return (
    <>
      <p>Moment: {momentInfo?.momentDescription}</p>
      <img src={momentInfo?.momentImage} alt='' />
    </>
  );
};

export default Moment;
