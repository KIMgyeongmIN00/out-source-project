import { useState } from 'react';

export default function useForm(initialState = {}) {
  const [formState, setFormState] = useState(initialState);

  // 일반 input 핸들러 (title, date, memo)
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };


  const resetForm = () => {
    setFormState(initialState);
  };

  return { formState, handleChange, resetForm };
}
