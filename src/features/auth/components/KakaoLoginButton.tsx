import React, { useState } from 'react';

import kakaoLogo from '../../../assets/images/kakao-logo.svg';
import { getOauthUrl } from '../api';

const KakaoLoginButton: React.FC = () => {
  // --- STATE ---
  const [errorMessage, setErrorMessage] = useState<string>('');

  // --- HANDLERS ---
  const handleKakaoLogin = async () => {
    try {
      const oauthUrl = await getOauthUrl('kakao');
      window.location.href = oauthUrl;
    } catch (error) {
      if (error) setErrorMessage('Sorry, Kakao login is not working properly.');
    }
  };
  return (
    <>
      <button
        className='flex justify-center items-center gap-2 h-10 px-2 w-full text-sm bg-kakao text-center rounded-md box-border font-medium hover:bg-kakaoHovered'
        onClick={handleKakaoLogin}
        type='button'
      >
        <img src={kakaoLogo} alt='' className='w-4' />
        <p>Continue with Kakao</p>
      </button>

      {errorMessage && (
        <p className='text-red text-sm font-medium'>{errorMessage}</p>
      )}
    </>
  );
};

export default KakaoLoginButton;
