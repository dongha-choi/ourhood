import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MomentInfo } from '../types/moment';

const useMomentMutation = <TVariables>(
  mutationFn: (variables: TVariables) => Promise<void>,
  momentId: number
) => {
  const queryClient = useQueryClient();
  const queryKey = ['momentInfo', momentId];
  const deleteCommentMutation = useMutation({
    mutationFn,
    onMutate: async (commentId: TVariables) => {
      await queryClient.cancelQueries({ queryKey });
      const previousData = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, (old: MomentInfo | undefined) => {
        if (!old) return old;
        return {
          ...old,
          comments: old.comments.filter(
            (comment) => comment.commentId !== commentId
          ),
        };
      });
      return { previousData };
    },
    onError: (_error, _commentId, context) => {
      queryClient.setQueryData(queryKey, context?.previousData);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  return { deleteCommentMutation };
};

export default useMomentMutation;
