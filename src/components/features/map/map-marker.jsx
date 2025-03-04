import { useMapStore } from '@/stores/map.store';
import { MapMarker, useMap } from 'react-kakao-maps-sdk';

export default function EventMarkerContainer({ children }) {
  const center = useMapStore((state) => state.center);
  const toggleInfoWindow = useMapStore((state) => state.toggleInfoWindow);

  const map = useMap();

  return (
    <>
      <MapMarker
        position={center}
        onClick={(marker) => {
          // 마커 클릭 시 중심으로 이동
          map.panTo(marker.getPosition());

          // 정보 창 토글
          toggleInfoWindow();
        }}
      >
        {children}
      </MapMarker>
    </>
  );
}
