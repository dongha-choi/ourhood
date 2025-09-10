import { useQuery } from '@tanstack/react-query';

import { fetchReceivedJoinRequests } from './';

export const useReceivedJoinRequests = (roomId: number) => {
  return useQuery({
    queryKey: ['rooms', roomId, 'join-requests'],
    queryFn: () => fetchReceivedJoinRequests(roomId),
    refetchOnWindowFocus: false,
  });
};
