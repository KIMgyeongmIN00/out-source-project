import { useState } from 'react';
import { usePlanQuery } from '@/lib/hooks/use-handle-plans-query';
import { useAuthStore } from '@/stores/auth.store';
import useForm from '@hooks/useForm';

export const useEditPlan = (plan) => {
  const [open, setOpen] = useState(false);
  const userId = useAuthStore((state) => state.user.id);

  // Form 상태 관리
  const { formState, handleChange } = useForm({
    title: plan.title,
    date: plan.date,
    memo: plan.memo
  });

  // Plan 쿼리 훅
  const { updatePlanMutation, deletePlanMutation } = usePlanQuery(userId, plan.id);

  // 일정 업데이트 핸들러
  const handleUpdatePlan = (e) => {
    e.preventDefault();
    updatePlanMutation.mutate(formState);
    setOpen(false);
  };

  // 일정 삭제 핸들러
  const handleDeletePlan = (e) => {
    e.preventDefault();
    deletePlanMutation.mutate();
    setOpen(false);
  };

  return {
    open,
    setOpen,
    formState,
    handleChange,
    handleUpdatePlan,
    handleDeletePlan
  };
};
