import { useEffect, useState } from 'react';
import { useKakaoMapQuery } from '@/lib/apis/map.api';
import { useMapStore } from '@/stores/map.store';

export const useHome = () => {
  const { kakaoMapLoading, kakaoMapError } = useKakaoMapQuery();
  const { center, setTargetLocation, isInfoWindow, toggleInfoWindow } = useMapStore();
  const [currentLocation, setCurrentLocation] = useState(center);

  // 현재 위치 조회 로직
  useEffect(() => {
    const getGeolocation = () => {
      if (!navigator.geolocation) {
        console.error('Geolocation을 지원하지 않는 브라우저입니다.');

        return;
      }

      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setTargetLocation(latitude, longitude);
        setCurrentLocation({ lat: latitude, lng: longitude });
      });
    };

    getGeolocation();
  }, []);

  // 지도 클릭 핸들러
  const handleMapClick = (_, mouseEvent) => {
    const latlng = mouseEvent.latLng;
    setTargetLocation(latlng.getLat(), latlng.getLng());
    toggleInfoWindow(true);
  };

  return {
    kakaoMapLoading,
    kakaoMapError,
    currentLocation,
    center,
    isInfoWindow,
    handleMapClick
  };
};
