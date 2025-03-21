import { immer } from 'zustand/middleware/immer';
import { RoomInfo } from '../types/room';
import { create } from 'zustand';

interface RoomState {
  roomInfo: RoomInfo | null;
}

interface RoomActions {
  setRoomInfo: (data: RoomState) => void;
  updateSentJoinRequestId: (joinRequestId: number | null) => void;
  clearRoomInfo: () => void;
}

const useRoomStore = create<RoomState & RoomActions>()(
  immer((set) => ({
    roomInfo: null,
    setRoomInfo: (data: RoomState) => set(data),
    // why use immer?
    updateSentJoinRequestId: (sentJoinRequestId) =>
      set((state) => ({
        ...state,
        roomInfo: {
          ...state.roomInfo,
          userContext: {
            ...state.roomInfo?.userContext,
            sentJoinRequestId,
          },
        },
      })),
    clearRoomInfo: () => set({ roomInfo: null }),
  }))
);

export default useRoomStore;
