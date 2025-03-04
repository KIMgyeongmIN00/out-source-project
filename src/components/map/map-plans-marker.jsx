import { MapMarker } from 'react-kakao-maps-sdk';
import { fetchMyPlansLimit } from '@/lib/apis/plan.api';
import { useAuthStore } from '@/stores/auth.store';
import { useState, useEffect } from 'react';

export function PlansMarker() {
  const [plansLocation, setPlansLoaction] = useState([]);
  const userId = useAuthStore((state) => state.user?.id);
  useEffect(() => {
    async function getPlans() {
      try {
        const { data } = await fetchMyPlansLimit(userId);
        const newData = data.map((plan) => {
          return { ...plan, latlng: { lat: plan.lat, lng: plan.lng } };
        });
        setPlansLoaction(newData);
      } catch (error) {
        console.error('데이터를 불러오는데 실패했습니다:', error);
      }
    }

    if (userId) {
      getPlans();
    }
  }, [userId]);

  return (
    <>
      {plansLocation.map((position, index) => (
        <MapMarker
          key={position.id}
          position={position.latlng} // 마커를 표시할 위치
          image={{
            src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png', // 마커이미지의 주소입니다
            size: {
              width: 24,
              height: 35
            } // 마커이미지의 크기입니다
          }}
          title={position.title} // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        />
      ))}
    </>
  );
}
