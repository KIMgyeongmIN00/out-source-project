import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../apis/supabase.api';
import sweetAlert from '../utils/sweet-alert.util';

export default function useUploadImageMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFnKey: ['profile-image'],
    mutationFn: async ({ image, userId }) => {
      try {
        const { error: uploadError } = supabase.storage.from('images').upload(`/profile/${image.name}`, image);
        if (uploadError) {
          if (uploadError.message.includes('already exists')) {
            sweetAlert.error('이미 업로드된 이미지입니다.');
            return;
          }
        }
        const profileImageURL = supabase.storage.from('images').getPublicUrl(`profile/${image.name}`).data.publicUrl;

        const { error: updateUrlError } = await supabase
          .from('users')
          .update({ profile_url: profileImageURL })
          .eq('id', userId);

        if (updateUrlError) {
          sweetAlert.error('프로필 이미지 URL 업데이트 중 오류가 발생했습니다.');
          return;
        }
        sweetAlert.success('업로드 완료');
      } catch (error) {
        sweetAlert.error('업로드 중 오류가 발생했습니다.');
        console.error(error);
      }
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['profile-image'] })
  });
}
