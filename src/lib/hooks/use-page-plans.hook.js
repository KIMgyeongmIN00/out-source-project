import { QueryKeys } from "@/constants/query-key";
import { QueryTime } from "@/constants/query-time";
import { useAuthStore } from "@/stores/auth.store";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { fetchMyPlansLimit } from "../apis/plan.api";
import { PAGE_GROUP_SIZE, PAGE_SIZE } from "@/constants/page-constants";

export function usePagePlans() {

  const myId = useAuthStore((state) => state.user.id);
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [pageGroup, setPageGroup] = useState(0);

  // `useQuery`로 totalCount와 데이터 가져오기
  const { data, isLoading } = useQuery({
    queryKey: QueryKeys.PAGED_PLANS(page),
    queryFn: () => fetchMyPlansLimit(myId, PAGE_SIZE, (page - 1) * PAGE_SIZE),
    keepPreviousData: true,
    select: (data) => ({
      plans: data.data,
      totalCount: data.headers
    }),
    staleTime: QueryTime.TWO_MINUTE,
    cacheTime: QueryTime.FIVE_MINUTE
  });



  const totalCount = data?.totalCount['content-range']?.split('/')[1] || 0;
  const totalPages = totalCount ? Math.ceil(totalCount / PAGE_SIZE) : 1;

  const startPage = pageGroup * PAGE_GROUP_SIZE + 1;
  const endPage = Math.min(startPage + PAGE_GROUP_SIZE - 1, totalPages);

  // 페이지 데이터 미리 로딩하기
  const prefetchPage = (page) => {
    const queryKey = QueryKeys.PAGED_PLANS(page);

    // 이미 캐시에 데이터가 있는 경우 prefetch 실행 안 함
    if (!queryClient.getQueryData(queryKey)) {
      queryClient.prefetchQuery({
        queryKey,
        queryFn: () => fetchMyPlansLimit(myId, PAGE_SIZE, (page - 1) * PAGE_SIZE),
        staleTime: QueryTime.TWO_MINUTE,
        cacheTime: QueryTime.FIVE_MINUTE
      });
    }
  };

  return { data, isLoading, startPage, endPage, prefetchPage, setPage, setPageGroup, page, pageGroup, totalPages }
}