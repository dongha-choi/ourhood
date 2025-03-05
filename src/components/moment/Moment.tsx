import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchMomentInfo } from '../../api/momentApi';
import CommentList from '../comment/CommentList';
import { MomentComment } from '../../types/moment';
import NewComment from '../comment/NewComment';
import { MdDelete, MdEdit } from 'react-icons/md';
import useAuthStore from '../../stores/useAuthStore';
import EditInput from '../ui/EditInput';
import useRoomMutation from '../../hooks/useRoomMutation';
import useRoomStore from '../../stores/useRoomStore';

const Moment: React.FC = () => {
  const userId = useAuthStore((state) => state.user.id);
  const roomId = useRoomStore(
    (state) => state.roomInfo?.roomMetadata.roomId
  ) as number;
  const momentId = +(useParams().momentId as string);
  const navigate = useNavigate();
  const {
    data: momentInfo,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['momentInfo', momentId],
    queryFn: () => fetchMomentInfo(momentId),
  });
  const { deleteMomentMutation } = useRoomMutation(roomId);

  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this moment?')) {
      deleteMomentMutation.mutateAsync({ momentId });
      navigate(`/rooms/${roomId}`);
    } else {
      return;
    }
  };
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
      <div className='w-[70%]'>
        <img
          src={momentImage}
          alt='moment-image'
          className='w-full h-auto object-contain rounded-md shadow'
        />
      </div>
      <aside className='w-[30%] ml-4 flex flex-col justify-between'>
        <div>
          <div className='pb-3 border-b border-darkWhite '>
            {userId === publisherId &&
              (isEditMode ? (
                <EditInput
                  type='moment'
                  momentId={momentId as number}
                  originalContent={momentDescription as string}
                  setIsEditMode={setIsEditMode}
                />
              ) : (
                <div className='h-8 flex justify-between items-center text-base/7'>
                  {momentDescription ? (
                    <p className='h-8'>{momentDescription}</p>
                  ) : (
                    <p className='text-gray text-sm'>No description.</p>
                  )}
                  <div className='flex gap-1'>
                    <button onClick={() => setIsEditMode((prev) => !prev)}>
                      <MdEdit className='hover:cursor-pointer' />
                    </button>
                    <button onClick={handleDelete}>
                      <MdDelete className='hover:cursor-pointer' />
                    </button>
                  </div>
                </div>
              ))}
            <div className='text-gray text-xs flex justify-between gap-4'>
              <span>{date}</span>
              <div className='text-right'>
                <span className='mr-1'>posted by</span>
                <span className='font-semibold'>{nickname}</span>
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
