import { ReceivedJoinRequest } from '../types';

export interface ReceivedJoinRequestsResponse {
  joinRequestList: ReceivedJoinRequest[];
}

export interface SendJoinRequestRequest {
  roomId: number;
}
export interface SendJoinRequestResponse {
  roomId: number;
}
