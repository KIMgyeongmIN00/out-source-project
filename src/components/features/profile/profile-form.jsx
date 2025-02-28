import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/lib/apis/supabase.api';
import { useState } from 'react';
import { useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/auth.store';

export default function ProfileForm() {
  const [editMode, setEditMode] = useState(false);
  const [nickname, setNickname] = useState('');
  const [userData, setUserData] = useState({});
  const queryClient = useQueryClient();

  // 로그인 기능 추가시 사용
  const isAuth = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    //  인증이 되었을 때만 유저 정보 가져오기
    if (isAuth) {
      const getUserInfo = async () => {
        try {
          const { data, error } = await supabase.from('users').select('*').eq('id', userData.id).single();
          setUserData(data);
          if (error) throw error;
        } catch (error) {
          console.error('유저 정보 가져오기 오류:', error);
        }
      };
      getUserInfo();
    }
  }, [userData.id]);

  const updateProfileMutation = useMutation({
    mutationFn: async () => {
      try {
        await supabase.from('users').update({ nickname }).eq('id', userData.id);
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
      if (!nickname.trim()) {
        alert('닉네임을 입력해주세요!!!');
        return;
      }

      if (nickname.length > 10) {
        alert('닉네임은 10자 이하로 입력해주세요.');
        return;
      }

      if (nickname.length < 1) {
        alert('닉네임을 입력해주세요.');
        return;
      }

      if (nickname.match(/^[a-zA-Z가-힣0-9]+$/)) {
        alert('닉네임은 영문, 한글, 숫자만 입력해주세요.');
        return;
      }

      updateProfileMutation.mutate({ nickname: userData.nickname });
      alert('수정완료');
      setEditMode(!editMode);
    } else {
      setEditMode(!editMode);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-row justify-between items-center w-full gap-4">
      <div className="flex flex-row items-center gap-4 ml-5">
        <img
          src="https://mblogthumb-phinf.pstatic.net/20150427_104/ninevincent_14301227921235lUld_JPEG/kakao_3.jpg?type=w420"
          alt="프로필 이미지"
          className="w-20 h-20 rounded-full"
        />
        <div>
          <p>반갑습니다</p>
          {editMode ? (
            <Input value={nickname} onChange={(e) => setNickname(e.target.value)} />
          ) : (
            <p>{`${userData.nickname} 님`}</p>
          )}
        </div>
      </div>
      {editMode ? <Button>수정완료</Button> : <Button>프로필 수정</Button>}
    </form>
  );
}
