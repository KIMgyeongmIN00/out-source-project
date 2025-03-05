import useRankAddressUseQuery from '@/lib/hooks/profile/use-rank-address-query';
import { MdOutlineLocationOn } from 'react-icons/md';

export default function ProfileMostVisitedPlace({ plans }) {
  const { topLocations } = useRankAddressUseQuery(plans);

  return (
    <div className="flex flex-col">
      <h3 className="mb-4">일정 많이 등록한 장소 TOP3 (공동 순위일 경우, 먼저 생성된 항목을 우선)</h3>
      <ul className="grid grid-cols-3 justify-start flex-wrap gap-4">
        {topLocations.map(([address]) => {
          return (
            <li key={address} className="border-2 border-primary p-4 rounded-lg flex items-center">
              <MdOutlineLocationOn />
              <p className="flex-1 overflow-hidden text-ellipsis text-nowrap">{address}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
