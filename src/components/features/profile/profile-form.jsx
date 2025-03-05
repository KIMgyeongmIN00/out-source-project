import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useProfileEdit } from '@/lib/hooks/profile/use-profile-edit.hook';

export default function ProfileForm() {
  const {
    editMode,
    setEditMode,
    nickname,
    setNickname,
    image,
    handleSelectProfileImage,
    handleUpdateProfileImage,
    handleUpdateNickname,
    handleCancelUpdate,
    user
  } = useProfileEdit();

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
        <Button onClick={() => setEditMode(true)}>프로필 수정</Button>
      )}
    </form>
  );
}
