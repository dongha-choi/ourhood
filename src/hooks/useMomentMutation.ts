import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MomentInfo } from '../types/moment';
import { editMoment } from '../api/momentApi';
import { deleteComment, editComment } from '../api/commentApi';

// comment refactor 후 props의 momentId는 삭제될 예정
// props의 momentId는 comment api에서 moment info mutation(refresh)를 위한
// 근데 이게 효율적인가? momentId를 전달하면  querykey 고정시켜서 재사용도 가능하고
// 이 아이디에 대해 뮤테이션 할거에요~ 라고 생각하는것도 괜찮지 않나
const useMomentMutation = (momentId: number) => {
  const queryClient = useQueryClient();
  const queryKey = ['momentInfo', momentId];

  const editMomentMutation = useMutation({
    mutationFn: editMoment,
    onMutate: async ({ momentDescription }) => {
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

  return { editMomentMutation, editCommentMutation, deleteCommentMutation };
};

export default useMomentMutation;
