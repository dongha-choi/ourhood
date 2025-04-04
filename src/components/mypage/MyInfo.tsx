import React from 'react';

import useAuthStore from '../../stores/useAuthStore';

const MyInfo: React.FC = () => {
  const { name, email } = useAuthStore((state) => state.user);
  return (
    <div className='flex flex-col gap-4'>
      <img
        src='/mocks/images/whity.jpg'
        alt='profile'
        className='w-full h-auto rounded-full object-cover'
      />
      <div>
        <p className='text-lg font-light'>{name}</p>
        <p className='text-lg font-light'>{email}</p>
      </div>
    </div>
  );
};

export default MyInfo;
