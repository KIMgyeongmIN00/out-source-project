export const QueryKeys = {
  PLAN: (planId) => ['plan', planId],
  PLANS: (userId) => ['plans', userId],
  PLANS_IN_PAGE: () => ['plansInPage', page],
  ALLPLANS: (userId) => ['allPlans', userId],
  PLANS_BY_ADDRESS: (address) => ['plansByAddress', address],
  PROFILE: ['profile'],
  PAGED_PLANS: (page) => ['pagedPlans', page]
}
