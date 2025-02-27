import { MAP_SCALE_50M } from '@/constants/map-scale';
import { useKakaoMapQuery } from '@/lib/apis/map.api';
import { Map } from 'react-kakao-maps-sdk';

export default function Home() {
  const { kakaoMapLoading, kakaoMapError } = useKakaoMapQuery();

  if (kakaoMapLoading) return <div>로딩중입니다...</div>;

  if (kakaoMapError) return <div>에러입니다...{kakaoMapError.message}</div>;

  return (
    <Map
      center={{
        lat: 33.450701,
        lng: 126.570667
      }}
      className="w-full h-full"
      level={MAP_SCALE_50M}
    />
  );
}
