import React, { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchRooms } from '../api/roomApi';
import RoomCard from '../components/room/RoomCard';
import RoomListSearchBar from '../components/room/RoomListSearchBar';
import { SearchParams } from '../types/apis/room';
import { RoomCardInfo } from '../types/room';

const RoomList: React.FC = () => {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    q: '',
    condition: 'room',
    order: null,
  });

  const {
    isLoading,
    error,
    data: roomList,
  } = useQuery({
    queryKey: ['roomList', searchParams], // Include searchParams in queryKey for automatic refetching
    queryFn: () => searchRooms(searchParams),
  });

  const updateSearchParams = useCallback((newParams: Partial<SearchParams>) => {
    setSearchParams((prev) => ({ ...prev, ...newParams }));
  }, []);

  return (
    <section className='min-h-screen w-full px-1'>
      <RoomListSearchBar
        searchParams={searchParams}
        updateSearchParams={updateSearchParams}
      />

      {error && (
        <p className='text-red-500'>Error: {(error as Error).message}</p>
      )}

      {isLoading && <p className='text-center py-4'>Loading...</p>}

      {roomList && roomList.length === 0 && (
        <p className='text-center py-4'>No rooms found</p>
      )}

      {roomList && roomList.length > 0 && (
        <ul className='grid w-full grid-cols-1 place-items-center gap-x-4 gap-y-8 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'>
          {roomList.map((roomCardInfo: RoomCardInfo) => (
            <RoomCard
              key={roomCardInfo.roomMetadata.roomId}
              roomCardInfo={roomCardInfo}
            />
          ))}
        </ul>
      )}
    </section>
  );
};

export default RoomList;
