import { KAKAO_MAP_API_KEY } from '@/constants/app-key';
import { useKakaoLoader } from 'react-kakao-maps-sdk';
import { useQuery } from '@tanstack/react-query';
import { axiosMap } from './axios.api';

// 카카오 맵 로딩 상태와 에러 상태를 반환
export function useKakaoMapQuery() {
  const [loading, error] = useKakaoLoader({
    appkey: KAKAO_MAP_API_KEY
  });
  return { kakaoMapLoading: loading, kakaoMapError: error };
}

// 좌표를 주소로 변환
export function useKakaoAddressQuery(lat, lng) {
  return useQuery({
    queryKey: ['kakaoAddress', lat, lng],
    queryFn: async () => {
      try {
        const response = await axiosMap.get(`geo/coord2address.json?x=${lng}&y=${lat}`);
        return response.data;
      } catch (error) {
        console.error('Registration error:', error);
        throw error;
      }
    }
  });
}
