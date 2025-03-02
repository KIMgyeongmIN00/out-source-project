import Modal from '@/components/layouts/modal/modal';
import { MAKE_PLAN_TEXT, SET_MODE } from '@/constants/modal-constants';
import { useEffect } from 'react';

export default function MakePlan({ fullAddress }) {
  function handlePlanSubmit() {}
  useEffect(() => {
    console.log('!!', fullAddress);
  }, [fullAddress]);

  return <Modal mode={SET_MODE} faddress={fullAddress} submitText={MAKE_PLAN_TEXT} onSubmitClick={handlePlanSubmit} />;
}
