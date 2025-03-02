import { useState } from 'react';

export default function useForm(initialState = {}) {
  const [formState, setFormState] = useState(initialState);

  // 일반 input 핸들러 (title, date, memo)
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  // 객체 상태(location) 업데이트 핸들러
  const updateField = (field, newData) => {
    setFormState((prev) => ({
      ...prev,
      [field]: { ...prev[field], ...newData }
    }));
  };

  const resetForm = () => {
    setFormState(initialState);
  };

  return { formState, onChangeHandler, updateField, resetForm };
}
