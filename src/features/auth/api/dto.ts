export interface LoginRequest {
  email: string;
  password: string;
}
export interface OauthLoginParams {
  oauthType: string;
  code: string;
}

export interface LoginResponse {
  token: {
    accessToken: string;
  };
  user: {
    userId: number;
    email: string;
  };
}

export interface SignupRequest {
  email: string;
  password: string;
  nickname: string;
}
