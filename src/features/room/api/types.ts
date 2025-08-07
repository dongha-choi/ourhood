interface UserContext {
  isMember: boolean;
  isHost: boolean;
  sentJoinRequestId?: number | null;
}
interface RoomMetadata {
  roomId: number;
  hostName: string;
  createdAt: string;
}
interface RoomDetail {
  roomName: string;
  roomDescription?: string;
  thumbnailUrl: string | null;
}

export interface SearchRoomsParams {
  q?: string;
  condition?: 'room' | 'host';
  order?: null | 'date_desc' | 'date_asc';
}
export interface SearchRoomsResponseDTO {
  roomList: [
    {
      roomMetadata: RoomMetadata;
      roomDetail: RoomDetail;
    }
  ];
}

export interface RoomInfoResponseDTO {
  userContext: UserContext;
  roomMetadata: RoomMetadata;
  roomDetail: RoomDetail;
  numOfNewJoinRequests?: number;
}
export interface RoomMomentsResponseDTO {
  moments: [
    {
      momentId: number;
      momentImageUrl: string;
    }
  ];
}
export interface RoomMembersResponseDTO {
  members: [
    {
      userId: number;
      nickname: string;
    }
  ];
}
