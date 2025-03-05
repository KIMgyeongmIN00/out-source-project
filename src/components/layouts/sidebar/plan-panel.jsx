import { Fragment, useCallback, useRef } from 'react';
import PlanCard from '@/components/layouts/sidebar/plan-card';
import useGetUpcomingPlansQuery from '@/lib/hooks/sidebar/use-get-upcoming-plans-query.hook';
import { useMapStore } from '@/stores/map.store';
import { useState } from 'react';
import EditPlan from '@/components/features/modal/edit-modal';

export default function PlanPanel({ userId }) {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const { pages, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetUpcomingPlansQuery(userId);
  const setTargetLocation = useMapStore((state) => state.setTargetLocation);

  const observerRef = useRef(null);
  const lastPlanCardRef = useCallback(
    (node) => {
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      });
      if (node) observerRef.current.observe(node);
    },
    [hasNextPage, isFetchingNextPage, fetchNextPage]
  );

  function handlePlanUlClick(e) {
    const planCard = e.target.closest('li');

    if (planCard) {
      const planId = planCard.dataset.id;
      const plan = pages.flatMap((page) => page.plans).find((p) => p.id === planId);

      if (plan) {
        setSelectedPlan(plan);
        setEditModalOpen(true);
        setTargetLocation(plan.lat, plan.lng);
      }
    }
  }

  return (
    <section className="flex-1 flex flex-col overflow-hidden rounded-lg">
      <h3 className="font-bold text-xl mb-2">일정</h3>
      {!pages || pages.length === 0 ? (
        <p className="text-center py-4">일정이 없습니다!</p>
      ) : (
        <div className="flex-1 overflow-hidden bg-gradient-to-t from-primary/30 via-transparent via-20% to-transparent">
          <ul className="h-full overflow-y-scroll" onClick={handlePlanUlClick}>
            {pages.map((page, pageIdx) => (
              <Fragment key={pageIdx}>
                {page.plans.map((plan, idx) => {
                  if (pageIdx === pages.length - 1 && idx === page.plans.length - 1)
                    return <PlanCard key={plan.id} plan={plan} ref={lastPlanCardRef} />;
                  return <PlanCard key={plan.id} plan={plan} />;
                })}
              </Fragment>
            ))}
          </ul>
        </div>
      )}
      {editModalOpen && <EditPlan plan={selectedPlan} open={editModalOpen} setOpen={setEditModalOpen} />}
    </section>
  );
}
