import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import RoomCard from '../components/RoomCard';
import useRooms from '../hooks/useRooms';
import { RoomInfo } from '../types/rooms';
import { useNavigate } from 'react-router-dom';
import { SearchParams } from '../types/apis/rooms';
import { IoIosSearch } from 'react-icons/io';

type InputChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLSelectElement>;

const Rooms: React.FC = () => {
  const navigate = useNavigate();
  const { fetchMockRooms, searchRooms } = useRooms();
  const [searchParams, setSearchParams] = useState<SearchParams>({
    q: '',
    condition: 'room',
    order: 'date_desc',
  });
  const {
    isLoading: mockLoading,
    error: mockError,
    data: mockRooms,
  } = useQuery({
    queryKey: ['mock'],
    queryFn: fetchMockRooms,
  });

  const {
    isLoading,
    error,
    data: rooms,
  } = useQuery({
    queryKey: ['rooms', searchParams],
    queryFn: () => searchRooms(searchParams),
  });

  const handleChange = (e: InputChangeEvent) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {};
  return (
    <section>
      <div className='mt-2 mb-4 flex justify-between items-center'>
        <form onSubmit={handleSubmit} className='flex-1 flex gap-2'>
          <select
            name='condition'
            id='condition'
            value={searchParams.condition}
            onChange={handleChange}
            className='p-1 text-sm border rounded border-lightGray'
          >
            <option value='room'>Room</option>
            <option value='host'>Host</option>
          </select>
          <input
            type='text'
            name='q'
            id='q'
            value={searchParams.q}
            onChange={handleChange}
            placeholder='Search...'
            className='py-1 px-2 w-1/4 min-w-40 font-normal outline-none border-b'
          />
          <button type='submit'>
            <IoIosSearch className='text-xl font-bold' />
          </button>
        </form>
        <button
          onClick={() => navigate('/rooms/new')}
          className='h-10 px-2 py-1 rounded-lg text-white bg-brand'
        >
          + Create Room
        </button>
      </div>
      {mockLoading || (isLoading && <p>Loading...</p>)}
      {mockError && <p>Mock data error: {mockError.message}</p>}
      {error && <p>Fetch data error: {error.message}</p>}
      {mockRooms && (
        <ul className='w-full gap-x-4 gap-y-8 mb-8 place-items-center grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
          {mockRooms.map((roomInfo: RoomInfo) => (
            <RoomCard key={roomInfo.roomId} roomInfo={roomInfo} />
          ))}
        </ul>
      )}
      {rooms && (
        <ul className='w-full gap-x-4 gap-y-8 place-items-center grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
          {rooms.map((roomInfo: RoomInfo) => (
            <RoomCard key={roomInfo.roomId} roomInfo={roomInfo} />
          ))}
        </ul>
      )}
    </section>
  );
};

export default Rooms;
