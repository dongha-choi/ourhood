import { RoomInfo } from '../types/rooms';
import { create } from 'zustand';

interface RoomState {
  roomInfo: RoomInfo | null;
}

interface RoomActions {
  setRoomInfo: (data: RoomState) => void;
  clearRoomInfo: () => void;
}

const useRoomStore = create<RoomState & RoomActions>()((set) => ({
  roomInfo: null,
  setRoomInfo: (data: RoomState) => set(data),
  clearRoomInfo: () => set({ roomInfo: null }),
}));

export default useRoomStore;
