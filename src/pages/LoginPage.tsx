import React from 'react';
import { Link } from 'react-router-dom';

import KakaoLoginButton from '../features/auth/components/KakaoLoginButton';
import LoginForm from '../features/auth/components/LoginForm';

const LoginPage: React.FC = () => {
  return (
    <section className='w-full mt-4 flex flex-col items-center text-lg'>
      <div className='w-88 max-w-100 flex flex-col gap-4'>
        <div className='my-4 text-center text-xl font-semibold text-brand'>
          Login to Ourhood
        </div>
        <LoginForm />
        <div className='flex items-center h-6'>
          <div className='h-[1px] flex-1 bg-darkWhite'></div>
          <span className='px-2 font-light text-sm'>or</span>
          <div className='h-[1px] flex-1 bg-darkWhite'></div>
        </div>
        <KakaoLoginButton />
        <div className='text-sm font-light text-center'>
          <span>New to Ourhood?</span>
          <Link
            to={'/signup'}
            className='ml-1 mb-3 cursor-pointer text-brand hover:border-brand'
          >
            Create an account!
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
