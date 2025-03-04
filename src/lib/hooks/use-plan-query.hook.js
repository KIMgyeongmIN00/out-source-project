import { useMutation, useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { deleteData } from "@api/plan.api";
import { useNavigate } from "react-router-dom"

export async function usePlanQuery(planId) {
  const navigate = useNavigate()

  const { data: plan, isLoading, error } = useQuery({
    queryKey: QueryKeys.PLAN(planId),
    queryFn: ({ queryKey }) => fetchSharePlan(queryKey[1]),
    staleTime: QueryTime.ONE_MINUTE,
    cacheTime: QueryTime.TEN_MINUTE,
  })

  const updatePlanMutation = useMutation({
    mutationFn: updateData(planId, dataToUpdate),
    onSuccess: () => {
      Swal.fire({
        title: "성공",
        text: "수정이 완료 되었습니다.",
        icon: "success",
      })
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.PLAN(planId) });
    }
  });

  const deletePlanMutation = useMutation({
    mutationFn: deleteData(id),
    onSuccess: () => {
      Swal.fire({
        title: "성공",
        text: "삭제가 완료 되었습니다.",
        icon: "success",
      }).then(navigate(-1));
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.PLAN(planId) });
    }
  });

  // 아직 공유 로직에 대해 잘 몰라 해당 기능은 못 넣었습니다...

  return { plan, isLoading, error, updatePlanMutation, deletePlanMutation }
}
