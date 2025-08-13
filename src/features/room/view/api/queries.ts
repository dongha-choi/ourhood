import { useQueries, useQuery } from '@tanstack/react-query';

import { Member, Moment } from '../domain/models';
import { fetchRoomInfo, fetchRoomMembers, fetchRoomMoments } from './';

export const useRoomInfo = (roomId: number) => {
  return useQuery({
    queryKey: ['rooms', roomId],
    queryFn: async () => await fetchRoomInfo(roomId),
    staleTime: 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

export const roomMomentsQueryOptions = (roomId: number | undefined) => ({
  queryKey: ['rooms', roomId, 'moments'],
  queryFn: async () => await fetchRoomMoments(roomId as number),
  refetchOnWindowFocus: false,
  enabled: typeof roomId === 'number',
});
export const useRoomMoments = (roomId: number | undefined) => {
  return useQuery(roomMomentsQueryOptions(roomId));
};
export const roomMembersQueryOptions = (roomId: number | undefined) => ({
  queryKey: ['rooms', roomId, 'members'],
  queryFn: async () => await fetchRoomMembers(roomId as number),
  refetchOnWindowFocus: false,
  enabled: typeof roomId === 'number',
});
export const useRoomMembers = (roomId: number | undefined) => {
  return useQuery(roomMembersQueryOptions(roomId));
};
export const useRoomViewCounts = (roomId: number | undefined) => {
  return useQueries({
    queries: [
      {
        ...roomMomentsQueryOptions(roomId),
        select: (data: Moment[]) => data.length,
      },
      {
        ...roomMembersQueryOptions(roomId),
        select: (data: Member[]) => data.length,
      },
    ],
  });
};
