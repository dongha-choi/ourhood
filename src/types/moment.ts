export interface Moment {
  momentId: number;
  imageUrl: string;
}

export interface MomentData {
  description: string;
  image: File | null;
}

export interface MomentInfo {
  nickname: string;
  momentImage: string;
  momentDescription: string;
  createdAt: string;
  comments: MomentComment[];
}

export interface MomentComment {
  commentId: number;
  nickname: string;
  commentContent: string;
  createdAt: string;
}
