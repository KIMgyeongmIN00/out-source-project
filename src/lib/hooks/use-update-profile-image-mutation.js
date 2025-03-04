import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../apis/supabase.api';
import sweetAlert from '../utils/sweet-alert.util';
import { useAuthStore } from '@/stores/auth.store';
import { QueryKeys } from '@/constants/query-keys';

export default function useUpdateProfileImageMutation() {
  const queryClient = useQueryClient();
  const { setUser, user } = useAuthStore((state) => state);

  return useMutation({
    mutationFn: async ({ id, image }) => {
      try {
        const { error: uploadError } = await supabase.storage.from('images').upload(`/profile/${image.name}`, image);
        if (uploadError) {
          throw new Error('프로필 이미지 업로드 중 오류가 발생했습니다.');
        }
        const profileImageURL = supabase.storage.from('images').getPublicUrl(`profile/${image.name}`).data.publicUrl;

        const { error: updateUrlError } = await supabase
          .from('users')
          .update({ profile_url: profileImageURL })
          .eq('id', id)
          .select()
          .single();
        if (updateUrlError) {
          throw new Error('프로필 이미지 URL 업데이트 중 오류가 발생했습니다.');
        }
        return profileImageURL;
      } catch (error) {
        sweetAlert.error('프로필 이미지 업로드 중 오류가 발생했습니다.');
        console.error(error.message);
      }
    },
    onSuccess: (profileImageURL) => {
      setUser({ ...user, profileUrl: profileImageURL });
      queryClient.invalidateQueries({ queryKey: QueryKeys.QUERY_KEY_USERS });
    },
    onError: (error) => {
      sweetAlert.error('프로필 이미지 업로드 중 오류가 발생했습니다.');
      console.error(error.message);
    }
  });
}
