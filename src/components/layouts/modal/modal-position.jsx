import { Input } from '@/components/ui/input';
import { MapPin } from 'lucide-react';

export default function ModalPosition({ address }) {
  //추후 위도 경도까지 받을 예정

  return (
    <div>
      <label className="flex items-center gap-2 text-sm font-semibold text-primary">
        <MapPin className="w-4 h-4 text-primary" />
        일정장소
      </label>
      <Input type="text" value={address} className="mt-0.5 text-sm p-2" />
      <div className="w-full h-20 rounded-xl overflow-hidden border border-border">
        <div id="kakao-map" className="w-full h-full"></div>
      </div>
    </div>
  );
}
