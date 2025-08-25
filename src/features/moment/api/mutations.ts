import { useMutation, useQueryClient } from '@tanstack/react-query';

import { MomentCardInfo, MomentInfo } from '../types';
import { deleteMoment, editMoment } from './';

export const useEditMoment = (momentId: number, momentDescription: string) => {
  const queryClient = useQueryClient();
  const queryKey = ['moments', momentId];

  return useMutation({
    mutationFn: () => editMoment(momentId, { momentDescription }),
    onMutate: async (momentDescription) => {
      await queryClient.cancelQueries({ queryKey });
      const previousData = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, (old: MomentInfo | undefined) => {
        if (!old) return old;
        return {
          ...old,
          momentDetail: {
            momentDescription,
          },
        };
      });
      return { previousData };
    },
    onError: (_error, _, context) => {
      queryClient.setQueryData(queryKey, context?.previousData);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
};

export const useDeleteMoment = (roomId: number, momentId: number) => {
  const queryClient = useQueryClient();
  const queryKey = ['rooms', roomId, 'moments'];

  return useMutation({
    mutationFn: () => deleteMoment(momentId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });
      const previousData = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(
        queryKey,
        (old: MomentCardInfo[] | undefined) => {
          if (!old) return old;
          return old.filter((momentCard) => momentCard.momentId !== momentId);
        }
      );
      return { previousData };
    },
    onError: (_error, _, context) => {
      queryClient.setQueryData(queryKey, context?.previousData);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
};
