import { DELETE_PLAN_TEXT, UPDATE_PLAN_TEXT } from '@/constants/modal-constants';
import React from 'react';
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
import { Trash2, PencilLine } from 'lucide-react';
import ModalPosition from '@/components/layouts/modal/modal-position';
import ModalTitle from '@/components/layouts/modal/modal-title';
import ModalDate from '@/components/layouts/modal/modal-date';
import ModalMemo from '@/components/layouts/modal/modal-memo';
import useForm from '@/lib/hooks/useForm';
import { useState } from 'react';
import { usePlanQuery } from '@/lib/hooks/use-handle-plans-query';
import { useAuthStore } from '@/stores/auth.store';

export default function EditPlan({ plan }) {
  const [open, setOpen] = useState(false);
  const userId = useAuthStore((state) => state.user.id);
  function handleUpdatePlan(e, formState) {
    e.preventDefault();

    updatePlanMutation.mutate(formState);
    setOpen(false);
  }
  function handleDeletePlan(e) {
    e.preventDefault();

    deletePlanMutation.mutate();
    setOpen(false);
  }
  const { formState, handleChange } = useForm({
    title: plan.title,
    date: plan.date,
    memo: plan.memo
  });

  const { updatePlanMutation, deletePlanMutation } = usePlanQuery(userId, plan.id);
  const { title, date, memo } = formState;
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          일정 수정
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg max-h-[500px] h-auto p-4 bg-card rounded-xl shadow-lg space-y-1 border border-border text-primary">
        <DialogHeader className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <DialogTitle className="text-lg font-semibold text-primary">일정 생성</DialogTitle>
            <DialogDescription />

            {/* 이걸 누르면 제목 수정이 가능하도록 추후 계발 예정 */}
            <button className="text-gray-500 hover:text-red-500">
              <PencilLine className="w-5 h-5" />
            </button>
          </div>
        </DialogHeader>

        {/* 일정 장소 */}
        <ModalPosition address={plan.address} />

        {/* 일정 이름 */}
        <ModalTitle title={title} onTitleChange={handleChange} />

        {/* 일정 날짜 */}
        <ModalDate date={date} onDateChange={handleChange} />

        {/* 일정 메모 */}
        <ModalMemo memo={memo} onMemoChange={handleChange} />

        {/* 버튼 영역 */}
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
            onClick={(e) => {
              handleUpdatePlan(e, formState);
            }}
          >
            {UPDATE_PLAN_TEXT}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
