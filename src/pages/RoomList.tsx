import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchRooms } from '../api/roomApi';
import RoomCard from '../components/room/RoomCard';
import RoomListSearchBar from '../components/room/RoomListSearchBar';
import RoomCardSkeleton from '../components/room/RoomCardSkeleton';
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
    isRefetching,
    error,
    data: roomList,
    refetch,
  } = useQuery({
    queryKey: ['roomList', searchParams],
    queryFn: () => searchRooms(searchParams),
    staleTime: 30000, // Consider data fresh for 30 seconds
    refetchOnWindowFocus: false,
  });

  // Refetch when search params change
  useEffect(() => {
    refetch({ cancelRefetch: false });
  }, [searchParams, refetch]);

  const updateSearchParams = (newParams: Partial<SearchParams>) => {
    // First set the new params
    setSearchParams((prev) => ({ ...prev, ...newParams }));
  };

  // Loading indicators
  const isInitialLoading = isLoading && !roomList;

  return (
    <section className='min-h-screen w-full px-1'>
      {/* Top loading indicator */}
      {isRefetching && (
        <div className='fixed top-0 left-0 z-50 h-1 w-full bg-gray-100'>
          <div
            className='h-full w-full animate-pulse bg-brand'
            style={{
              animationDuration: '1.5s',
              animationIterationCount: 'infinite',
            }}
          ></div>
        </div>
      )}

      <RoomListSearchBar
        searchParams={searchParams}
        updateSearchParams={updateSearchParams}
        isLoading={isRefetching}
      />

      {error && (
        <p className='py-4 text-center text-red-500'>
          Error: {(error as Error).message}
        </p>
      )}

      {isInitialLoading ? (
        // Skeleton loading state
        <ul className='grid w-full grid-cols-1 place-items-center gap-x-4 gap-y-8 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'>
          {[...Array(8)].map((_, index) => (
            <RoomCardSkeleton key={index} />
          ))}
        </ul>
      ) : roomList && roomList.length > 0 ? (
        // Room list data
        <ul className='grid w-full grid-cols-1 place-items-center gap-x-4 gap-y-8 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'>
          {roomList.map((roomCardInfo: RoomCardInfo) => (
            <RoomCard
              key={roomCardInfo.roomMetadata.roomId}
              roomCardInfo={roomCardInfo}
              isUpdating={isRefetching}
            />
          ))}
        </ul>
      ) : (
        // Empty state
        <p className='py-4 text-center'>No rooms found</p>
      )}
    </section>
  );
};

export default RoomList;
