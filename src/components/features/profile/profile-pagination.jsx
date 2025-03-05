import { MdOutlineAccessTime, MdOutlineLocationOn } from 'react-icons/md';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination';
import { usePagePlans } from '@/lib/hooks/use-page-plans.hook';

export default function ProfilePagination() {
  const { data, isLoading, startPage, endPage, prefetchPage, setPage, setPageGroup, page, pageGroup, totalPages } =
    usePagePlans();

  return (
    <>
      <section className="flex flex-col h-full justify-between">
        <div className="flex flex-col justify-center">
          <h3 className="mb-4">지난 일정</h3>
          <div className="">
            <ul className="grid grid-cols-3 flex-row flex-wrap gap-4 w-full">
              {isLoading ? (
                <p>로딩 중...</p>
              ) : (
                data?.plans
                  .sort((a, b) => new Date(b.date) - new Date(a.date))
                  .map((plan) => {
                    const trimedData = plan.date.replace('T', ' ');
                    return (
                      <li
                        key={plan.id}
                        className=" flex flex-col justify-between border-2 border-primary p-2 rounded-lg"
                      >
                        <p className="mb-1 font-semibold">{plan.title}</p>
                        <p className="flex items-center gap-1">
                          <MdOutlineAccessTime />
                          {trimedData}
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
    </>
  );
}
