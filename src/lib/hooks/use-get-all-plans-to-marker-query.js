import { useQuery } from '@tanstack/react-query';
import { QueryKeys, QueryTime } from '@/constants/query-keys';
import { fetchAllMyPlans } from '../apis/plan.api';

export default function useGetAllPlansToMarKerQuery(userId) {
  const {
    data: allPlans,
    error: allPlansError,
    isLoading: allPlansLoading
  } = useQuery({
    queryKey: QueryKeys.ALLPLANS(userId),
    queryFn: async () => {
      const response = await fetchAllMyPlans(userId);
      return response.data;
    },
    staleTime: QueryTime.FIVE_MINUTE,
    cacheTime: QueryTime.TEN_MINUTE,
    enabled: Boolean(userId) // userId가 있을 때만 쿼리 실행
  });

  return { allPlans, allPlansError, allPlansLoading };
}
