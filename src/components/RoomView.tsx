import React from 'react';
import { View } from '../types/rooms';
import MomentCard from './MomentCard';
import { Moment } from '../types/apis/rooms';

interface RoomViewProps {
  view: View;
  moments: Array<Moment>;
  members: Array<string>;
}

const RoomView: React.FC<RoomViewProps> = ({ view, moments, members }) => {
  console.log(moments, members);
  return (
    <>
      {view === 'moments' && (
        <ul className='w-full gap-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
          {/* {moments.map((moment) => (
        <li>
          {moment.momentId}
          <img src={moment.imageUrl} alt='' />
        </li>
      ))} */}
          <MomentCard thumbnail='/mocks/images/blossom.jpg' />
          <MomentCard thumbnail='/mocks/images/blossom.jpg' />
          <MomentCard thumbnail='/mocks/images/blossom.jpg' />
          <MomentCard thumbnail='/mocks/images/blossom.jpg' />
          <MomentCard thumbnail='/mocks/images/blossom.jpg' />
          <MomentCard thumbnail='/mocks/images/blossom.jpg' />
        </ul>
      )}
      {view === 'members' && (
        <div className='h-96 mt-1 flex flex-col items-center gap-2'>
          <div className='w-56 py-1 text-center border border-darkWhite rounded-md font-semibold'>
            Dongha
          </div>
          <div className='w-56 py-1 text-center border border-darkWhite rounded-md'>
            Dongha
          </div>
          <div className='w-56 py-1 text-center border border-darkWhite rounded-md'>
            Dongha
          </div>
          <button className='w-56 py-1 text-center text-brand border border-brand rounded-md font-semibold'>
            + Invite Member
          </button>
        </div>
      )}
    </>
  );
};

export default RoomView;
