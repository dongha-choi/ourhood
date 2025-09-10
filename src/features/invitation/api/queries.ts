import { useQuery } from '@tanstack/react-query';

import { fetchSentInvitations } from './';

export const useSentInvitations = (roomId: number) => {
  return useQuery({
    queryKey: ['rooms', roomId, 'invitations'],
    queryFn: () => fetchSentInvitations(roomId),
    refetchOnWindowFocus: false,
  });
};
