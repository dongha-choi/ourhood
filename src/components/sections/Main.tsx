import React, { ReactNode } from 'react';

interface MainProps {
  children: ReactNode;
}

const Main: React.FC<MainProps> = ({ children }) => {
  return <main className='w-full max-w-screen-xl'>{children}</main>;
};

export default Main;
