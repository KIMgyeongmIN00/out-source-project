import { KAKAO_MAP_API_KEY } from '@/constants/app-key';
import { useKakaoLoader } from 'react-kakao-maps-sdk';

export function useKakaoMapQuery() {
  const [loading, error] = useKakaoLoader({
    appkey: KAKAO_MAP_API_KEY
  });

  return { kakaoMapLoading: loading, kakaoMapError: error };
}
