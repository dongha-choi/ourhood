import React, { useEffect, useRef, useState } from 'react';
import useRoomStore from '../../stores/useRoomStore';
import { useNavigate, useParams } from 'react-router-dom';
import {
  MdNotificationsNone,
  MdOutlineAddPhotoAlternate,
} from 'react-icons/md';
import JoinRequestList from '../member/JoinRequestList';
import { FiMoreHorizontal } from 'react-icons/fi';

type RoomBtnState = 'new-moment' | 'notification' | 'control' | null;

const RoomMenu: React.FC = () => {
  const navigate = useNavigate();
  const roomId = +(useParams().roomId as string);
  const numOfNewJoinRequests = useRoomStore(
    (state) => state.roomInfo?.roomDetail?.numOfNewJoinRequests
  );
  const [roomBtnState, setRoomBtnState] = useState<RoomBtnState>(null);

  const menuRef = useRef<HTMLDivElement>(null);
  const handleBtnClick = (type: RoomBtnState) => {
    switch (type) {
      case roomBtnState:
        setRoomBtnState(null);
        return;
      case 'new-moment':
        navigate(`/rooms/${roomId}/moments/new`);
        return;
      default:
        setRoomBtnState(type);
        return;
    }
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        handleBtnClick(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });
  return (
    <aside className='relative text-3xl flex justify-center gap-1'>
      <button
        onClick={() => handleBtnClick('new-moment')}
        className='pl-0.5 pb-0.5 room-btn'
      >
        <MdOutlineAddPhotoAlternate />
      </button>
      <button
        className='relative room-btn'
        onClick={() => handleBtnClick('notification')}
      >
        <MdNotificationsNone />
        {!!numOfNewJoinRequests && (
          <div className='w-3 h-3 text-3xs absolute rounded-full top-0.5 right-0.5 bg-red text-white font-semibold'>
            {numOfNewJoinRequests}
          </div>
        )}
      </button>
      <div className='absolute' ref={menuRef}>
        {roomBtnState === 'notification' && <JoinRequestList />}
      </div>
      <button onClick={() => handleBtnClick('control')}>
        <FiMoreHorizontal className='text-xl' />
      </button>
      <div className='absolute' ref={menuRef}>
        {roomBtnState === 'control' && (
          <div className='absolute z-10 p-2 top-10 -right-12 m-0 flex flex-col items-start rounded-xl font-semibold text-sm bg-white light-shadow'>
            <button className='w-full p-1 whitespace-nowrap font-medium hover-white'>
              Edit Room
            </button>
            <button className='w-full p-1 whitespace-nowrap font-medium hover-white text-red'>
              Delete Room
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};

export default RoomMenu;
