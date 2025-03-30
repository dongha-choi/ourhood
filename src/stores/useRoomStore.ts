import { immer } from 'zustand/middleware/immer';
import { RoomInfo } from '../types/room';
import { create } from 'zustand';

interface RoomState {
  roomInfo: RoomInfo | null;
}

interface RoomActions {
  setRoomInfo: (roomInfo: RoomInfo) => void;
  updateSentJoinRequestId: (joinRequestId: number | null) => void;
  clearRoomInfo: () => void;
}

const useRoomStore = create<RoomState & RoomActions>()(
  immer((set) => ({
    roomInfo: null,
    setRoomInfo: (roomInfo: RoomInfo) =>
      set((state) => {
        state.roomInfo = roomInfo;
      }),
    updateSentJoinRequestId: (sentJoinRequestId) =>
      set((state) => {
        if (state.roomInfo?.userContext) {
          state.roomInfo.userContext.sentJoinRequestId = sentJoinRequestId;
        }
      }),
    clearRoomInfo: () =>
      set((state) => {
        state.roomInfo = null;
      }),
  }))
);

export default useRoomStore;
