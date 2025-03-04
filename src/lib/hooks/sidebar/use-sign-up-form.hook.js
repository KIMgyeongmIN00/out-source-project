import { useState } from 'react';
import { signUp } from '@/lib/apis/auth.api';
import authValidate from '@/lib/utils/auth-validate.util';
import sweetAlert from '@/lib/utils/sweet-alert.util';

export default function useSignUpForm() {
  const [errorMessages, setErrorMessages] = useState({
    email: { name: '이메일', message: '' },
    password: { name: '비밀번호', message: '' },
    nickname: { name: '닉네임', message: '' }
  });

  function handleBlurEvent(e) {
    const { name, value } = e.target;
    const isValidValue = authValidate.checkValidValue(name, value);
    const errorMessage = authValidate.getErrorMessage(name);

    if (isValidValue && errorMessages[name].message !== '')
      return setErrorMessages((prev) => ({ ...prev, [name]: { ...prev[name], message: '' } }));
    if (!isValidValue && errorMessages[name].message === '')
      return setErrorMessages((prev) => ({ ...prev, [name]: { ...prev[name], message: errorMessage } }));
  }

  function setErrorMessage(invalidField) {
    const errorMessage = authValidate.getErrorMessage(invalidField);
    setErrorMessages((prev) => ({
      ...prev,
      [invalidField]: { ...prev[invalidField], message: errorMessage }
    }));
  }

  async function handleSubmitEvent(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const formData = {
      email: form.get('email'),
      password: form.get('password'),
      nickname: form.get('nickname')
    };

    const invalidField = authValidate.checkInvalidForm(formData);
    if (invalidField) return setErrorMessage();

    const { error } = await signUp(formData);
    if (error && error.code === 'user_already_exists') return sweetAlert.error('회원가입 실패', '중복된 이메일입니다.');
    else if (error) return sweetAlert.error('회원가입 실패', error.message);
  }

  return { errorMessages, handleBlurEvent, handleSubmitEvent };
}
