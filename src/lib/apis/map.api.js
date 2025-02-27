import { KAKAO_MAP_API_KEY } from '@/constants/app-key';
import { useKakaoLoader } from 'react-kakao-maps-sdk';

export function useKakaoMapQuery() {
  const [loading, error] = useKakaoLoader({
    appkey: KAKAO_MAP_API_KEY // 환경 변수에서 API 키 가져오기
  });

  return { kakaoMapLoading: loading, kakaoMapError: error };
}
