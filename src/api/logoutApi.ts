import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

export const logoutApi = async () => {
  try {
    await axios.post(`${apiUrl}/api/logout`);
  } catch (error) {
    throw new Error('Logout failed!');
  }
};
