import { useMapStore } from '@/stores/map.store';
import { MapMarker, useMap } from 'react-kakao-maps-sdk';

export function EventMarkerContainer({ setIsInfoWindow, children }) {
  const { center } = useMapStore();

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

          setIsInfoWindow((prev) => !prev);
        }}
      >
        {children}
      </MapMarker>
    </>
  );
}
