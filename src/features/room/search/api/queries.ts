import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { RoomCardInfo } from '../../types';
import { searchRooms } from './';
import { SearchRoomsParams } from './dto';

export const useSearchRooms = (
  params: SearchRoomsParams
): UseQueryResult<RoomCardInfo[]> => {
  return useQuery({
    queryKey: ['rooms', 'search', params],
    queryFn: async () => await searchRooms(params),
    select: (data) => data.roomList,
    staleTime: 3 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
