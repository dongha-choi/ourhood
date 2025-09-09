import { ReceivedInvitation } from '../../invitation/types';
import { SentJoinRequest } from '../../join-request/types';
import { RoomCardInfo } from '../../room/types';
import { MyInfo } from '../types';

export interface MypageInfoResponse {
  myInfo: MyInfo;
  myRooms: RoomCardInfo[];
  receivedInvitations: ReceivedInvitation[];
  sentJoinRequests: SentJoinRequest[];
}
