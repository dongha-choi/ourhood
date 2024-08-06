export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  result: {
    id: string;
    email: string;
    nickname: string;
  };
  message: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  nickname: string;
}
