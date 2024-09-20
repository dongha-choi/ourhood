import React from 'react';
import MomentCard from './MomentCard';
import { Moment } from '../types/moments';

interface MomentListProps {
  moments: Moment[];
}

const MomentList: React.FC<MomentListProps> = () => {
  return (
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
  );
};

export default MomentList;
