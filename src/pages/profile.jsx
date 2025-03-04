import { MdOutlineAccessTime, MdOutlineLocationOn } from 'react-icons/md';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination';
import ProfileForm from '@/components/features/profile/profile-form';
import useGetAllPlansQuery from '@/lib/hooks/use-get-all-plans-query';
import useRankAddressUseQuery from '@/lib/hooks/use-rank-address-query';
import { usePagePlans } from '@/lib/hooks/use-page-plans.hook';

export default function Profile() {
  const { plans, isPending, isError } = useGetAllPlansQuery();
  const { topLocations } = useRankAddressUseQuery(plans);
  const { data, isLoading, startPage, endPage, prefetchPage, setPage, setPageGroup, page, pageGroup, totalPages } =
    usePagePlans();

  if (isPending) {
    return <div>계획 불러오는 중...</div>;
  }

  if (isError) {
    return <div>계획 불러오기 실패</div>;
  }
  return (
    <div className="flex flex-col items-center gap-4 h-full overflow-y-auto">
      <section className="flex flex-row border-2 border-primary rounded-lg w-full h-30 p-4">
        <ProfileForm />
      </section>
      <section className="flex flex-col border-2 border-primary rounded-lg p-4 w-full h-auto">
        <div className="flex flex-col">
          <h3 className="mb-4">일정 많이 등록한 장소 TOP3 (공동 순위일 경우, 먼저 생성된 항목을 우선)</h3>
          <ul className="grid grid-cols-3 justify-start flex-wrap gap-4">
            {topLocations.map(([address]) => {
              return (
                <li key={address} className="border-2 border-primary p-4 rounded-lg h-[60px]">
                  <p className="flex items-center gap-1">
                    <MdOutlineLocationOn />
                    {address}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
        <hr className="border-1 border-primary m-5" />
        <section className="flex flex-col h-full justify-between">
          <div className="flex flex-col justify-center">
            <h3 className="mb-4">지난 일정</h3>
            <div className="">
              <ul className="grid grid-cols-3 flex-row flex-wrap gap-4 w-full">
                {isLoading ? (
                  <p>Loading...</p>
                ) : (
                  data?.plans.map((plan) => {
                    return (
                      <li
                        key={plan.id}
                        className=" flex flex-col justify-between border-2 border-primary p-2 rounded-lg"
                      >
                        <p className="mb-1 font-semibold">{plan.title}</p>
                        <p className="flex items-center gap-1">
                          <MdOutlineAccessTime />
                          {plan.date}
                        </p>
                        <p className="flex items-center gap-1">
                          <MdOutlineLocationOn />
                          {plan.address}
                        </p>
                      </li>
                    );
                  })
                )}
              </ul>
            </div>
          </div>
          <Pagination>
            <PaginationContent className="pt-4">
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setPageGroup((prev) => Math.max(prev - 1, 0))}
                  disabled={pageGroup === 0}
                />
              </PaginationItem>
              <PaginationItem>
                {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((pageNum) => (
                  <PaginationLink
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    onMouseEnter={() => prefetchPage(pageNum)} // 마우스 호버 시 미리 로드
                    className={page === pageNum ? 'active' : ''}
                  >
                    {pageNum}
                  </PaginationLink>
                ))}
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  onClick={() => setPageGroup((prev) => (endPage < totalPages ? prev + 1 : prev))}
                  disabled={endPage >= totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </section>
      </section>
    </div>
  );
}
