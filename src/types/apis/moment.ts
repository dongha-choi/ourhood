import { MomentInfo } from './../moment';

export type CreateMomentRequest = FormData;
export interface CreateMomentResponse {
  momentId: number;
  imageUrl: string;
}

export type FetchMomentInfoResponse = MomentInfo;
