import { useQuery } from "@tanstack/react-query";
import { fetchAllMyPlans, fetchMyPlansLimit } from "@api/plan.api";
import { useFetchAllPlansOnPage } from "./use-fetch-all-plans-on-page.hook";

export function usePlansQuery(userId, limit) {
  const shouldFetchAll = useFetchAllPlansOnPage("/profile");


  // 무한스크롤 기능 관련 요청때 마다 조금씩 fetch하는 infinitQuery
  const { // fetchNextPage = 다음 정보를 요청하는 함수, hasNextPage = 요청할 정보의 유무를 나타내는 boolean
    data: limitPlans, error: limitPlansError, isLoading: limitPlansLoading, fetchNextPage, hasNextPage,
  } = useInfiniteQuery({
    queryKey: QueryKeys.PLANS(userId),
    queryFn: async ({ pageParam = 0 }) => {
      const response = await fetchMyPlansLimit(userId, limit, pageParam);
      return response.data;
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < limit) return undefined; // 더 이상 데이터가 없으면 undefined 반환하여 더보기 버튼 비활성화
      return allPages.length * limit; // 다음 offset 계산
    },
    staleTime: QueryTime.TWO_MINUTE,
    cacheTime: QueryTime.FIVE_MINUTE,
  });

  // 가장 많이 방문한 장소 통계 낼때 사용할 모든 정보를 fetch하는 query
  const { data: allPlans, error: allPlansError, isLoading: allPlansLoading } = useQuery({
    queryKey: QueryKeys.ALLPLANS(userId),
    queryFn: async () => {
      const response = await fetchAllMyPlans(myId);
      return response.data;
    },
    enabled: shouldFetchAll, // URL 링크가 profile일 때만 실행
    staleTime: QueryTime.FIVE_MINUTE,
    cacheTime: QueryTime.TEN_MINUTE,
  });

  const { data: mostVisitedPlace } = () => {
    {
      if (!allPlans || allPlans.length === 0) {
        return [];
      }
      const countByPlan = allPlans.reduce((acc, plan) => {
        acc[plan.address] = (acc[plan.address] || 0) + 1;
        return acc;
      }, {});

      return Object.entries(countByPlan)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3);
    }
  }


  return {
    limitPlans, limitPlansError, limitPlansLoading, fetchNextPage, hasNextPage,
    allPlans, allPlansError, allPlansLoading, mostVisitedPlace
  }
}
