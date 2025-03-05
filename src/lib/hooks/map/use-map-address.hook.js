import { useKakaoAddressQuery } from '@/lib/apis/map.api';
import { useMapStore } from '@/stores/map.store';
import { useAuthStore } from '@/stores/auth.store';

export function useMapAddress() {
  const center = useMapStore((state) => state.center);
  const selectedAddress = useMapStore((state) => state.selectedAddress);
  const toggleInfoWindow = useMapStore((state) => state.toggleInfoWindow);
  const isAuth = useAuthStore((state) => state.isAuthenticated);

  const {
    data: addressData,
    isLoading: addressLoading,
    error: addressError
  } = useKakaoAddressQuery(center?.lat, center?.lng);

  const locationName =
    selectedAddress?.place ||
    addressData?.documents?.[0]?.road_address?.building_name ||
    addressData?.documents?.[0]?.address?.address_name ||
    '주소 정보 없음';

  const fullAddress =
    selectedAddress?.address ||
    addressData?.documents?.[0]?.road_address?.address_name ||
    addressData?.documents?.[0]?.address?.address_name ||
    '상세 주소 정보 없음';

  return {
    center,
    locationName,
    fullAddress,
    addressLoading,
    addressError,
    toggleInfoWindow,
    isAuth
  };
}
