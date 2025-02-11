export interface Moment {
  momentId: number;
  momentImage: string;
}

export interface MomentForm {
  description: string;
  image: File | null;
}

export interface MomentMetadata {
  momentImage: string;
  userId: number;
  nickname: string;
  createdAt: string;
}

export interface MomentDetail {
  momentDescription: string;
}

export interface MomentComment {
  commentId: number;
  nickname: string;
  commentContent: string;
  createdAt: string;
  userId: number;
}

export interface MomentInfo {
  momentMetadata: MomentMetadata;
  momentDetail: MomentDetail;
  comments: MomentComment[];
}
