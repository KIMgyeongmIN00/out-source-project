import { useKakaoLoader } from 'react-kakao-maps-sdk';

export function useKakaoMapQuery() {
  const [loading, error] = useKakaoLoader({
    appkey: import.meta.env.VITE_KAKAO_MAP_API_KEY // 환경 변수에서 API 키 가져오기
  });

  return { KakaoMapLoading: loading, KakaoMapError: error };
}
