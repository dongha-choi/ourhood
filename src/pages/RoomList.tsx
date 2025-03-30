import React, { useState, useEffect, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchRooms } from '../api/roomApi';
import RoomCard from '../components/room/RoomCard';
import RoomListSearchBar from '../components/room/RoomListSearchBar';
import RoomCardSkeleton from '../components/room/RoomCardSkeleton';
import { SearchParams } from '../types/apis/room';
import { RoomCardInfo } from '../types/room';
import NoRoomsView from '../components/room/NoRoomsView';

const RoomList: React.FC = () => {
  // actual input of search query
  const [searchParams, setSearchParams] = useState<SearchParams>({
    q: '',
    condition: 'room',
    order: null,
  });

  // State for the input values that will be debounced
  const [debouncedParams, setDebouncedParams] =
    useState<SearchParams>(searchParams);

  const [isDebouncing, setIsDebouncing] = useState(false);

  const {
    isLoading,
    isRefetching,
    error,
    data: roomList,
    refetch,
  } = useQuery({
    queryKey: ['roomList', debouncedParams],
    queryFn: () => searchRooms(debouncedParams),
    staleTime: 30000,
    refetchOnWindowFocus: false,
  });

  // Debounce search params updates
  useEffect(() => {
    setIsDebouncing(true);

    const timeoutId = setTimeout(() => {
      setDebouncedParams(searchParams);
      setIsDebouncing(false);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchParams]);

  // Refetch when debounced search params change
  useEffect(() => {
    refetch({ cancelRefetch: false });
  }, [debouncedParams, refetch]);

  const updateSearchParams = useCallback((newParams: Partial<SearchParams>) => {
    setSearchParams((prev) => ({ ...prev, ...newParams }));
  }, []);

  const shouldShowSkeletons = isLoading || isDebouncing || isRefetching;

  return (
    <section className='flex flex-col min-h-screen w-full px-1'>
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
      <div>
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
      </div>

      {shouldShowSkeletons && (!roomList || isDebouncing) ? (
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
        <NoRoomsView hasSearchQuery={!!debouncedParams.q} />
      )}
    </section>
  );
};

export default RoomList;
