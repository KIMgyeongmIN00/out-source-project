import { useState } from 'react';
import { signIn } from '@/lib/apis/auth.api';
import sweetAlert from '@/lib/utils/sweet-alert.util';

export default function useSignInForm() {
  const [errorMessages, setErrorMessages] = useState({
    email: { name: '이메일', message: '' },
    password: { name: '비밀번호', message: '' }
  });

  function handleBlurEvent(e) {
    const { name, value } = e.target;
    if (value !== '' && errorMessages[name].message !== '')
      setErrorMessages((prev) => ({ ...prev, [name]: { ...prev[name], message: '' } }));
    if (value === '' && errorMessages[name].message === '')
      setErrorMessages((prev) => ({ ...prev, [name]: { ...prev[name], message: '필수 입력 정보입니다.' } }));
  }

  function isInvalidForm(formData) {
    const invalidEntry = Object.entries(formData).find(([, value]) => value === '');
    return invalidEntry ? invalidEntry[0] : null;
  }

  async function handleSubmitEvent(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const formData = {
      email: form.get('email'),
      password: form.get('password')
    };

    const invalidField = isInvalidForm(formData);
    if (invalidField) {
      return setErrorMessages((prev) => ({
        ...prev,
        [invalidField]: { ...prev[invalidField], message: '필수 입력 정보입니다.' }
      }));
    }

    const { error } = await signIn(formData);
    if (error) sweetAlert.error('로그인 실패', '이메일 또는 비밀번호가 틀렸습니다.');
  }

  return { errorMessages, handleBlurEvent, handleSubmitEvent };
}
