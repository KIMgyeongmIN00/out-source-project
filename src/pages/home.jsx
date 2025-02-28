import { MAP_SCALE_50M } from '@/constants/map-scale';
import { useKakaoMapQuery } from '@/lib/apis/map.api';
import { mapStore } from '@/stores/map.store';
import { useEffect } from 'react';
import { Map } from 'react-kakao-maps-sdk';

export default function Home() {
  const { kakaoMapLoading, kakaoMapError } = useKakaoMapQuery();
  const center = mapStore((state) => state.center);
  const setCenter = mapStore((state) => state.setCenter);

  // 현재 사용자 위치 표시 or 거부시 디폴트 위치 표시(강남역)
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCenter(position.coords.latitude, position.coords.longitude);
    });
  }, []);

  if (kakaoMapLoading) return <div></div>;

  if (kakaoMapError) return <div>에러입니다...{kakaoMapError.message}</div>;

  return (
    <Map
      center={center}
      className="w-full h-full"
      level={MAP_SCALE_50M} // 확대 수준 (기본값: 50M)
      keyboardShortcuts={true} // 키보드의 방향키와 +, – 키로 지도 이동,확대,축소 가능 여부 (기본값: false)
    />
  );
}
