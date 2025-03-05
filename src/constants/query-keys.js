export const QueryKeys = {
  INFINITY_UPCOMING_PLANS: ['infinity-upcoming-plans'],
  QUERY_KEY_USERS: ['users'],
  QUERY_KEY_PLANS: ['plans'],
  PLAN: (planId) => ['plan', planId],
  ALL_PLANS: (userId) => ['all-plans', userId],
  PAGED_PLANS: (page) => ['paged-plans', page],
  PINNED_PLAN: (planId) => ['pinned-plan', planId]
};
