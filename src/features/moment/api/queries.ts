import { useQuery } from '@tanstack/react-query';

import { fetchMomentInfo } from './';

export const useMomentInfo = (momentId: number) => {
  return useQuery({
    queryKey: ['moments', momentId],
    queryFn: async () => await fetchMomentInfo(momentId),
    staleTime: 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
