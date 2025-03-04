export const QueryKeys = {
  INFINITY_UPCOMING_PLANS: ['infinity-upcoming-plans'],
  PLAN: (planId) => ['plan', planId],
  ALLPLANS: (userId) => ['allPlans', userId]
};
export const QueryTime = {
  ONE_MINUTE: 1000 * 60,
  FIVE_MINUTE: 1000 * 300,
  TEN_MINUTE: 1000 * 600
};
