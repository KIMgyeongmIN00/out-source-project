import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useAuthStore } from '@/stores/auth.store';
import useUpdateProfileMutation from '@/lib/hooks/use-update-profile-mutation';
import useUploadImageMutation from '@/lib/hooks/use-upload-image-mutation';
import sweetAlert from '@/lib/utils/sweet-alert.util';

export default function ProfileForm() {
  const [editMode, setEditMode] = useState(false);
  const [nickname, setNickname] = useState('');
  const [image, setImage] = useState(null);
  const user = useAuthStore((state) => state.user);

  const { mutate: updateProfile } = useUpdateProfileMutation();
  const { mutate: uploadProfileImage } = useUploadImageMutation();

  function handleImageChange(e) {
    const file = e.target.files[0];
    setImage(file);
  }

  function handleUploadFile() {
    if (!image) {
      sweetAlert.error('업로드할 이미지를 선택해주세요.');
      return;
    }
    uploadProfileImage({ image, userId: user.id });
  }

  function handleCancelUpdate() {
    setEditMode((prev) => !prev);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editMode) {
      if (!nickname.trim()) return sweetAlert.warn('닉네임을 입력해주세요.');

      if (nickname.length > 10) return sweetAlert.warn('닉네임은 10자 이하로 입력해주세요.');

      if (!nickname.match(/^[a-zA-Z가-힣0-9]+$/)) return sweetAlert.warn('닉네임은 영문, 한글, 숫자만 입력해주세요.');

      updateProfile({ id: user.id, nickname });
      sweetAlert.success('수정완료');
    }
    setEditMode((prev) => !prev);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-row justify-between items-center w-full gap-4">
      <div className="flex flex-row items-center gap-4 ml-5">
        <img
          src={user.profileUrl}
          alt="프로필 이미지"
          className="w-20 h-20 border-2 object-cover border-primary rounded-full"
        />
        <div>
          <p>반갑습니다</p>
          {editMode ? (
            <>
              <div className="flex flex-row items-center gap-2">
                <Input type="file" onChange={handleImageChange} required />
                <Button type="button" onClick={handleUploadFile}>
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
          <Button>수정 완료</Button>
        </div>
      ) : (
        <Button>프로필 수정</Button>
      )}
    </form>
  );
}
