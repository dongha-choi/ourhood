import React from 'react';
interface MomentCardProps {
  thumbnail: string;
}
const MomentCard: React.FC<MomentCardProps> = ({ thumbnail }) => {
  return (
    <li className='w-full aspect-[1/1] overflow-hidden'>
      <img src={thumbnail} className='w-full h-full object-cover' alt='' />
    </li>
  );
};

export default MomentCard;
