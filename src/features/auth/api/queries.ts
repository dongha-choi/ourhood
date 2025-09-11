import { useQuery } from '@tanstack/react-query';

import { OauthType } from '../types';
import { getOauthUrl } from './';

export const useOauthUrl = (oauthType: OauthType) => {
  return useQuery({
    queryKey: ['auth', oauthType],
    queryFn: async () => await getOauthUrl(oauthType),
  });
};
