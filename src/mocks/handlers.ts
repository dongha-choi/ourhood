import { http, HttpResponse } from 'msw';
import roomsMany from '../../public/mocks/rooms-many.json';

export const handlers = [
  http.get('/rooms', () => {
    return HttpResponse.json(roomsMany);
  }),
];