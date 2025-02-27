import { useState } from 'react';

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

  function handleSubmitEvent(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const formData = {
      id: form.get('id'),
      password: form.get('password')
    };

    const invalidField = isInvalidForm(formData);
    if (invalidField) {
      return setErrorMessages((prev) => ({
        ...prev,
        [invalidField]: { ...prev[invalidField], message: '필수 입력 정보입니다.' }
      }));

      // TODO: 로그인 api 연결
    }
  }

  return { errorMessages, handleBlurEvent, handleSubmitEvent };
}
