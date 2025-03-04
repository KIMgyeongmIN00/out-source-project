import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import ModalPosition from '@/components/layouts/modal/modal-position';
import ModalTitle from '@/components/layouts/modal/modal-title';
import ModalDate from '@/components/layouts/modal/modal-date';
import ModalMemo from '@/components/layouts/modal/modal-memo';
import { MAKE_PLAN_TEXT } from '@/constants/modal-constants';
import { useMakePlan } from '@/lib/hooks/modal/use-write-plan.hook';

export default function MakePlan({ fullAddress, center }) {
  const {
    open,
    setOpen,
    formState: { title, date, memo },
    handleChange,
    handlePlanSubmit
  } = useMakePlan(fullAddress, center);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          일정 추가
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg max-h-[500px] h-auto p-4 bg-card rounded-xl shadow-lg space-y-1 border border-border text-primary">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-primary">일정 생성</DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <ModalPosition address={fullAddress} />
        <ModalTitle title={title} onTitleChange={handleChange} />
        <ModalDate date={date} onDateChange={handleChange} />
        <ModalMemo memo={memo} onMemoChange={handleChange} />

        <DialogFooter className="flex justify-end gap-2 mt-2">
          <Button
            className="bg-primary text-primary-foreground px-3 py-1.5 rounded-lg hover:bg-primary/90 text-sm"
            onClick={handlePlanSubmit}
          >
            {MAKE_PLAN_TEXT}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
