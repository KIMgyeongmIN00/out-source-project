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

// 키워드로 장소 검색
export function useKakaoSearchQuery(latLng, search) {
  return useQuery({
    queryKey: ['kakaoAddress', latLng?.lat, latLng?.lng, search],
    queryFn: async () => {
      if (!search || !latLng?.lat || !latLng?.lng) return null;
      try {
        const response = await axiosMap.get(`search/keyword.json?x=${latLng.lng}&y=${latLng.lat}&query=${search}`);
        if (!response?.data) throw new Error('응답 데이터가 없습니다.');
        return response.data;
      } catch (error) {
        console.error('Registration error:', error);
        throw error;
      }
    },
    enabled: !!search && !!latLng?.lat && !!latLng?.lng
  });
}
