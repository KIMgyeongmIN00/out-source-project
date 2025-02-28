import Modal from '@/components/layouts/modal/modal';
import { DELETE_PLAN_TEXT, EDIT_MODE, SHARE_PLAN_TEXT, UPDATE_PLAN_TEXT } from '@/constants/constants';

export default function EditPlan({}) {
  const handleSharePlan = () => {};
  const handleUpdatePlan = () => {};
  const handleDeletePlan = () => {};

  return (
    <Modal
      mode={EDIT_MODE}
      btn1Text={SHARE_PLAN_TEXT}
      btn2Text={DELETE_PLAN_TEXT}
      btn3Text={UPDATE_PLAN_TEXT}
      onShareClick={handleSharePlan}
      onDeleteClick={handleDeletePlan}
      onSubmitClick={handleUpdatePlan}
    />
  );
}
