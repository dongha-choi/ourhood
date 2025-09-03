import React from 'react';

import { useQuery } from '@tanstack/react-query';

import { fetchMypageInfo } from '../apis/mypageApi';
import MyInfo from '../components/mypage/MyInfo';
import MyRooms from '../components/mypage/MyRooms';
import ErrorDisplay from '../components/ui/ErrorDisplay';
import { useAuthUserId } from '../features/auth/store/useAuthStore';
import ReceivedInvitationList from '../features/invitation/components/ReceivedInvitationList';
import SentJoinRequestList from '../features/join-request/components/SentJoinRequestList';
import { MypageInfo } from '../types/mypage';

const Mypage: React.FC = () => {
  const userId = useAuthUserId() as number;
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

  return (
    <section className='w-full py-8 flex flex-col md:flex-row gap-8'>
      <aside className='w-full md:w-72 self-start p-6 flex flex-col gap-4 rounded-lg bg-white'>
        <MyInfo />
        <div className='h-[1px] bg-lightGray rounded-full'></div>

        <div id='my-requests' className='flex flex-col gap-8'>
          <ReceivedInvitationList receivedInvitations={receivedInvitations} />
          <SentJoinRequestList sentJoinRequests={sentJoinRequests} />
        </div>
      </aside>
      <MyRooms myRooms={myRooms} />
    </section>
  );
};

export default Mypage;
