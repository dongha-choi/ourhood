const ACCESS_TOKEN_KEY = 'accessToken';

export const getAccessToken = (): string | null => {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};
export const setAccessToken = (token: string) => {
  return localStorage.setItem(ACCESS_TOKEN_KEY, token);
};
export const removeAccessToken = () => {
  return localStorage.removeItem(ACCESS_TOKEN_KEY);
};
