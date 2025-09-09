import { useQuery } from '@tanstack/react-query';

import { fetchMypageInfo } from './';

export const useMypageInfo = () => {
  return useQuery({
    queryKey: ['users', 'me'],
    queryFn: fetchMypageInfo,
    staleTime: 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
