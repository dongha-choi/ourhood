export type OauthType = 'kakao' | 'google';

export interface User {
  userId: number;
  nickname: string;
  email: string;
}
