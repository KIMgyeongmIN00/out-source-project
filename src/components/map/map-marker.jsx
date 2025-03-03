import { useMapStore } from '@/stores/map.store';
import { MapMarker, useMap } from 'react-kakao-maps-sdk';

export default function EventMarkerContainer({ children }) {
  const center = useMapStore((state) => state.center);
  const CloseInfoWindow = useMapStore((state) => state.CloseInfoWindow);

  const map = useMap();

  return (
    <>
      <MapMarker
        position={center}
        onClick={(marker) => {
          {
            /* 마커 클릭 시 중심으로 이동 */
          }
          map.panTo(marker.getPosition());

          CloseInfoWindow();
        }}
      >
        {children}
      </MapMarker>
    </>
  );
}
