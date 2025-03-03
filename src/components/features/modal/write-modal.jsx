import Modal from '@/components/layouts/modal/modal';
import { MAKE_PLAN_TEXT, SET_MODE } from '@/constants/modal-constants';
import { useEffect } from 'react';

export default function MakePlan({ Fulladdress}) {
  function handlePlanSubmit(e, formData) {
    console.log(formData);
  }

  return <Modal mode={SET_MODE} Fulladdress={Fulladdress} submitText={MAKE_PLAN_TEXT} onSubmitClick={handlePlanSubmit} />;
}
