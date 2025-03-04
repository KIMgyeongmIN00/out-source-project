import { Map } from 'react-kakao-maps-sdk';
import { MAP_SCALE_50M } from '@/constants/map-scale';
import EventMarkerContainer from '@/components/features/map/map-marker';
import MapAddressModal from '@/components/features/map/map-address-modal';
import MapAddressSearch from '@/components/features/map/map-search';
import { MapPlansMarker } from '@/components/features/map/map-plans-marker';
import { useHome } from '@/lib/hooks/use-home';

export default function Home() {
  const { kakaoMapLoading, kakaoMapError, currentLocation, center, isInfoWindow, handleMapClick } = useHome();

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
    <Map
      center={center}
      className="w-full h-full"
      level={MAP_SCALE_50M}
      keyboardShortcuts={true}
      onClick={handleMapClick}
    >
      <EventMarkerContainer>{isInfoWindow && <MapAddressModal />}</EventMarkerContainer>
      <MapAddressSearch currentLocation={currentLocation} />
      <MapPlansMarker />
    </Map>
  );
}
