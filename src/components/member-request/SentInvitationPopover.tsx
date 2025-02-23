import React from 'react';
import {
  JoinRequestItem,
  SentInvitation,
} from '../../types/memberRequest';
import useAuthStore from '../../stores/useAuthStore';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { fetchRoomRequests } from '../../api/memberRequestApi';
import RoomRequestItem from './RoomRequestItem';

const SentInvitationPopover: React.FC = () => {
  const userId = useAuthStore().user.id;
  const roomId = +(useParams().roomId as string);
  const {
    data: sentInvitationList,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['sentInvitation', roomId, userId],
    queryFn: () => fetchRoomRequests('invitation', roomId),
  });

  if (isLoading) {
    return <div></div>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  return (
    <div className='absolute z-10 top-10 -right-12 m-0 p-4 rounded-xl font-semibold text-sm bg-white light-shadow'>
      {sentInvitationList && sentInvitationList.length > 0 ? (
        <div>
          <p className='pb-2 border-b border-darkWhite text-brand whitespace-nowrap'>
            {'New join requests'}
          </p>
          <ul className='pt-3 flex flex-col gap-3'>
            {sentInvitationList.map(
              (sentInvitation as SentInvitation) => (
                  <RoomRequestItem
                    key={item.in}
                    requestType={requestType}
                    requestItem={requestItem}
                  />
                );

            )}
          </ul>
        </div>
      ) : (
        <div className='whitespace-nowrap text-lightGray'>There are no .</div>
      )}
    </div>
  );
};

export default SentInvitationPopover;
