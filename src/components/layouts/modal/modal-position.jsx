import { EventMarkerContainer } from '@/components/map/map-marker';
import { Input } from '@/components/ui/input';
import { MAP_SCALE_50M } from '@/constants/map-scale';
import { useMapStore } from '@/stores/map.store';
import { MapPin } from 'lucide-react';
import { useEffect } from 'react';
import { Map } from 'react-kakao-maps-sdk';

export default function Position({ address }) {
  //추후 위도 경도까지 받을 예정
  useEffect(() => {}, [address]);
  const { center } = useMapStore();
  return (
    <div>
      <label className="flex items-center gap-2 text-sm font-semibold text-primary">
        <MapPin className="w-4 h-4 text-primary" />
        일정장소
      </label>
      <Input type="text" name="address" value={address} className="mt-0.5 text-sm p-2" />
      <div className="w-full h-20 rounded-xl overflow-hidden border border-border">
        <Map
          center={center}
          className="w-full h-full"
          level={MAP_SCALE_50M} // 확대 수준 (기본값: 50M)
          keyboardShortcuts={true} // 키보드의 방향키와 +, – 키로 지도 이동,확대,축소 가능 여부 (기본값: false)
        >
          <EventMarkerContainer />
        </Map>
      </div>
    </div>
  );
}
