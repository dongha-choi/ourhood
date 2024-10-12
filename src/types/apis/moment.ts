import { MomentInfo } from './../moment';

export interface MomentPayload {
  roomId: number;
  userId: number;
  momentImage: File | null;
  momentDescription: string;
}

export interface CreateMomentResponse {
  momentId: number;
  imageUrl: string;
}

export type FetchMomentInfoResponse = MomentInfo;
