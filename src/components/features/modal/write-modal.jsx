import { MAKE_PLAN_TEXT } from '@/constants/modal-constants';
import { createData } from '@/lib/apis/plan.api';
import { useAuthStore } from '@/stores/auth.store';
import React from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { DialogDescription } from '@radix-ui/react-dialog';
import useForm from '@/lib/hooks/useForm';
import Title from '@/components/layouts/modal/modal-title';
import Date from '@/components/layouts/modal/modal-date';
import Memo from '@/components/layouts/modal/modal-memo';
import Location from '@/components/layouts/modal/modal-position';
import { useEffect } from 'react';

export default function MakePlan({ Fulladdress, center }) {
  const userId = useAuthStore((state) => state.user.id); // 유저정보:id가져오기
  const { formState, handleChange, resetForm } = useForm({
    title: '',
    date: '',
    memo: ''
  });

  const { title, date, memo } = formState;
  async function handlePlanSubmit(e, formData) {
    createData({ ...formData, address: Fulladdress, user_id: userId, ...center }); //DB에 일정 추가하는 로직
  }
  return (
    <Dialog isOpen={true}>
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
        {/* 일정 장소 */}
        <Location address={Fulladdress} />
        {/* 일정 이름 */}
        <Title title={title} onTitleChange={handleChange} />
        {/* 일정 날짜 */}
        <Date date={date} onDateChange={handleChange} />
        {/* 일정 메모 */}
        <Memo memo={memo} onMemoChange={handleChange} />
        {/* 버튼 영역 */}
        <DialogFooter className="flex justify-end gap-2 mt-2">
          <Button
            className="bg-primary text-primary-foreground px-3 py-1.5 rounded-lg hover:bg-primary/90 text-sm"
            onClick={(e) => {
              handlePlanSubmit(e, formState);
              resetForm();
            }}
          >
            {MAKE_PLAN_TEXT}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
