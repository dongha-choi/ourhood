import { v4 as uuidv4 } from 'uuid';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import useAuthStore from '../../../stores/useAuthStore';
import { CommentInfo } from '../types';
import findCommentPath from '../utils/findCommentPath';
import { createComment, deleteComment, editComment } from './';
import { CreateCommentRequest } from './dto';

export const useCreateComment = (momentId: number) => {
  // --- hooks ---
  const queryClient = useQueryClient();
  const userId = useAuthStore().user.id as number;
  const nickname = useAuthStore().user.name as string;

  const queryKey = ['moments', momentId, 'comments'];

  return useMutation({
    mutationFn: async (data: CreateCommentRequest) => await createComment(data),
    onMutate: ({
      // _momentId,
      commentContent,
      parentId,
    }: CreateCommentRequest) => {
      queryClient.cancelQueries({ queryKey });
      const previousComments = queryClient.getQueryData(queryKey);
      const tempId: number = +uuidv4();
      queryClient.setQueryData(
        queryKey,
        (oldComments: CommentInfo[] | undefined) => {
          if (!oldComments || oldComments?.length === 0) return oldComments;
          const optimisticComment: CommentInfo = {
            parentId: parentId ?? null,
            commentId: tempId, // 임시 ID 사용
            commentContent,
            userId,
            nickname,
            createdAt: new Date().toISOString(),
            replyComments: [],
          };
          const newComments = [...oldComments];
          if (parentId) {
            const parentIndex = newComments.findIndex(
              (comment) => comment.commentId === parentId
            );

            const parent = newComments[parentIndex];
            const newReplyComments = [...parent.replyComments];
            newReplyComments.push(optimisticComment);
            newComments[parentIndex] = {
              ...newComments[parentIndex],
              replyComments: newReplyComments,
            };
          } else {
            newComments.push(optimisticComment);
          }
          return newComments;
        }
      );
      return { previousComments, tempId };
    },
    onSuccess: (createdComment, _variables, context) => {
      queryClient.setQueryData<CommentInfo[]>(queryKey, (oldComments = []) =>
        oldComments.map((comment) =>
          comment.commentId === context?.tempId ? createdComment : comment
        )
      );
    },
    onError: (_err, _vars, context) => {
      queryClient.setQueryData(queryKey, context?.previousComments);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
};

interface EditCommentVariables {
  commentId: number;
  commentContent: string;
}
export const useEditComment = (momentId: number) => {
  const queryClient = useQueryClient();
  const queryKey = ['moments', momentId, 'comments'];

  return useMutation({
    mutationFn: ({ commentId, commentContent }: EditCommentVariables) =>
      editComment(commentId, { commentContent }),
    onMutate: async ({ commentId, commentContent }: EditCommentVariables) => {
      queryClient.cancelQueries({ queryKey });
      const previousComments = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(
        queryKey,
        (oldComments: CommentInfo[] | undefined) => {
          if (!oldComments || oldComments?.length === 0) return oldComments;
          const path = findCommentPath(oldComments, commentId);
          if (!path) return oldComments;

          const newComments = [...oldComments];
          if (path.replyIndex) {
            const parent = newComments[path.parentIndex];
            const newReplyComments = [...parent.replyComments];
            newReplyComments[path.replyIndex] = {
              ...newReplyComments[path.replyIndex],
              commentContent,
            };
            newComments[path.parentIndex] = {
              ...parent,
              replyComments: newReplyComments,
            };
          } else {
            newComments[path.parentIndex] = {
              ...newComments[path.parentIndex],
              commentContent,
            };
          }
          return newComments;

          // const parentIndex = oldComments.findIndex(
          //   (oldComment) => oldComment.commentId === commentId
          // );
          // if (parentIndex !== -1) {
          //   const editedComments = [...oldComments];
          //   editedComments[parentIndex] = {
          //     ...editedComments[parentIndex],
          //     commentContent,
          //   };
          //   return editedComments;
          // }

          // // ** map method **
          // return oldComments.map((parentComment) => {
          //   const { replyComments } = parentComment;
          //   if (replyComments.length < 1) return parentComment;
          //   const replyIndex = replyComments.findIndex(
          //     (replyComment) => replyComment.commentId === commentId
          //   );
          //   if (replyIndex === -1) return parentComment;
          //   const newReplyComments = [...replyComments];
          //   newReplyComments[replyIndex] = {
          //     ...replyComments[replyIndex],
          //     commentContent,
          //   };
          //   return {
          //     ...parentComment,
          //     replyComments: newReplyComments,
          //   };
          // });

          // ** for loop method **
          // for (let i = 0; i < oldComments.length; i++) {
          //   const { replyComments } = oldComments[i];
          //   if (replyComments.length === 0) continue;
          //   const replyIndex = replyComments.findIndex(
          //     (replyComment) => replyComment.commentId === commentId
          //   );
          //   if (replyIndex !== -1) {
          //     const newReplyComments = [...replyComments];
          //     newReplyComments[replyIndex] = {
          //       ...newReplyComments[replyIndex],
          //       commentContent,
          //     };
          //     const editedComments = [...oldComments];
          //     editedComments[i] = {
          //       ...editedComments[i],
          //       replyComments: newReplyComments,
          //     };
          //     return editedComments;
          //   }
          // }
        }
      );

      return { previousComments };
    },
    onError: (_err, _vars, context) => {
      queryClient.setQueryData(queryKey, context?.previousComments);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
};

interface DeleteCommentVariables {
  commentId: number;
}
export const useDeleteComment = (momentId: number) => {
  const queryClient = useQueryClient();
  const queryKey = ['moments', momentId, 'comments'];
  return useMutation({
    mutationFn: async ({ commentId }: DeleteCommentVariables) =>
      await deleteComment(commentId),
    onMutate: async ({ commentId }: DeleteCommentVariables) => {
      await queryClient.cancelQueries({ queryKey });
      const previousComments =
        queryClient.getQueryData<CommentInfo[]>(queryKey);
      if (!previousComments) return;

      queryClient.setQueryData(
        queryKey,
        (oldComments: CommentInfo[] | undefined) => {
          if (!oldComments || oldComments?.length === 0) return oldComments;
          const path = findCommentPath(oldComments, commentId);
          if (!path) return oldComments;
          const newComments = [...oldComments];
          // 대댓글을 지우는 경우
          if (path.replyIndex) {
            const parent = newComments[path.parentIndex];
            const newReplyComments = [...parent.replyComments];
            newReplyComments.splice(path.replyIndex, 1);
            newComments[path.parentIndex] = {
              ...parent,
              replyComments: newReplyComments,
            };
          }
          // 부모 댓글을 지우는 경우
          else {
            newComments.splice(path.parentIndex, 1);
          }
          return newComments;
        }
      );

      return { previousComments };
    },
    onError: (_err, _vars, context) => {
      queryClient.setQueryData(queryKey, context?.previousComments);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
};
