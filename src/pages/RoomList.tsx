import React, { useCallback, useState } from 'react';

import RoomCard from '../components/room/RoomCard';
import RoomCardSkeleton from '../components/room/RoomCardSkeleton';
import RoomListSearchBar from '../components/room/RoomListSearchBar';
import NoRoomsView from '../features/room/search/components/NoRoomsView';
import useDebounce from '../hooks/useDebounce';
import { RoomCardInfo } from '../types/room';

const RoomList: React.FC = () => {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    q: '',
    condition: 'room',
    order: null,
  });

  const debouncedParams = useDebounce(searchParams, 500);

  const {
    isLoading,
    isFetching,
    error,
    data: roomList,
  } = useSearchRooms(debouncedParams);

  const updateSearchParams = useCallback((newParams: Partial<SearchParams>) => {
    setSearchParams((prev) => ({ ...prev, ...newParams }));
  }, []);

  const shouldShowSkeletons = isLoading || isFetching;

  return (
    <section className='flex flex-col min-h-screen w-full px-1'>
      {isFetching && (
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
          isLoading={isFetching}
        />

        {error && (
          <p className='py-4 text-center text-red-500'>
            Error: {(error as Error).message}
          </p>
        )}
      </div>

      {shouldShowSkeletons ? (
        <ul className='grid w-full grid-cols-1 place-items-center gap-x-4 gap-y-8 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'>
          {[...Array(8)].map((_, index) => (
            <RoomCardSkeleton key={index} />
          ))}
        </ul>
      ) : roomList && roomList.length > 0 ? (
        <ul className='grid w-full grid-cols-1 place-items-center gap-x-4 gap-y-8 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'>
          {roomList.map((roomCardInfo: RoomCardInfo) => (
            <RoomCard
              key={roomCardInfo.roomMetadata.roomId}
              roomCardInfo={roomCardInfo}
              isUpdating={isFetching}
            />
          ))}
        </ul>
      ) : (
        <NoRoomsView hasSearchQuery={!!debouncedParams.q} />
      )}
    </section>
  );
};

export default RoomList;
