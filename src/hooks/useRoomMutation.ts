import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteMoment } from '../api/momentApi';
import useAuthStore from '../stores/useAuthStore';
import { RoomInfo } from '../types/room';

const useRoomMutation = (roomId: number) => {
  const userId = useAuthStore((state) => state.user.id);
  const queryClient = useQueryClient();
  const queryKey = ['roomInfo', roomId, userId];
  const deleteMomentMutation = useMutation({
    mutationFn: deleteMoment,
    onMutate: async ({ momentId }) => {
      await queryClient.cancelQueries({ queryKey });
      const previousData = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, (old: RoomInfo | undefined) => {
        if (!old) return old;
        return {
          ...old,
          roomPrivate: {
            ...old.roomPrivate,
            moments: old.roomPrivate?.moments.filter(
              (moment) => moment.momentId !== momentId
            ),
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

  return { deleteMomentMutation };
};

export default useRoomMutation;
