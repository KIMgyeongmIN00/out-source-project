import { QueryKeys } from '@/constants/query-keys';
import { fetchUpcomingPlans } from '@/lib/apis/plan.api';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

export default function useGetUpcomingPlansQuery(userId, limit = 2) {
  const {
    data: { pages },
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useSuspenseInfiniteQuery({
    queryKey: QueryKeys.INFINITY_UPCOMING_PLANS,
    queryFn: async ({ pageParam }) => {
      const response = await fetchUpcomingPlans(userId, pageParam, limit);
      const plans = response.data.map(({ created_at, user_id, ...rest }) => ({
        ...rest,
        userId: user_id,
        createdAt: created_at
      }));

      const hasMore = plans.length === limit;

      return { plans, nextPage: hasMore ? pageParam + 1 : undefined };
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage
  });

  return { pages, fetchNextPage, hasNextPage, isFetchingNextPage };
}
