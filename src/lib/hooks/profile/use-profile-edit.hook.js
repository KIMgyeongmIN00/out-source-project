import { useState } from 'react';
import { useAuthStore } from '@/stores/auth.store';
import sweetAlert from '@/lib/utils/sweet-alert.util';
import useUpdateProfileImageMutation from './use-update-profile-image-mutation';
import useUpdateNicknameMutation from './use-update-nickname-mutation';


export function useProfileEdit() {
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
    setEditMode(false);
  }

  function handleCancelUpdate() {
    setEditMode(false);
    setNickname(user.nickname);
    setImage(null);
  }

  return {
    editMode,
    setEditMode,
    nickname,
    setNickname,
    image,
    handleSelectProfileImage,
    handleUpdateProfileImage,
    handleUpdateNickname,
    handleCancelUpdate,
    user,
  };
}