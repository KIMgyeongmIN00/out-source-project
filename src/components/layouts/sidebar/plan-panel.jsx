import { Fragment, useCallback, useRef } from 'react';
import PlanCard from '@/components/layouts/sidebar/plan-card';
import useGetUpcomingPlansQuery from '@/lib/hooks/use-get-upcoming-plans-query.hook';

export default function PlanPanel({ id }) {
  const { pages, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetUpcomingPlansQuery(id);

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

  return (
    <section className="flex-1 flex flex-col overflow-hidden rounded-lg">
      <h3 className="font-bold text-xl mb-2">일정</h3>
      {!pages || pages.length === 0 ? (
        <p className="text-center py-4">일정이 없습니다!</p>
      ) : (
        <div className="flex-1 overflow-hidden bg-gradient-to-t from-primary/30 via-transparent via-20% to-transparent">
          <ul className="h-full overflow-y-scroll">
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
    </section>
  );
}
