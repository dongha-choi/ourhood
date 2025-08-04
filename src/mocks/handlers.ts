import { http, HttpResponse } from 'msw';

import roomsMany from '../../public/mocks/rooms-many.json';

const apiUrl = import.meta.env.VITE_API_URL;

export const handlers = [
  http.get(`${apiUrl}/rooms`, () => {
    return HttpResponse.json(roomsMany);
  }),

  http.post(`${apiUrl}/login`, () => {
    return HttpResponse.json(
      {
        result: {
          user: {
            userId: 1,
            nickname: 'TestUser1',
            email: 'test@example.com',
          },
        },
        message: '로그인 성공',
      },
      {
        headers: {
          accesstoken: 'fake-access-token-12345',
        },
      }
    );
  }),
];
