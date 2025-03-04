import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useAuthStore } from '@/stores/auth.store';
import sweetAlert from '@/lib/utils/sweet-alert.util';
import useUpdateProfileImageMutation from '@/lib/hooks/use-update-profile-image-mutation';
import useUpdateNicknameMutation from '@/lib/hooks/use-update-nickname-mutation';

export default function ProfileForm() {
  const [editMode, setEditMode] = useState(false);
  const [nickname, setNickname] = useState('');
  const [image, setImage] = useState(null);
  const user = useAuthStore((state) => state.user);

  const { mutate: updateProfileImage } = useUpdateProfileImageMutation();
  const { mutate: updateNickname } = useUpdateNicknameMutation();

  function handleSelectProfileImage(e) {
    const file = e.target.files[0];
    setImage(file);
  }

  function handleUpdateProfileImage(e) {
    e.preventDefault();

    updateProfileImage({ id: user.id, image });
  }

  function handleUpdateNickname(e) {
    e.preventDefault();

    if (!nickname.trim()) return sweetAlert.warn('닉네임을 입력해주세요.');

    if (nickname.length > 10) return sweetAlert.warn('닉네임은 10자 이하로 입력해주세요.');

    if (!nickname.match(/^[a-zA-Z가-힣0-9]+$/)) return sweetAlert.warn('닉네임은 영문, 한글, 숫자만 입력해주세요.');

    updateNickname({ id: user.id, nickname });
    sweetAlert.success('수정 완료');
    setEditMode((prev) => !prev);
  }

  function handleCancelUpdate() {
    setEditMode((prev) => !prev);
    setNickname(user.nickname);
    setImage(null);
  }

  return (
    <form onSubmit={handleUpdateNickname} className="flex flex-row justify-between items-center w-full gap-4">
      <div className="flex flex-row items-center gap-4 ml-5">
        <img
          src={user.profileUrl || '/default_profile.png'}
          alt="프로필 이미지"
          className="w-20 h-20 border-2 object-cover border-primary rounded-full"
        />
        <div>
          <p>반갑습니다</p>
          {editMode ? (
            <>
              <div className="flex flex-row items-center gap-2">
                <Input type="file" onChange={handleSelectProfileImage} required />
                <Button type="button" onClick={handleUpdateProfileImage}>
                  이미지 업로드
                </Button>
              </div>
              <Input
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="영문, 한글, 숫자로만 10자 이내로 입력해주세요."
                required
              />
            </>
          ) : (
            <p>{`${user.nickname} 님`}</p>
          )}
        </div>
      </div>
      {editMode ? (
        <div className="flex flex-row gap-2">
          <Button onClick={handleCancelUpdate}>수정 취소</Button>
          <Button type="submit">수정 완료</Button>
        </div>
      ) : (
        <Button onClick={() => setEditMode((prev) => !prev)}>프로필 수정</Button>
      )}
    </form>
  );
}
