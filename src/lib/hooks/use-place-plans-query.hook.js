import { useMutation, useQuery } from "@tanstack/react-query";

async function usePlansByAddress(address, userId) {
  const { data: plansByAddress, isLoading, error } = useQuery({
    queryKey: QueryKeys.PLANS_BY_ADDRESS(address),
    queryFn: ({ queryKey }) => fetchSharePlan(queryKey[1], userId),
    staleTime: QueryTime.THREE_MINUTE,
    cacheTime: QueryTime.TEN_MINUTE,
  })

  const deletePlansByAddressMutation = useMutation({
    mutationFn: (planId) => deleteData(planId),
    onSuccess: () => {
      Swal.fire({
        title: "성공",
        text: "수정이 완료 되었습니다.",
        icon: "success",
      });
      queryClient.invalidateQueries({ queryKey: QueryKeys.PLANS_BY_ADDRESS(address) });
    }
  });

  return { plansByAddress, isLoading, error, deletePlansByAddressMutation }
}
