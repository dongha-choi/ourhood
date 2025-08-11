export interface SearchRoomsParams {
  q?: string;
  condition?: 'room' | 'host';
  order?: null | 'date_desc' | 'date_asc';
}
export interface SearchRoomsResponse {
  roomList: [
    {
      roomMetadata: {
        roomId: number;
        hostName: string;
        createdAt: string;
      };
      roomDetail: {
        roomName: string;
        roomDescription?: string;
        thumbnailUrl: string | null;
      };
    }
  ];
}
