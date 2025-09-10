import React from 'react';

import { useAuthUser } from '../../auth/store/useAuthStore';
import { User } from '../../auth/types';

const MyInfo: React.FC = () => {
  const user = useAuthUser() as User;
  const { nickname: name, email } = user;
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
