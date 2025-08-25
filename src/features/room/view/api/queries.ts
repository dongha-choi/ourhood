import { useQueries, useQuery } from '@tanstack/react-query';

import { MomentCardInfo } from '../../../moment/types';
import { RoomMember } from '../../types';
import { fetchRoomInfo, fetchRoomMembers, fetchRoomMoments } from './';

export const useRoomInfo = (roomId: number) => {
  return useQuery({
    queryKey: ['rooms', roomId],
    queryFn: async () => await fetchRoomInfo(roomId),
    staleTime: 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

export const useRoomMoments = (roomId: number) => {
  return useQuery({
    queryKey: ['rooms', roomId, 'moments'],
    queryFn: async () => await fetchRoomMoments(roomId),
    refetchOnWindowFocus: false,
  });
};
export const useRoomMembers = (roomId: number) => {
  return useQuery({
    queryKey: ['rooms', roomId, 'members'],
    queryFn: async () => await fetchRoomMembers(roomId),
    refetchOnWindowFocus: false,
  });
};
export const useRoomViewCounts = (roomId: number) => {
  return useQueries({
    queries: [
      {
        queryKey: ['rooms', roomId, 'moments'],
        queryFn: async () => await fetchRoomMoments(roomId),
        refetchOnWindowFocus: false,
        select: (moments: MomentCardInfo[]) => moments.length,
      },
      {
        queryKey: ['rooms', roomId, 'members'],
        queryFn: async () => await fetchRoomMembers(roomId),
        refetchOnWindowFocus: false,
        select: (members: RoomMember[]) => members.length,
      },
    ],
  });
};
