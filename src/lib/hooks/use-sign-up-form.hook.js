import authValidate from '@/lib/utils/auth-validate.util';
import { useState } from 'react';

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

  function handleSubmitEvent(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const formData = {
      id: form.get('id'),
      password: form.get('password'),
      nickname: form.get('nickname')
    };

    const invalidField = authValidate.checkInvalidForm(formData);
    if (invalidField) return setErrorMessage();

    // TODO: 회원가입 api 연결
  }

  return { errorMessages, handleBlurEvent, handleSubmitEvent };
}
