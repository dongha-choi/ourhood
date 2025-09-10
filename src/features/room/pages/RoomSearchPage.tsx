import React, { useCallback, useState } from 'react';

import { SearchRoomsParams } from '../search/api/dto';
import { useSearchRooms } from '../search/api/queries';
import NoRoomsView from '../search/components/NoRoomsView';
import RoomCard from '../search/components/RoomCard';
import RoomCardSkeleton from '../search/components/RoomCardSkeleton';
import RoomListSearchBar from '../search/components/RoomListSearchBar';
import useDebounce from '../search/hooks/useDebounce';
import { RoomCardInfo } from '../types';

const RoomSearchPage: React.FC = () => {
  const [searchRoomsParams, setSearchRoomsParams] = useState<SearchRoomsParams>(
    {
      q: '',
      condition: 'room',
      order: null,
    }
  );

  const debouncedParams = useDebounce(searchRoomsParams, 500);

  const {
    isLoading,
    isFetching,
    error,
    data: searchedRooms,
  } = useSearchRooms(debouncedParams);

  const updateParams = useCallback((newParams: Partial<SearchRoomsParams>) => {
    setSearchRoomsParams((prev) => ({ ...prev, ...newParams }));
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
          searchParams={searchRoomsParams}
          updateSearchRoomsParams={updateParams}
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
      ) : searchedRooms && searchedRooms.length > 0 ? (
        <ul className='grid w-full grid-cols-1 place-items-center gap-x-4 gap-y-8 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'>
          {searchedRooms.map((roomCard: RoomCardInfo) => (
            <RoomCard
              key={roomCard.roomMetadata.roomId}
              roomCardInfo={roomCard}
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

export default RoomSearchPage;
