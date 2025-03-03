import { useQuery } from '@tanstack/react-query';

export default function useRankTopAddressUseQuery(plans) {
  const { data: topLocations = [] } = useQuery({
    queryKey: ['topLocations', plans],
    queryFn: () => {
      const countByPlan = plans.reduce((acc, plan) => {
        acc[plan.address] = (acc[plan.address] || 0) + 1;
        return acc;
      }, {});

      return Object.entries(countByPlan)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3);
    }
  });

  return { topLocations };
}
