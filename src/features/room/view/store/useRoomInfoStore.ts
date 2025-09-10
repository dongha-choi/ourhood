import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { RoomInfoResponse } from '../api/dto';

// 스토어의 상태와 액션을 하나의 타입으로 통합
interface RoomInfoStore {
  roomInfo: RoomInfoResponse | null;
  actions: {
    setRoomInfo: (roomInfo: RoomInfoResponse) => void;
    clearRoomInfo: () => void;
    updateSentJoinRequestId: (joinRequestId: number | null) => void;
  };
}

// 초기 상태를 상수로 분리하여 관리
const initialState = {
  roomInfo: null,
};

const useRoomInfoStore = create<RoomInfoStore>()(
  immer((set) => ({
    ...initialState,
    actions: {
      setRoomInfo: (roomInfo) =>
        set((state) => {
          state.roomInfo = roomInfo;
        }),

      clearRoomInfo: () =>
        set((state) => {
          state.roomInfo = null;
        }),

      updateSentJoinRequestId: (joinRequestId) =>
        set((state) => {
          if (state.roomInfo?.userContext) {
            state.roomInfo.userContext.sentJoinRequestId = joinRequestId;
          }
        }),
    },
  }))
);

// 스토어의 상태와 액션을 쉽게 사용하기 위한 커스텀 훅
export const useRoomId = () =>
  useRoomInfoStore((state) => state.roomInfo?.roomMetadata.roomId);
export const useRoomInfoState = () =>
  useRoomInfoStore((state) => state.roomInfo);
export const useRoomInfoActions = () =>
  useRoomInfoStore((state) => state.actions);

export default useRoomInfoStore;
