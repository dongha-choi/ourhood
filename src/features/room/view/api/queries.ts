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

// 1. 공통 쿼리 옵션 정의
// 'roomMoments' 데이터에 대한 Single Source of Truth
export const roomMomentsQueryOptions = (roomId: number) => ({
  queryKey: ['roomMoments', roomId],
  queryFn: () => fetchRoomMoments(roomId),
  refetchOnWindowFocus: false,
  // staleTime, gcTime 등 다른 공통 옵션도 이곳에서 한 번만 관리
  // staleTime: 60 * 1000,
});
// 2. 전체 데이터가 필요한 훅은 옵션 그대로 사용
export const useRoomMoments = (roomId: number) => {
  return useQuery(roomMomentsQueryOptions(roomId));
};
// 3. spread 연산자로 다른 옵션 추가
export const useRoomMomentsCount = (roomId: number) => {
  return useQuery({
    ...roomMomentsQueryOptions(roomId), // 공통 옵션 재사용
    select: (data) => data.length, // 이 훅에만 필요한 옵션 추가
  });
};

export const roomMembersQueryOptions = (roomId: number) => ({
  queryKey: ['roomMembers', roomId],
  queryFn: async () => await fetchRoomMembers(roomId),
  refetchOnWindowFocus: false,
});
export const useRoomMembers = (roomId: number) => {
  return useQuery(roomMembersQueryOptions(roomId));
};
export const useRoomMembersCount = (roomId: number) => {
  return useQuery({
    ...roomMembersQueryOptions(roomId),
    select: (data) => data.length,
  });
};
