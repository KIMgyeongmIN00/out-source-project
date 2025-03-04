import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../apis/supabase.api';
import sweetAlert from '../utils/sweet-alert.util';

export default function useUpdateProfileMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ image, userId, nickname }) => {
      try {
        const { error: updateError } = await supabase.from('users').update({ nickname }).eq('id', userId);

        if (updateError) {
          sweetAlert.error('닉네임 업데이트 중 오류가 발생했습니다.');
          return;
        }

        await supabase.storage.from('images').upload(`/profile/${image.name}`, image);

        const profileImageURL = supabase.storage.from('images').getPublicUrl(`profile/${image.name}`).data.publicUrl;

        const { error: updateUrlError } = await supabase
          .from('users')
          .update({ profile_url: profileImageURL })
          .eq('id', userId);

        if (updateUrlError) {
          sweetAlert.error('프로필 이미지 URL 업데이트 중 오류가 발생했습니다.');
          return;
        }
        sweetAlert.success('프로필 수정 완료');
      } catch (error) {
        sweetAlert.error('프로필 수정 중 오류가 발생했습니다.');
        console.error(error);
      }
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] })
  });
}
