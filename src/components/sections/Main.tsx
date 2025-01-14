import React, { ReactNode } from 'react';

interface MainProps {
  children: ReactNode;
}

const Main: React.FC<MainProps> = ({ children }) => {
  return (
    <main className='px-6 w-full min-h-screen max-w-screen-xl flex justify-center'>
      {children}
    </main>
  );
};

export default Main;
