import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../apis/supabase.api';

export default function useUploadImageMutation(image, user) {
  const queryClient = useQueryClient();

  async function insertProfileImageURL() {
    const profileImageURL = supabase.storage.from('images').getPublicUrl(`profile/${image.name}`).data.publicUrl;
    const { error } = await supabase.from('users').update({ profile_url: profileImageURL }).eq('id', user.id);
    if (error) {
      alert('프로필 이미지 업로드 중 오류가 발생했습니다.');
      return;
    }
  }

  return useMutation({
    mutationFnKey: ['profile-image'],
    mutationFn: () => {
      const { error } = supabase.storage.from('images').upload(`/profile/${image.name}`, image);
      if (error) {
        if (error.message.includes('already exists')) {
          alert('이미 업로드된 이미지입니다.');
          return;
        }
      }
      alert('업로드 완료');
      insertProfileImageURL();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['profile-image'] })
  });
}
