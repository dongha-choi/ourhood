import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useRoomStore from '../../stores/useRoomStore';
interface MomentCardProps {
  momentId: number;
  imageUrl: string;
}
const MomentCard: React.FC<MomentCardProps> = ({ momentId, imageUrl }) => {
  const navigate = useNavigate();
  const roomId = useRoomStore((state) => state.roomInfo?.roomMetadata?.roomId);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  return (
    <li className='w-full aspect-[1/1] overflow-hidden'>
      <div
        onClick={() =>
          navigate(`/rooms/${roomId}/moments/${momentId.toString()}`)
        }
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className='w-full h-full hover:cursor-pointer'
      >
        <img
          src={imageUrl}
          className={`w-full h-full object-cover transition-transform duration-[1200ms] ease-out transform ${
            isHovered && 'scale-[1.02]'
          }`}
          alt='moment-image'
        />
      </div>
    </li>
  );
};

export default MomentCard;
