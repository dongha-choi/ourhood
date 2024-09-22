export interface Moment {
  momentId: number;
  imageUrl: string;
}

export interface MomentInfo {
  nickname: string;
  momentImage: string;
  momentDescription: string;
  createdAt: string;
  comments: Comment[];
}

export interface Comment {
  commentId: number;
  nickname: string;
  commentContent: string;
  createdAt: string;
}
