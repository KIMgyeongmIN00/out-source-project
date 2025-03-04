import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../apis/supabase.api';
import sweetAlert from '../utils/sweet-alert.util';

export default function useUpdateProfileMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ image, userId, nickname }) => {
      const { error: imageUploadError } = await supabase.storage.from('images').upload(`/profile/${image.name}`, image);
      if (imageUploadError) {
        sweetAlert.error('프로필 이미지 업로드 중 오류가 발생했습니다.');
        return;
      }

      const profileImageURL = supabase.storage.from('images').getPublicUrl(`profile/${image.name}`).data.publicUrl;

      const { error: updateImageUrlError } = await supabase
        .from('users')
        .update({ profile_url: profileImageURL })
        .eq('id', userId);
      if (updateImageUrlError) {
        sweetAlert.error('프로필 이미지 URL업데이트 중 오류가 발생했습니다.');
      }

      const { error: updateNicknameError } = await supabase.from('users').update({ nickname }).eq('id', userId);
      if (updateNicknameError) {
        sweetAlert.error('프로필 수정 중 오류가 발생했습니다.');
        return;
      }

      sweetAlert.success('프로필 수정 완료');
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] })
  });
}
