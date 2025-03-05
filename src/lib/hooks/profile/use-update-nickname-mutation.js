import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/auth.store';
import { QueryKeys } from '@/constants/query-keys';
import { supabase } from '@/lib/apis/supabase.api';
import sweetAlert from '@/lib/utils/sweet-alert.util';

export default function useUpdateNicknameMutation() {
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: async ({ id, nickname }) => {
      const { data, error } = await supabase.from('users').update({ nickname }).eq('id', id).select().single();
      if (error) sweetAlert.error('닉네임 수정 중 오류가 발생했습니다.');
      return data;
    },

    onSuccess: (data) => {
      setUser({ ...user, nickname: data.nickname });
      queryClient.invalidateQueries({ queryKey: QueryKeys.QUERY_KEY_USERS });
    }
  });
}
