import React, { useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';

import useRoomMutation from '../../hooks/useRoomMutation';
import useAuthStore from '../../stores/useAuthStore';
import useRoomStore from '../../stores/useRoomStore';
import { MomentInfo } from '../../types/moment';
import EditInput from '../ui/EditInput';

interface MomentDetailProps {
  momentInfo: MomentInfo;
}

const MomentDetail: React.FC<MomentDetailProps> = ({ momentInfo }) => {
  const navigate = useNavigate();
  const momentId = +(useParams().momentId as string);
  const userId = useAuthStore((state) => state.user.id);
  const roomId = useRoomStore(
    (state) => state.roomInfo?.roomMetadata.roomId
  ) as number;
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const { momentMetadata, momentDetail } = momentInfo ?? {};
  const { userId: publisherId, nickname, createdAt } = momentMetadata ?? {};
  const { momentDescription } = momentDetail ?? {};
  const { deleteMomentMutation } = useRoomMutation(roomId);

  const date = createdAt?.substring(0, 10).replace(/-/g, '.');

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this moment?')) {
      deleteMomentMutation.mutateAsync({ momentId });
      navigate(`/rooms/${roomId}`);
    } else {
      return;
    }
  };
  return (
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
  );
};

export default MomentDetail;
