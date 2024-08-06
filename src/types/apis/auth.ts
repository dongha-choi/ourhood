export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  result: {
    userId: number;
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
