import { useMutation, useQueryClient } from '@tanstack/react-query';

import { processJoinRequest } from './';

export const useAcceptJoinRequest = () => {};

export const useCancelSentJoinRequest = (joinRequestId: number) => {
  const queryClient = useQueryClient();
  // 마이페이지의 '내가 보낸 참여 요청' invalidate
  const queryKey = ['users', 'me'];

  return useMutation({
    mutationFn: () => processJoinRequest(joinRequestId, 'cancel'),
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });
};
