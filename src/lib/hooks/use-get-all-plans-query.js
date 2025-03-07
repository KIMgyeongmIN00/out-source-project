import { useQuery } from '@tanstack/react-query';
import { supabase } from '../apis/supabase.api';
import { useAuthStore } from '@/stores/auth.store';
import { QueryKeys } from '@/constants/query-keys';

export default function useGetAllPlansQuery() {
  const user = useAuthStore((state) => state.user);

  async function getPlans() {
    const { data, error } = await supabase.from('plans').select('*').eq('user_id', user.id);
    if (error) {
      console.error(error);
    }
    return data || [];
  }

  const {
    data: plans,
    isPending,
    isError
  } = useQuery({
    queryKey: QueryKeys.QUERY_KEY_PLANS,
    queryFn: getPlans
  });

  return { plans, isPending, isError };
}
