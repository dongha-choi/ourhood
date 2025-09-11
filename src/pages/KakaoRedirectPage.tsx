import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useOauthLogin } from '../features/auth/api/mutations';

const KakaoRedirectPage: React.FC = () => {
  // --- HOOKS ---
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { mutateAsync: oauthLogin } = useOauthLogin();

  useEffect(() => {
    const handleLogin = async (code: string) => {
      try {
        await oauthLogin({ oauthType: 'kakao', code });
      } catch (error) {
        console.error(error);
        // 실패 시 로그인 페이지로 다시 이동
        alert('Failed to login');
        navigate('/login');
      }
    };

    // URL에서 'code'라는 이름의 쿼리 파라미터를 가져옵니다.
    const code = searchParams.get('code');

    if (code) {
      // 인가 코드가 있다면 백엔드로 전송
      handleLogin(code);
    } else {
      // 인가 코드가 없다면 에러 처리
      console.error('Authorization code not found.');
      alert('카카오 인증에 실패했습니다.');
      navigate('/login');
    }
  }, [searchParams, navigate, oauthLogin]);

  return (
    <div>
      <p>로그인 처리 중입니다. 잠시만 기다려주세요...</p>
    </div>
  );
};

export default KakaoRedirectPage;
