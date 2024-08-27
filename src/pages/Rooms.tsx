import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import RoomCard from '../components/RoomCard';
import useRooms from '../hooks/useRooms';
import { RoomInfo } from '../types/rooms';
import { useNavigate } from 'react-router-dom';

interface SearchParams {
  query: string;
  order: string;
}

type InputChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLSelectElement>;

const Rooms: React.FC = () => {
  const navigate = useNavigate();
  const { fetchMockRooms } = useRooms();
  const [searchParams, setSearchParams] = useState<SearchParams>({
    query: '',
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

  // const {
  //   isLoading,
  //   error,
  //   data: rooms,
  // } = useQuery({
  //   queryKey: ['mock'],
  //   queryFn: fetchMockRooms,
  // });

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
      {mockLoading && <p>Loading...</p>}
      {mockError && <p>Something went wrong: {mockError.message}</p>}
      <div className='my-2 flex justify-between items-center'>
        <form onSubmit={handleSubmit} className='py-4'>
          <input type='text' name='query' onChange={handleChange} />
          <button>
            <CiSearch />
          </button>
        </form>
        <button
          onClick={() => navigate('/rooms/new')}
          className='h-10 px-2 py-1 rounded-lg text-white bg-brand'
        >
          + Create Room
        </button>
      </div>
      {mockRooms && (
        <ul className='w-full gap-x-4 gap-y-8 place-items-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
          {mockRooms.map((roomInfo: RoomInfo) => (
            <RoomCard key={roomInfo.roomId} roomInfo={roomInfo} />
          ))}
        </ul>
      )}
    </section>
  );
};

export default Rooms;
