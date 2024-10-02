export type JoinList = JoinRequest[];

export interface JoinRequest {
  joinId: number;
  nickname: string;
}

export type RequestAction = 'accept' | 'reject';
