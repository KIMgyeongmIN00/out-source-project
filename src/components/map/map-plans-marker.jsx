import { MapMarker, useMap } from 'react-kakao-maps-sdk';
import { useAuthStore } from '@/stores/auth.store';
import { useState, useEffect } from 'react';
import useGetAllPlansQuery from '@/lib/hooks/use-get-all-plans-query';
import { PlanMarkerModal } from './map-plans-modal';
import { useMemo } from 'react';

export function MapPlansMarker({ setIsOpen, children }) {
  const { plans, isPending, isError } = useGetAllPlansQuery();
  // 클릭된 마커(플랜)의 정보를 저장 (null이면 모달이 닫힌 상태)
  const [activePlan, setActivePlan] = useState(null);
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
      {plansData.map((position) => (
        <MapMarker
          key={position.id}
          position={position.latlng} // 마커를 표시할 위치
          onClick={(marker) => {
            // 클릭한 마커의 위치로 이동
            map.panTo(marker.getPosition());
            // 클릭한 마커의 plan 정보를 activePlan 상태에 저장
            setActivePlan(position);
          }}
          image={{
            src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
            size: { width: 24, height: 35 }
          }}
          title={position.title}
        >
          
          {/* activePlan이 있고, 해당 마커의 id와 activePlan의 id가 일치할 때만 모달 렌더링 */}
          {activePlan && activePlan.id === position.id && (
            <PlanMarkerModal onCloseModal={() => setActivePlan(null)} plan={position} />
          )}
        </MapMarker>
      ))}
    </>
  );
}
