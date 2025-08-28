import React, { useEffect, useRef, useState } from 'react';
import { FiMoreHorizontal } from 'react-icons/fi';
import { MdNotificationsNone, MdOutlineAddPhotoAlternate } from 'react-icons/md';
import { TbMailCheck } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

import SentInvitationPopover from '../../../invitation/components/SentInvitationPopover';
import ReceivedJoinRequestPopover from '../../../join-request/components/ReceivedJoinRequestPopover';
import { deleteRoom, leaveRoom } from '../api';
import { useRoomId, useRoomInfoState } from '../store/useRoomInfoStore';

type RoomMenuState = 'newJoinRequests' | 'sentInvitations' | 'control' | null;

interface RoomMenuProps {
  isHost: boolean;
}

const RoomMenu: React.FC<RoomMenuProps> = ({ isHost }) => {
  const navigate = useNavigate();
  const roomId = useRoomId();
  const numOfNewJoinRequests = useRoomInfoState()?.numOfNewJoinRequests;
  const [roomMenuState, setRoomMenuState] = useState<RoomMenuState>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const handleBtnClick = (state: RoomMenuState) => {
    setRoomMenuState((prevState) => (prevState === state ? null : state));
  };
  const handleDelete = async () => {
    try {
      if (!roomId) {
        throw new Error('Failed to load roomId');
      }
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
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };
  const handleLeave = async () => {
    try {
      if (!roomId) {
        throw new Error('Failed to load roomId');
      }
      await leaveRoom(roomId);
      navigate('/rooms');
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
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
        {roomMenuState === 'newJoinRequests' && <ReceivedJoinRequestPopover />}
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
      <div ref={menuRef}>
        {roomMenuState === 'control' &&
          (isHost ? (
            <div className='absolute z-10 p-2 top-10 -right-0 m-0 flex flex-col items-start rounded-xl font-semibold text-sm bg-white light-shadow'>
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
            <div className='absolute z-10 p-2 top-10 -right-0 m-0 flex flex-col items-start rounded-xl font-semibold text-sm bg-white light-shadow'>
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
