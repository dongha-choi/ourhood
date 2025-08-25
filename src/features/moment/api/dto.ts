import { MomentInfo } from '../types';

export interface CreateMomentRequest {
  roomId: number;
  momentDescription?: string;
  momentImageKey: string;
}
export interface CreateMomentResponse {
  momentId: number;
}
export type MomentInfoResponse = MomentInfo;
export interface EditMomentRequest {
  momentDescription: string;
}
