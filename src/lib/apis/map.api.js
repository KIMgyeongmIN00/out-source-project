import { KAKAO_MAP_API_KEY } from '@/constants/app-key';
import { useKakaoLoader } from 'react-kakao-maps-sdk';
import { useQuery } from '@tanstack/react-query';
import { axiosMap } from './axios.api';

export function useKakaoMapQuery() {
  const [loading, error] = useKakaoLoader({
    appkey: KAKAO_MAP_API_KEY
  });
  return { kakaoMapLoading: loading, kakaoMapError: error };
}

export function useKakaoAddressQuery(lat, lng) {
  return useQuery({
    queryKey: ['kakaoAddress', lat, lng],
    queryFn: async () => {
      try {
        const response = await axiosMap.get(`coord2address.json?x=${lng}&y=${lat}`);
        return response.data;
      } catch (error) {
        console.error('Registration error:', error);
        throw error;
      }
    }
  });
}
