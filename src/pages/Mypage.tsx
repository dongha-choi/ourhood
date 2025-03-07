import React from 'react';
import { useQuery } from '@tanstack/react-query';

import { fetchMypageInfo } from '../api/mypageApi';
import RoomCard from '../components/room/RoomCard';
import useAuthStore from '../stores/useAuthStore';
import { MypageInfo } from '../types/mypage';
import { RoomCardInfo } from '../types/room';
import ReceivedInvitationItem from '../components/member-request/ReceivedInvitationItem';
import SentJoinRequestItem from '../components/member-request/SentJoinRequestItem';
import ErrorDisplay from '../components/ui/ErrorDisplay';
import ProfileSkeleton from '../components/mypage/ProfileSkeleton';
import { useNavigate } from 'react-router-dom';

const Mypage: React.FC = () => {
  const navigate = useNavigate();
  const userId = useAuthStore((state) => state.user.id) as number;
  const { name, email } = useAuthStore((state) => state.user);
  const { data, isLoading, error } = useQuery<MypageInfo>({
    queryKey: ['mypage', userId],
    queryFn: () => fetchMypageInfo(userId),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: true,
  });

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  if (error || !data) {
    return (
      <ErrorDisplay message={error?.message || 'Failed to load profile data'} />
    );
  }

  const { myRooms, receivedInvitations, sentJoinRequests } = data;

  // For displaying user info (assuming it comes from auth store)

  return (
    <section className='w-full py-8 flex flex-col md:flex-row gap-8 px-4 md:px-8'>
      <aside className='w-full md:w-72 self-start p-6 flex flex-col rounded-lg shadow-md bg-white'>
        <div className='flex flex-col items-center'>
          <img
            src='/mocks/images/whity.jpg'
            alt='profile'
            className='w-24 h-24 md:w-32 md:h-32 rounded-full object-cover'
          />
          <div className='mt-4 py-2 text-center'>
            <p className='text-2xl md:text-3xl font-semibold'>{name}</p>
            <p className='text-sm font-light text-gray-600'>{email}</p>
          </div>
        </div>

        {receivedInvitations.length > 0 && (
          <div className='mt-6 py-4 border-t border-gray-200'>
            <p className='text-xl font-semibold mb-3'>Invitations</p>
            <ul className='mt-1 flex flex-col gap-3'>
              {receivedInvitations.map((invitation) => (
                <ReceivedInvitationItem
                  key={invitation.invitationId}
                  invitation={invitation}
                  userId={userId}
                />
              ))}
            </ul>
          </div>
        )}

        {sentJoinRequests.length > 0 && (
          <div className='mt-4 py-4 border-t border-gray-200'>
            <p className='text-xl font-semibold mb-3'>Pending Requests</p>
            <ul className='mt-1 flex flex-col gap-3'>
              {sentJoinRequests.map((request) => (
                <SentJoinRequestItem
                  key={request.joinRequestId}
                  request={request}
                  userId={userId}
                />
              ))}
            </ul>
          </div>
        )}
      </aside>

      <div className='flex-1'>
        <h2 className='text-2xl font-bold mb-6'>My Rooms</h2>
        {myRooms.length > 0 ? (
          <ul className='w-full gap-x-4 gap-y-8 place-items-center grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
            {myRooms.map((roomCardInfo: RoomCardInfo) => (
              <RoomCard
                key={roomCardInfo.roomMetadata.roomId}
                roomCardInfo={roomCardInfo}
              />
            ))}
          </ul>
        ) : (
          <div className='flex flex-col items-center justify-center p-10 bg-gray-50 rounded-lg'>
            <p className='text-lg text-gray-600'>
              You haven't joined any rooms yet.
            </p>
            <button
              className='mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
              onClick={() => navigate('/rooms')}
            >
              Discover Rooms
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Mypage;
