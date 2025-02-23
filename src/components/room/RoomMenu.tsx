import React, { useEffect, useRef, useState } from 'react';
import useRoomStore from '../../stores/useRoomStore';
import { useNavigate, useParams } from 'react-router-dom';
import {
  MdNotificationsNone,
  MdOutlineAddPhotoAlternate,
} from 'react-icons/md';
import JoinRequestList from '../member-request/JoinRequestList';
import { FiMoreHorizontal } from 'react-icons/fi';
import useAuthStore from '../../stores/useAuthStore';
import { deleteRoom, leaveRoom } from '../../api/roomApi';
import { TbMailCheck } from 'react-icons/tb';
import SentInvitationPopover from '../member-request/SentInvitationPopover';

type RoomMenuState = 'newJoinRequests' | 'sentInvitations' | 'control' | null;

interface RoomMenuProps {
  isHost: boolean;
}

const RoomMenu: React.FC<RoomMenuProps> = ({ isHost }) => {
  const navigate = useNavigate();
  const userId = useAuthStore().user.id as number;
  const roomId = +(useParams().roomId as string);
  const numOfNewJoinRequests = useRoomStore(
    (state) => state.roomInfo?.roomPrivate?.numOfNewJoinRequests
  );
  const [roomMenuState, setRoomMenuState] = useState<RoomMenuState>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const handleBtnClick = (state: RoomMenuState) => {
    setRoomMenuState((prevState) => (prevState === state ? null : state));
  };
  const handleDelete = async () => {
    if (
      confirm(
        'Deleting the room will erase all data and cannot be undone. Are you sure you want to proceed?'
      )
    ) {
      await deleteRoom(roomId);
      alert('Successfully deleted!');
      navigate('/rooms');
    } else {
      return;
    }
  };
  const handleLeave = async () => {
    await leaveRoom(roomId, userId);
    navigate('/rooms');
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
    <aside
      className='relative text-3xl flex justify-center gap-1.5'
      ref={menuRef}
    >
      <button
        onClick={() => navigate(`/rooms/${roomId}/moments/new`)}
        className='pl-0.5 pb-0.5 room-btn'
      >
        <MdOutlineAddPhotoAlternate />
      </button>
      <button
        className='relative room-btn'
        onClick={() => handleBtnClick('newJoinRequests')}
      >
        <MdNotificationsNone />
        {!!numOfNewJoinRequests && (
          <div className='w-3 h-3 text-3xs absolute rounded-full top-0.5 right-0.5 bg-red text-white font-semibold'>
            {numOfNewJoinRequests}
          </div>
        )}
      </button>
      <div className='absolute' ref={menuRef}>
        {roomMenuState === 'newJoinRequests' && <JoinRequestList />}
      </div>
      <button
        className='text-2.5xl mr-1'
        onClick={() => handleBtnClick('sentInvitations')}
      >
        <TbMailCheck />
      </button>
      <div className='absolute' ref={menuRef}>
        {roomMenuState === 'sentInvitations' && <SentInvitationPopover />}
      </div>
      <button onClick={() => handleBtnClick('control')}>
        <FiMoreHorizontal className='text-xl' />
      </button>
      <div className='absolute' ref={menuRef}>
        {roomMenuState === 'control' &&
          (isHost ? (
            <div className='absolute z-10 p-2 top-10 -right-12 m-0 flex flex-col items-start rounded-xl font-semibold text-sm bg-white light-shadow'>
              <button
                className='w-full p-1 whitespace-nowrap font-medium hover-white'
                onClick={() => navigate(`/rooms/${roomId}/edit`)}
              >
                Edit Room
              </button>
              <button
                className='w-full p-1 whitespace-nowrap font-medium hover-white text-red'
                onClick={handleDelete}
              >
                Delete Room
              </button>
            </div>
          ) : (
            <div className='absolute z-10 p-2 top-10 -right-12 m-0 flex flex-col items-start rounded-xl font-semibold text-sm bg-white light-shadow'>
              <button
                className='w-full p-1 whitespace-nowrap font-medium hover-white text-red'
                onClick={handleLeave}
              >
                Leave Room
              </button>
            </div>
          ))}
      </div>
    </aside>
  );
};

export default RoomMenu;
