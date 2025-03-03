import EditPlan from '@/components/features/modal/edit-modal';
import MakePlan from '@/components/features/modal/write-modal';
import { MAP_SCALE_50M } from '@/constants/map-scale';
import { useKakaoMapQuery } from '@/lib/apis/map.api';
import { useMapStore } from '@/stores/map.store';
import { useEffect } from 'react';
import { Map } from 'react-kakao-maps-sdk';
import EventMarkerContainer from '@/components/map/map-marker';
import MapAddressModal from '@/components/map/map-address-modal';
import MapAddressSearch from '@/components/map/map-search';

export default function Home() {
  const { kakaoMapLoading, kakaoMapError } = useKakaoMapQuery();
  const center = useMapStore((state) => state.center);
  const setTargetLocation = useMapStore((state) => state.setTargetLocation);
  const isInfoWindow = useMapStore((state) => state.isInfoWindow);
  const CloseInfoWindow = useMapStore((state) => state.CloseInfoWindow);

  // 현재 사용자 위치 표시 or 거부시 디폴트 위치 표시
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setTargetLocation(position.coords.latitude, position.coords.longitude);
      });
    }
  }, []);

  // Map 컴포넌트 안의 내장 요소 mouseEvent 호출
  function handleMapClick(_, mouseEvent) {
    const latlng = mouseEvent.latLng;
    setTargetLocation(latlng.getLat(), latlng.getLng());
    CloseInfoWindow(true);
  }

  function handleCloseModal() {
    CloseInfoWindow(false);
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
        <MapAddressSearch />

        <EventMarkerContainer>
          {isInfoWindow && <MapAddressModal onCloseModal={handleCloseModal} />}
        </EventMarkerContainer>
      </Map>

      <MakePlan />
      <EditPlan />
    </>
  );
}
