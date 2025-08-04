import { useQuery } from '@tanstack/react-query';
import { searchRooms } from '../../api/roomApi';
import { SearchParams } from '../../types/apis/room';

export const useSearchRoomsQuery = (searchParams: SearchParams) => {
  return useQuery({
    queryKey: ['roomList', searchParams],
    queryFn: () => searchRooms(searchParams),
    staleTime: 30000,
    refetchOnWindowFocus: false,
  });
};
