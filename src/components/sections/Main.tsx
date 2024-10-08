import React, { ReactNode } from 'react';

interface MainProps {
  children: ReactNode;
}

const Main: React.FC<MainProps> = ({ children }) => {
  return (
    <main className='px-6 w-full max-w-screen-xl min-w-96 flex justify-center'>
      {children}
    </main>
  );
};

export default Main;
