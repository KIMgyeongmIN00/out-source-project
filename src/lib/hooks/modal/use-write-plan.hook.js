import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/auth.store';
import { createData } from '@/lib/apis/plan.api';
import { QueryKeys } from '@/constants/query-keys';
import Swal from 'sweetalert2';
import useForm from '@hooks/useForm';

export const useMakePlan = (fullAddress, center) => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const userId = useAuthStore((state) => state.user.id);

  // Form 상태 관리
  const { formState, handleChange, resetForm } = useForm({
    title: '',
    date: '',
    memo: ''
  });

  // 일정 생성 핸들러
  const handlePlanSubmit = async (e) => {
    e.preventDefault();
    try {
      await createData({
        ...formState,
        address: fullAddress,
        user_id: userId,
        ...center
      });

      Swal.fire({
        title: '성공',
        text: '일정 등록이 완료되었습니다.',
        icon: 'success'
      });

      queryClient.invalidateQueries({ queryKey: QueryKeys.ALLPLANS(userId) });
      resetForm();
      setOpen(false);
    } catch (error) {
      Swal.fire({
        title: '오류',
        text: '일정 등록에 실패했습니다.',
        icon: 'error'
      });
    }
  };

  return {
    open,
    setOpen,
    formState,
    handleChange,
    handlePlanSubmit
  };
};
