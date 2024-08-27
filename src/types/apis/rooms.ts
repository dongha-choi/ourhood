export interface CreateRoomRequest {
  roomName: string;
  roomDescription: string;
  thumbnail: File | null;
  userId: number;
}
export interface CreateRoomResponse {
  roomId: number;
}
