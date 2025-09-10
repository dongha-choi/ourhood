import { http, HttpResponse } from 'msw';

import roomsMany from '../../public/mocks/rooms-many.json';

const apiUrl = import.meta.env.VITE_API_URL;

export const handlers = [
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

  http.get(`${apiUrl}/rooms`, () => {
    return HttpResponse.json({ result: roomsMany });
  }),

  http.get(`${apiUrl}/rooms/:roomId`, () => {
    return HttpResponse.json({
      result: {
        userContext: {
          isMember: true,
          isHost: true,
        },
        roomMetadata: {
          roomId: 1,
          hostName: 'testUser',
          createdAt: '2025-01-15',
        },
        roomDetail: {
          roomName: 'Tokyo',
          roomDescription: 'Trip with high school friends',
          thumbnailUrl: '/mocks/images/mount.jpg',
        },
        numOfNewJoinRequests: 2,
      },
    });
  }),
  http.get(`${apiUrl}/rooms/:roomId/moments`, () => {
    return HttpResponse.json({
      result: {
        moments: Array.from({ length: 5 }, (_, i) => ({
          momentId: i + 1,
          momentImageUrl: `https://picsum.photos/300/200?random=${i + 1}`,
        })),
      },
    });
  }),
  http.get(`${apiUrl}/rooms/:roomId/members`, () => {
    return HttpResponse.json({
      result: {
        members: Array.from({ length: 5 }, (_, i) => ({
          userId: i + 1,
          nickname: `user${i + 1}`,
        })),
      },
    });
  }),
];
