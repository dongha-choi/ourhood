export type OauthType = 'kakao' | 'google';

export interface User {
  id: number | null;
  name: string;
  email: string;
}
