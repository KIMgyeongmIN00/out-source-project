import Modal from '@/components/layouts/modal/modal';
import { MAKE_PLAN_TEXT, SET_MODE } from '@/constants/constants';

export default function MakePlan({}) {

  const handlePlanSubmit = () => {};

  return <Modal mode={SET_MODE} btn3Text={MAKE_PLAN_TEXT} onSubmitClick={handlePlanSubmit} />;
}
