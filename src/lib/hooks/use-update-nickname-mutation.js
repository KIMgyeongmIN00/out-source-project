import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../apis/supabase.api';
import sweetAlert from '../utils/sweet-alert.util';
import { useAuthStore } from '@/stores/auth.store';
import { QueryKeys } from '@/constants/query-keys';

export default function useUpdateNicknameMutation() {
  const queryClient = useQueryClient();
  const { setUser, user } = useAuthStore((state) => state);

  return useMutation({
    mutationFn: async ({ id, nickname }) => {
      const { data, error } = await supabase.from('users').update({ nickname }).eq('id', id).select().single();
      if (error) throw error;
      return data;
    },

    onSuccess: (data) => {
      setUser({ ...user, nickname: data.nickname });
      queryClient.invalidateQueries({ queryKey: QueryKeys.QUERY_KEY_USERS });
    },
    onError: (error) => {
      sweetAlert.error('닉네임 수정 중 오류가 발생했습니다.');
      console.error(error.message);
    }
  });
}
