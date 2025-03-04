import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { deleteData, updateData } from '@api/plan.api';
import { QueryKeys, QueryTime } from '@/constants/query-keys';

export function usePlanQuery(userId, planId) {
  const queryClient = useQueryClient();

  const {
    data: plan,
    isLoading,
    error
  } = useQuery({
    queryKey: QueryKeys.PLAN(planId),
    queryFn: () => fetchSharePlan(planId),
    staleTime: QueryTime.ONE_MINUTE,
    cacheTime: QueryTime.TEN_MINUTE
  });

  const updatePlanMutation = useMutation({
    mutationFn: (dataToUpdate) => updateData(planId, dataToUpdate),
    onSuccess: () => {
      Swal.fire({
        title: '성공',
        text: '수정이 완료 되었습니다.',
        icon: 'success'
      });
      queryClient.invalidateQueries({ queryKey: QueryKeys.PLAN(planId) });

      queryClient.invalidateQueries({ queryKey: ['position'] });
    }
  });

  const deletePlanMutation = useMutation({
    mutationFn: () => deleteData(planId),
    onSuccess: () => {
      Swal.fire({
        title: '성공',
        text: '삭제가 완료 되었습니다.',
        icon: 'success'
      });
      queryClient.invalidateQueries({ queryKey: QueryKeys.PLAN(planId) });
      // 전체 플랜 목록 쿼리도 무효화하여 업데이트
      queryClient.invalidateQueries({ queryKey: QueryKeys.ALLPLANS(userId) });
      queryClient.invalidateQueries({ queryKey: ['position'] });
    }
  });

  return { plan, isLoading, error, updatePlanMutation, deletePlanMutation };
}
