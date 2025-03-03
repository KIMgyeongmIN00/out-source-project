import { useKakaoAddressQuery } from '@/lib/apis/map.api';
import { useMapStore } from '@/stores/map.store';
import { X } from 'lucide-react';

export function MapModal({ onCloseModal }) {
  const { center } = useMapStore();

  const {
    data: addressData,
    isLoading: addressLoading,
    error: addressError
  } = useKakaoAddressQuery(center.lat, center.lng);

  const locationName =
    addressData?.documents[0]?.road_address?.building_name ||
    addressData?.documents[0]?.address?.address_name ||
    '주소 정보 없음';

  const fullAddress = addressData?.documents[0]?.address?.address_name || '상세 주소 정보 없음';

  return (
    <div className="absolute left-20 transform -translate-x-1/2 -top-34 w-80 bg-white shadow-lg rounded-lg border border-gray-200 overflow-hidden z-50">
      <div className="w-full py-3 px-4 bg-white border-b border-gray-200 flex items-center justify-between">
        <h3 className="text-base font-semibold text-gray-800 truncate max-w-[85%]">
          {addressLoading ? (
            <span className="text-gray-500">주소를 불러오는 중...</span>
          ) : addressError ? (
            <span className="text-red-500">주소 불러오기 실패</span>
          ) : (
            locationName
          )}
        </h3>
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
          <div className="text-sm font-medium text-gray-700 mb-1">주소:</div>
          <div className="text-sm text-gray-600">{fullAddress}</div>
        </div>

        <div className="flex justify-between mt-4">
          <a
            href={`https://map.kakao.com/link/map/${encodeURIComponent(locationName)},${center.lat},${center.lng}`}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
          >
            큰지도보기
          </a>
          <a
            href={`https://map.kakao.com/link/to/${encodeURIComponent(locationName)},${center.lat},${center.lng}`}
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
