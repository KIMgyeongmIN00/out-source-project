import Modal from '@/components/layouts/modal/modal';
import { DELETE_PLAN_TEXT, EDIT_MODE, SHARE_PLAN_TEXT, UPDATE_PLAN_TEXT } from '@/constants/modal-constants';

export default function EditPlan({}) {
  function handleSharePlan(){};
  function handleUpdatePlan(){};
  function handleDeletePlan(){};

  return (
    <Modal
      mode={EDIT_MODE}
      shareText={SHARE_PLAN_TEXT}
      deleteText={DELETE_PLAN_TEXT}
      submitText={UPDATE_PLAN_TEXT}
      onShareClick={handleSharePlan}
      onDeleteClick={handleDeletePlan}
      onSubmitClick={handleUpdatePlan}
    />
  );
}
