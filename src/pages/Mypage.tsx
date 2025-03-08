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
import { useNavigate } from 'react-router-dom';
import { ImageOff } from 'lucide-react';

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
    return <></>;
  }

  if (error || !data) {
    return (
      <ErrorDisplay message={error?.message || 'Failed to load profile data'} />
    );
  }

  const { myRooms, receivedInvitations, sentJoinRequests } = data;

  // For displaying user info (assuming it comes from auth store)

  return (
    <section className='w-full py-8 flex flex-col md:flex-row gap-8'>
      <aside className='w-full md:w-72 self-start p-6 flex flex-col gap-4 rounded-lg bg-white'>
        <div className='flex flex-col gap-4'>
          <img
            src='/mocks/images/whity.jpg'
            alt='profile'
            className='w-full h-auto rounded-full object-cover'
          />
          <div>
            <p className='text-lg font-light'>{name}</p>
            <p className='text-lg font-light'>{email}</p>
          </div>
        </div>
        <div className='h-[1px] bg-lightGray rounded-full'></div>

        <div id='my-requests' className='flex flex-col gap-8'>
          <div>
            <p className='w-full text-xl font-semibold'>Invitations</p>
            {receivedInvitations.length > 0 ? (
              <ul className='mt-1 flex flex-col gap-3'>
                {receivedInvitations.map((invitation) => (
                  <ReceivedInvitationItem
                    key={invitation.invitationId}
                    invitation={invitation}
                  />
                ))}
              </ul>
            ) : (
              <div className='text-midGray text-sm font-light'>
                No invitations.
              </div>
            )}
          </div>

          <div>
            <p className='w-full text-xl font-semibold'>Sent Join Requests</p>
            {sentJoinRequests.length > 0 ? (
              <ul className='mt-1 flex flex-col gap-3'>
                {sentJoinRequests.map((joinRequest) => (
                  <SentJoinRequestItem
                    key={joinRequest.joinRequestId}
                    joinRequest={joinRequest}
                  />
                ))}
              </ul>
            ) : (
              <div className=' text-midGray text-sm font-light'>
                You haven't sent any requests.
              </div>
            )}
          </div>
        </div>
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
          <div className='py-32 flex flex-col gap-2 items-center justify-center p-10 bg-gray-50 rounded-lg'>
            <ImageOff color='gray' />
            <p className='text-sm font-normal text-gray'>
              You haven't joined any rooms yet.
            </p>
            <button
              className='mt-4 px-6 py-2 bg-brand text-white rounded-lg hover:bg-blue-700 transition-colors'
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
