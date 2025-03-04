import { MapMarker, useMap } from 'react-kakao-maps-sdk';
import { fetchMyPlansLimit } from '@/lib/apis/plan.api';
import { useAuthStore } from '@/stores/auth.store';
import { useState, useEffect } from 'react';
import useGetAllPlansQuery from '@/lib/hooks/use-get-all-plans-query';
import { useMemo } from 'react';

export function MapPlansMarker({ setIsOpen, children }) {
  const { plans, isPending, isError } = useGetAllPlansQuery();
  const map = useMap();
  const userId = useAuthStore((state) => state.user.id);

  const plansLocation = useMemo(() => {
    if (!plans) return [];
    return plans.map((plan) => ({
      ...plan,
      latlng: { lat: plan.lat, lng: plan.lng }
    }));
  }, [plans]);

  if (isPending) {
    return <div>로딩중입니다.</div>
  }
  if (isError) {
    return <div>데이터를 불러오는 중 오류가 생겼습니다.</div>;
  }

  return (
    <>
      {plansLocation.map((position) => (
        <MapMarker
          key={position.id}
          position={position.latlng} // 마커를 표시할 위치
          onClick={(marker) => {
            {
              /* 마커 클릭 시 중심으로 이동 */
            }
            map.panTo(marker.getPosition());

            setIsOpen((prev) => !prev);
          }}
          image={{
            src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png', // 마커이미지의 주소입니다
            size: {
              width: 24,
              height: 35
            } // 마커이미지의 크기입니다
          }}
          title={position.title} // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        >
          {children}
        </MapMarker>
      ))}
    </>
  );
}
