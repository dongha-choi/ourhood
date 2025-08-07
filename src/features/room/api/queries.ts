import { useQuery } from '@tanstack/react-query';

import { fetchRoomInfo, fetchRoomMembers, fetchRoomMoments } from './';

export const useRoomInfo = (roomId: number) => {
  return useQuery({
    queryKey: ['roomInfo', roomId],
    queryFn: async () => await fetchRoomInfo(roomId),
    staleTime: 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
export const useRoomMoments = (roomId: number) => {
  return useQuery({
    queryKey: ['roomMoments', roomId],
    queryFn: async () => await fetchRoomMoments(roomId),
    staleTime: 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
export const useRoomMembers = (roomId: number) => {
  return useQuery({
    queryKey: ['roomMembers', roomId],
    queryFn: async () => await fetchRoomMembers(roomId),
    staleTime: 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
