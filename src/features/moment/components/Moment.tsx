import React, { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import CommentList from '../../../components/comment/CommentList';
import NewComment from '../../../components/comment/NewComment';
import ErrorDisplay from '../../../components/ui/ErrorDisplay';
import { MomentComment } from '../../../types/moment';
import { useMomentInfo } from '../api/queries';
import MomentDetail from './MomentDetail';

const Moment: React.FC = () => {
  const momentId = +(useParams().momentId as string);
  const [showModal, setShowModal] = useState(false);
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });
  const imageRef = useRef<HTMLImageElement>(null);

  const { data: momentInfo, isLoading, error } = useMomentInfo(momentId);

  if (isLoading) return <p>loading...</p>;
  if (error) return <p>{error.message}</p>;

  if (!momentInfo) {
    return <ErrorDisplay message='Failed to load Moment info' />;
  }

  const momentImage = momentInfo?.momentMetadata?.momentImageUrl;
  // const comments = momentInfo?.comments;

  const openImageModal = () => {
    if (!imageRef.current) return;
    const img = imageRef.current;
    const { naturalWidth, naturalHeight } = img;
    const maxWidth = window.innerWidth * 0.9;
    const maxHeight = window.innerHeight * 0.9;

    let width = naturalWidth;
    let height = naturalHeight;

    if (width > maxWidth || height > maxHeight) {
      const scale = Math.min(maxWidth / width, maxHeight / height);
      width = Math.round(width * scale);
      height = Math.round(height * scale);
    }

    setImageDimensions({ width, height });
    setShowModal(true);
  };

  const closeImageModal = () => setShowModal(false);

  return (
    <div className='w-full flex justify-center text-sm'>
      <div className='w-[80%] flex'>
        <div className='w-[60%] cursor-pointer' onClick={openImageModal}>
          <img
            ref={imageRef}
            src={momentImage}
            alt='moment-image'
            className='w-full object-cover aspect-[1] rounded-md shadow'
          />
        </div>
        <aside className='w-[40%] min-w-52 ml-4 flex flex-col justify-between'>
          <div>
            <MomentDetail momentInfo={momentInfo} />
            <CommentList comments={comments as MomentComment[]} />
          </div>
          <NewComment />
        </aside>
      </div>

      {showModal && (
        <div
          className='fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50'
          onClick={closeImageModal}
        >
          <div
            style={{
              width: imageDimensions.width,
              height: imageDimensions.height,
            }}
            className='flex items-center justify-center'
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={momentImage}
              alt='original-moment-image'
              className='object-contain w-full h-full'
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Moment;
