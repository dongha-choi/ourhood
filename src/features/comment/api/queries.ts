import { useQuery } from '@tanstack/react-query';

import { fetchCommentList } from './';

export const useComments = (momentId: number) => {
  return useQuery({
    queryKey: ['moments', momentId, 'comments'],
    queryFn: async () => await fetchCommentList(momentId),
  });
};
