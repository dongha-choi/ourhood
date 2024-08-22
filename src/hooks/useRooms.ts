import axios from 'axios';
import { CreateRoomRequest, CreateRoomResponse } from '../types/apis/rooms';
import useAuthApiClient from './useAuthApiClient';
import { useMutation } from '@tanstack/react-query';

const useRooms = () => {
  const authApiClient = useAuthApiClient();
  const fetchMockRooms = async () => {
    console.log('search rooms: fetching...');
    return axios
      .get('/mocks/rooms.json') //
      .then((res) => {
        console.log('response', res);
        return res.data.rooms;
      })
      .catch(console.error);
  };
  const { mutateAsync: createRoom } = useMutation<
    CreateRoomResponse,
    Error,
    CreateRoomRequest
  >({
    mutationFn: async (data) => {
      const res = await authApiClient.post('/rooms', data);
      console.log(res);
      return res.data.roomId;
    },
    onSuccess: (data) => {
      console.log('data in rooms mutation: ', data);
    },
  });
  return { fetchMockRooms, createRoom };
};

export default useRooms;
