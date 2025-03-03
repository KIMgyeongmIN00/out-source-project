import Modal from '@/components/layouts/modal/modal';
import { MAKE_PLAN_TEXT, SET_MODE } from '@/constants/modal-constants';
import { createData } from '@/lib/apis/plan.api';
import { useAuthStore } from '@/stores/auth.store';
import { useEffect } from 'react';

export default function MakePlan({ Fulladdress }) {
  const userId = useAuthStore((state) => state.user.id); // 유저정보:id가져오기
  async function handlePlanSubmit(e, formData) {
    createData({ ...formData, address: Fulladdress, user_id: userId }); //DB에 일정 추가하는 로직
  }

  return (
    <Modal mode={SET_MODE} Fulladdress={Fulladdress} submitText={MAKE_PLAN_TEXT} onSubmitClick={handlePlanSubmit} />
  );
}
