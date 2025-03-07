import { ReceivedInvitation, SentJoinRequest } from './memberRequest';
import { RoomCardInfo } from './room';

export interface MypageInfo {
  myRooms: RoomCardInfo[];
  receivedInvitations: ReceivedInvitation[];
  sentJoinRequests: SentJoinRequest[];
}
