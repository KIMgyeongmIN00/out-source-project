import { MdOutlineAccessTime, MdOutlineLocationOn } from 'react-icons/md';

export default function PlanPanel({ id }) {
  // TODO: 자신의 남은 일정을 가져오는 API 연결
  const plans = getPlansById(id);

  return (
    <session className="flex-1 flex flex-col overflow-hidden rounded-lg">
      <h3 className="font-bold text-xl mb-2">일정</h3>
      <div className="flex-1 overflow-hidden bg-gradient-to-t from-primary/30 via-transparent via-20% to-transparent">
        <ul className="h-full overflow-y-scroll">
          {plans.map((plan) => (
            <li key={plan.id} className="p-2 mb-3 border border-primary rounded-sm">
              <h5 className="font-semibold overflow-hidden text-ellipsis text-nowrap">{plan.title}</h5>
              <p className="text-sm flex items-center gap-1">
                <MdOutlineAccessTime className="mr-1" />
                <span className="flex-1 overflow-hidden text-ellipsis text-nowrap">{plan.date}</span>
              </p>
              <p className="text-sm flex items-center gap-1">
                <MdOutlineLocationOn className="mr-1" />
                <span className="flex-1 overflow-hidden text-ellipsis text-nowrap">{plan.address}</span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </session>
  );
}

// TODO: 삭제 - API 연결전 ui를 띄우기 위한 mocks 데이터 입니다!
function getPlansById() {
  return [
    {
      id: crypto.randomUUID(),
      title: '누군가와의 약속1',
      address: '서울 영등포구 여의대로 108 더현대 서울',
      date: '2025-08-22 12:00:00'
    },
    {
      id: crypto.randomUUID(),
      title: '누군가와의 약속2',
      address: '서울 영등포구 여의대로 108 더현대 서울',
      date: '2025-08-22 12:00:00'
    },
    {
      id: crypto.randomUUID(),
      title: '제몬을 길게 작성한 일정 내용입니다. 제목의 최대 길이를 정해두어야할까요?',
      address: '서울 영등포구 여의대로 108 더현대 서울',
      date: '2025-08-22 12:00:00'
    },
    {
      id: crypto.randomUUID(),
      title: '누군가와의 약속3',
      address: '서울 영등포구 여의대로 108 더현대 서울',
      date: '2025-08-22 12:00:00'
    }
  ];
}
