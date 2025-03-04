import { X } from 'lucide-react';
import EditPlan from '../modal/edit-modal';

export function PlanMarkerModal({ onCloseModal, plan }) {
  function formatPlanDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 월은 0부터 시작하므로 1을 더함
    const day = date.getDate();
    let hour = date.getHours();
    const minute = date.getMinutes();

    // 오전/오후 결정 (0시가 12시로 표시되어야 함)
    const period = hour < 12 ? '오전' : '오후';
    hour = hour % 12;
    if (hour === 0) hour = 12;

    return `${year}년 ${month}월 ${day}일 ${period} ${hour}시 ${minute}분`;
  }

  const nowPlanDate = formatPlanDate(plan.date);

  return (
    <div className="absolute left-20 transform -translate-x-1/2 -top-34 w-80 bg-white shadow-lg rounded-lg border border-gray-200 overflow-hidden z-50">
      <div className="w-full py-3 px-4 bg-white border-b border-gray-200 flex items-center justify-between">
        <div className="flex text-center flex-1">
          <h3 className="text-base font-semibold text-gray-800 truncate max-w-[95%]">{plan.title}</h3>
          <EditPlan plan={plan} />
        </div>

        <button
          onClick={onCloseModal}
          className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="닫기"
        >
          <X size={16} className="text-gray-500" />
        </button>
      </div>

      <div className="p-4">
        <div className="mb-3">
          <div className="text-sm font-medium text-gray-700 mb-1">장소 :</div>
          <div className="text-sm text-gray-600">{plan.address}</div>
        </div>
        <div className="mb-3">
          <div className="text-sm font-medium text-gray-700 mb-1">일정 :</div>
          <div className="text-sm text-gray-600">{nowPlanDate}</div>
        </div>
        <div className="mb-3">
          <div className="text-sm font-medium text-gray-700 mb-1">세부사항 :</div>
          <div className="text-sm text-gray-600">{plan.memo}</div>
        </div>
        <div className="flex justify-between mt-4">
          <a
            href={`https://map.kakao.com/link/map/${encodeURIComponent(plan.address)},${plan.lat},${plan.lng}`}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
          >
            큰지도보기
          </a>
          <a
            href={`https://map.kakao.com/link/to/${encodeURIComponent(plan.address)},${plan.lat},${plan.lng}`}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
          >
            길찾기
          </a>
        </div>
      </div>
    </div>
  );
}
