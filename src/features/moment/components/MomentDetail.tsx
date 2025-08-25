import React, { useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';

import EditInput from '../../../components/ui/EditInput';
import useAuthStore from '../../../stores/useAuthStore';
import { useRoomId } from '../../room/view/store/useRoomInfoStore';
import { useDeleteMoment } from '../api/mutations';
import { MomentInfo } from '../types';

interface MomentDetailProps {
  momentInfo: MomentInfo;
}

const MomentDetail: React.FC<MomentDetailProps> = ({ momentInfo }) => {
  const navigate = useNavigate();
  const momentId = +(useParams().momentId as string);
  const userId = useAuthStore((state) => state.user.id);
  const roomId = useRoomId() as number;
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const { momentMetadata, momentDetail } = momentInfo ?? {};
  const { userId: publisherId, nickname, createdAt } = momentMetadata ?? {};
  const { momentDescription } = momentDetail ?? {};
  const deleteMomentMutation = useDeleteMoment(roomId, momentId);

  const date = createdAt?.substring(0, 10).replace(/-/g, '.');

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this moment?')) {
      deleteMomentMutation.mutateAsync();
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
              <p className='text-sm'>{momentDescription}</p>
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
