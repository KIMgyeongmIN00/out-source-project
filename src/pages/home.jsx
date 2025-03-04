import { MAP_SCALE_50M } from '@/constants/map-scale';
import { useKakaoMapQuery } from '@/lib/apis/map.api';
import { useMapStore } from '@/stores/map.store';
import { useEffect } from 'react';
import { Map } from 'react-kakao-maps-sdk';
import EventMarkerContainer from '@/components/features/map/map-marker';
import MapAddressModal from '@/components/features/map/map-address-modal';
import MapAddressSearch from '@/components/features/map/map-search';
import { useState } from 'react';
import { MapPlansMarker } from '@/components/features/map/map-plans-marker';

export default function Home() {
  const { kakaoMapLoading, kakaoMapError } = useKakaoMapQuery();

  const [currentLocation, setCurrentLocation] = useState('');

  const center = useMapStore((state) => state.center);
  const setTargetLocation = useMapStore((state) => state.setTargetLocation);
  const isInfoWindow = useMapStore((state) => state.isInfoWindow);
  const toggleInfoWindow = useMapStore((state) => state.toggleInfoWindow);

  // 현재 사용자 위치 표시 or 거부시 디폴트 위치 표시
  useEffect(() => {
    if (!navigator.geolocation) {
      console.error('Geolocation을 지원하지 않는 브라우저입니다.');
      return;
    }

    navigator.geolocation.getCurrentPosition((position) => {
      setTargetLocation(position.coords.latitude, position.coords.longitude);
      setCurrentLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
    });
  }, []);

  // 지도 클릭 시 호출되는 함수
  function handleMapClick(_, mouseEvent) {
    const latlng = mouseEvent.latLng;
    setTargetLocation(latlng.getLat(), latlng.getLng());
    toggleInfoWindow(true);
  }


  if (kakaoMapLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <div className="text-lg font-medium text-gray-700">지도 로딩 중...</div>
      </div>
    );
  }

  if (kakaoMapError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <div className="text-lg font-medium text-red-600">에러가 발생했습니다: {kakaoMapError.message}</div>
      </div>
    );
  }

  return (
    <>
      <Map
        center={center}
        className="w-full h-full"
        level={MAP_SCALE_50M} // 확대 수준 (기본값: 50M)
        keyboardShortcuts={true} // 키보드의 방향키와 +, – 키로 지도 이동,확대,축소 가능 여부 (기본값: false)
        onClick={handleMapClick}
      >
        <EventMarkerContainer>{isInfoWindow && <MapAddressModal />}</EventMarkerContainer>
        <MapAddressSearch currentLocation={currentLocation} />
        <MapPlansMarker />
      </Map>
    </>
  );
}
