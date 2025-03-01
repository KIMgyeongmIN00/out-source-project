import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/lib/apis/supabase.api';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/auth.store';

export default function ProfileForm() {
  const [editMode, setEditMode] = useState(false);
  const [nickname, setNickname] = useState('');
  const queryClient = useQueryClient();

  const user = useAuthStore((state) => state.user);

  const updateProfileMutation = useMutation({
    mutationFn: async () => {
      try {
        await supabase.from('users').update({ nickname }).eq('id', user.id);
      } catch (error) {
        console.error('유저 정보 수정 오류:', error);
        alert('수정 실패');
      }
    },
    onSuccess: queryClient.invalidateQueries({ queryKey: ['users'] })
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editMode) {
      if (!nickname.trim()) return alert('닉네임을 입력해주세요.');

      if (nickname.length > 10) return alert('닉네임은 10자 이하로 입력해주세요.');

      if (nickname.length < 1) return alert('닉네임을 입력해주세요.');

      if (!nickname.match(/^[a-zA-Z가-힣0-9]+$/)) return alert('닉네임은 영문, 한글, 숫자만 입력해주세요.');

      updateProfileMutation.mutate({ nickname: user.nickname });
      alert('수정완료');
      setEditMode(!editMode);
    }
    setEditMode((prev) => !prev);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-row justify-between items-center w-full gap-4">
      <div className="flex flex-row items-center gap-4 ml-5">
        <img src="/public/default_profile.png" alt="프로필 이미지" className="w-20 h-20 rounded-full" />
        <div>
          <p>반갑습니다</p>
          {editMode ? (
            <Input value={nickname} onChange={(e) => setNickname(e.target.value)} />
          ) : (
            <p>{`${user.nickname} 님`}</p>
          )}
        </div>
      </div>
      {editMode ? <Button>수정완료</Button> : <Button>프로필 수정</Button>}
    </form>
  );
}
