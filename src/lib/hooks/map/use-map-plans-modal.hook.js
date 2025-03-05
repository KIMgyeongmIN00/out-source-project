import { QueryKeys } from '@/constants/query-keys';
import { fetchSharePlan } from '@/lib/apis/plan.api';
import { formatPlanDate } from '@/lib/utils/date-trim.utill';
import { useQuery } from '@tanstack/react-query';

export default function usePlanMarker(planId) {
  const { data: markedData, isLoading } = useQuery({
    queryKey: QueryKeys.PINNED_PLAN(planId),
    queryFn: () => fetchSharePlan(planId)
  });

  const nowPlanDate =
    Array.isArray(markedData?.data) && markedData.data.length > 0 && markedData.data[0].date
      ? formatPlanDate(markedData.data[0].date)
      : '';

  return { markedData, nowPlanDate, isLoading };
}
