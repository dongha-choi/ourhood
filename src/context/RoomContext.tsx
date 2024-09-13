import React, { createContext, ReactNode, useContext } from 'react';
import { Moment } from '../types/moments';

interface RoomContextState {
  moments: Moment[];
  members: string[];
}

const RoomContext = createContext<RoomContextState | undefined>(undefined);

export const RoomContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return <RoomContext.Provider value={}>{children}</RoomContext.Provider>;
};

export const useRoomContext = () => {
  const context = useContext(RoomContext);
  // if (context === undefined) {
  //   throw new Error('useRoomContext must be used within a RoomContextProvider')
  // }
  return context;
};
