import { useKakaoMapQuery } from '@/lib/apis/map.api';
import { Map } from 'react-kakao-maps-sdk';

export default function Home() {
  const { KakaoMapLoading, KakaoMapError } = useKakaoMapQuery();

  // 로딩 중일 때 화면에 로딩 메시지 표시
  if (KakaoMapLoading) return <div>Loading...</div>;

  // 에러가 있을 경우 에러 메시지 표시
  if (KakaoMapError) return <div>Error loading map: {KakaoMapError.message}</div>;

  return (
    <Map
      center={{
        lat: 33.450701,
        lng: 126.570667
      }}
      style={{
        width: '100%',
        height: '450px'
      }}
      level={3}
    />
  );
}
