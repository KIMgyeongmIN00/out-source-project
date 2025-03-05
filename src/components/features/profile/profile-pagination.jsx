import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination';
import { usePagePlans } from '@/lib/hooks/use-page-plans.hook';
import PlanCard from '@/components/ui/plan-card';
import { useState } from 'react';
import { useMapStore } from '@/stores/map.store';
import EditPlan from '@/components/features/modal/edit-modal';

export default function ProfilePagination() {
  const { data, isLoading, startPage, endPage, prefetchPage, setPage, setPageGroup, page, pageGroup, totalPages } =
    usePagePlans();

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const setTargetLocation = useMapStore((state) => state.setTargetLocation);

  function handlePlanUlClick(e) {
    const planCard = e.target.closest('li');

    if (planCard) {
      const planId = planCard.dataset.id;
      const plan = data.plans.find((p) => p.id === planId);

      if (plan) {
        setSelectedPlan(plan);
        setEditModalOpen(true);
        setTargetLocation(plan.lat, plan.lng);
      }
    }
  }

  return (
    <>
      <section className="flex flex-col h-full justify-between">
        <div className="flex flex-col justify-center">
          <h3 className="mb-4">지난 일정</h3>
          <div className="">
            <ul className="grid grid-cols-3 flex-row flex-wrap gap-4 w-full" onClick={handlePlanUlClick}>
              {isLoading || !data ? (
                <p>로딩 중...</p>
              ) : (
                data.plans.map((plan) => <PlanCard key={plan.id} plan={plan} />)
              )}
            </ul>
          </div>
        </div>
        {editModalOpen && <EditPlan plan={selectedPlan} open={editModalOpen} setOpen={setEditModalOpen} />}
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
