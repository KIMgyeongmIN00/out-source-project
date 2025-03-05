import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import ModalPosition from '@/components/layouts/modal/modal-position';
import ModalTitle from '@/components/layouts/modal/modal-title';
import ModalDate from '@/components/layouts/modal/modal-date';
import ModalMemo from '@/components/layouts/modal/modal-memo';
import { DELETE_PLAN_TEXT, UPDATE_PLAN_TEXT } from '@/constants/modal-constants';
import { useEditPlan } from '@/lib/hooks/modal/use-edit-plan.hook';

export default function EditPlan({ plan, open, setOpen }) {
  const { formState, handleChange, handleUpdatePlan, handleDeletePlan } = useEditPlan(plan);

  const { title, date, memo } = formState;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-lg max-h-[500px] h-auto p-4 bg-card rounded-xl shadow-lg space-y-1 border border-border text-primary">
        <DialogHeader className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <DialogTitle className="text-lg font-semibold text-primary">일정 수정</DialogTitle>
            <DialogDescription />
          </div>
        </DialogHeader>

        <ModalPosition address={plan.address} />
        <ModalTitle title={title} onTitleChange={handleChange} />
        <ModalDate date={date} onDateChange={handleChange} />
        <ModalMemo memo={memo} onMemoChange={handleChange} />

        <DialogFooter className="flex justify-end gap-2 mt-2">
          <Button
            variant="destructive"
            className="flex items-center gap-1 px-3 py-1.5 text-sm"
            onClick={handleDeletePlan}
          >
            <Trash2 className="w-4 h-4" /> {DELETE_PLAN_TEXT}
          </Button>
          <Button
            className="bg-primary text-primary-foreground px-3 py-1.5 rounded-lg hover:bg-primary/90 text-sm"
            onClick={handleUpdatePlan}
          >
            {UPDATE_PLAN_TEXT}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
