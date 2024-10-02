import React from 'react';
import useAuthStore from '../stores/useAuthStore';
import { useQuery } from '@tanstack/react-query';
import { fetchMypageInfo } from '../api/mypageApi';
import { RoomCardInfo } from '../types/room';
import RoomCard from '../components/room/RoomCard';
import { MypageInfo } from '../types/mypage';
import ReqeustItem from '../components/member/ReqeustItem';
import { IoClose } from 'react-icons/io5';

const Mypage: React.FC = () => {
  const userId = useAuthStore((state) => state.user.id) as number;
  const { data, isLoading, error } = useQuery<MypageInfo>({
    queryKey: ['mypage', userId],
    queryFn: () => fetchMypageInfo(userId),
  });
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
  const handleProcess = () => {};
  return (
    <section className='w-full py-8 flex gap-8'>
      <aside className='w-96 p-8 flex flex-col rounded-lg shadow-md'>
        <img
          src='/mocks/images/whity.jpg'
          alt='profile'
          className='rounded-full'
        />
        <div className='py-4'>
          <p className='text-2xl font-semibold'>{nickname}</p>
          <p className='text-sm font-light'>{email}carmania71@naver.com</p>
        </div>
        <div className='py-4 border-t border-darkWhite'>
          <p className='text-2xl font-semibold'>Invitations</p>
          {invitations && (
            <ul className='mt-1 flex flex-col'>
              {invitations.map(({ invitationId, hostName }) => (
                <div className='px-3 py-2 border border-darkWhite rounded-lg'>
                  <ReqeustItem
                    key={invitationId}
                    joinId={invitationId}
                    nickname={hostName}
                    // integrate hanldeProcess logic with invitation
                    handleProcess={handleProcess}
                  />
                </div>
              ))}
            </ul>
          )}
        </div>
      </aside>
      <div className='w-full'>
        <h2 className='text-xl'>My Rooms</h2>
        {rooms && (
          <ul className='w-full gap-x-4 gap-y-8 place-items-center grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3'>
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
