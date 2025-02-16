import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MomentInfo } from '../types/moment';
import { deleteComment, editComment } from '../api/commentApi';

const useMomentMutation = (momentId: number) => {
  const queryClient = useQueryClient();
  const queryKey = ['momentInfo', momentId];

  const editCommentMutation = useMutation({
    mutationFn: editComment,
    onMutate: async ({ commentId, commentContent }) => {
      await queryClient.cancelQueries({ queryKey });
      const previousData = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, (old: MomentInfo | undefined) => {
        if (!old) return old;
        return {
          ...old,
          comments: old.comments.map((comment) => {
            if (comment.commentId === commentId) {
              return {
                ...comment,
                commentContent,
              };
            } else return comment;
          }),
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

  const deleteCommentMutation = useMutation({
    mutationFn: deleteComment,
    onMutate: async ({ commentId }) => {
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

  return { editCommentMutation, deleteCommentMutation };
};

export default useMomentMutation;
