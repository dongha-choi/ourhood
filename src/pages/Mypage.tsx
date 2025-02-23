import React from 'react';
import useAuthStore from '../stores/useAuthStore';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchMypageInfo } from '../api/mypageApi';
import { RoomCardInfo } from '../types/room';
import RoomCard from '../components/room/RoomCard';
import { MypageInfo } from '../types/mypage';
import { processInvitation } from '../api/invitationApi';
import { RequestAction } from '../types/memberRequest';

const Mypage: React.FC = () => {
  const queryClient = useQueryClient();
  const userId = useAuthStore((state) => state.user.id) as number;
  const { data, isLoading, error } = useQuery<MypageInfo>({
    queryKey: ['mypage', userId],
    queryFn: () => fetchMypageInfo(userId),
  });
  const handleProcess = async (invitationId: number, action: RequestAction) => {
    await processInvitation(invitationId, action);
    queryClient.invalidateQueries({ queryKey: ['mypage', userId] });
  };

  if (isLoading) {
    return <p></p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  console.log(data);
  const {
    myInfo: { nickname, email },
    rooms,
    invitations,
  } = data as MypageInfo;
  return (
    <section className='w-full py-8 flex gap-8'>
      <aside className='w-72 self-start p-8 flex flex-col rounded-lg shadow-md'>
        <img
          src='/mocks/images/whity.jpg'
          alt='profile'
          className='rounded-full'
        />
        <div className='mt-2 py-4'>
          <p className='text-3xl font-semibold'>{nickname}</p>
          <p className='text-sm font-light'>{email}</p>
        </div>
        {invitations && invitations.length > 0 && (
          <div className='py-4 border-t border-darkWhite'>
            <p className='text-xl font-semibold'>Invitations</p>
            <ul className='mt-1 flex flex-col gap-2'>
              {invitations.map((invitation) => (
                <InvitationItem
                  key={invitation.invitationId}
                  invitationInfo={invitation}
                  handleProcess={handleProcess}
                />
              ))}
            </ul>
          </div>
        )}
      </aside>
      <div className='flex-1'>
        <h2 className='text-xl'>My Rooms</h2>
        {rooms && (
          <ul className='w-full gap-x-4 gap-y-8 place-items-center grid grid-cols-1 ml:grid-cols-2 xl:grid-cols-3'>
            {rooms.map((roomCardInfo: RoomCardInfo) => (
              <RoomCard key={roomCardInfo.roomId} roomCardInfo={roomCardInfo} />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default Mypage;
