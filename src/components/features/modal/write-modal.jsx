import Modal from '@/components/layouts/modal/modal';
import { MAKE_PLAN_TEXT, SET_MODE } from '@/constants/modal-constants';

export default function MakePlan() {

  function handlePlanSubmit(){};

  return <Modal mode={SET_MODE} btn3Text={MAKE_PLAN_TEXT} onSubmitClick={handlePlanSubmit} />;
}
