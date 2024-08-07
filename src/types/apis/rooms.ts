export interface CreateRoomRequest {
  roomName: string;
  roomDescription: string;
  userId: number | null;
  // thumbnail
}
export interface CreateRoomResponse {
  roomId: number;
}
