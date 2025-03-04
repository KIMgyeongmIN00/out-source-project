import { MAKE_PLAN_TEXT } from '@/constants/modal-constants';
import { createData } from '@/lib/apis/plan.api';
import { useAuthStore } from '@/stores/auth.store';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { DialogDescription } from '@radix-ui/react-dialog';
import useForm from '@/lib/hooks/useForm';
import ModalPosition from '@/components/layouts/modal/modal-position';
import ModalTitle from '@/components/layouts/modal/modal-title';
import ModalDate from '@/components/layouts/modal/modal-date';
import ModalMemo from '@/components/layouts/modal/modal-memo';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from '@/constants/query-keys';
import Swal from 'sweetalert2';

export default function MakePlan({ fullAddress, center }) {
  const queryClient = useQueryClient(); // queryClient 사용
  const [open, setOpen] = useState(false);
  const userId = useAuthStore((state) => state.user.id); // 유저정보:id가져오기
  const { formState, handleChange, resetForm } = useForm({
    title: '',
    date: '',
    memo: ''
  });

  const { title, date, memo } = formState;
  async function handlePlanSubmit(e) {
    // async을 안쓰니 에러가 납니다 !
    e.preventDefault(); // 필요 시 이벤트 기본 동작 방지
    await createData({ ...formState, address: fullAddress, user_id: userId, ...center }).then(
      Swal.fire({
        title: '성공',
        text: '일정이 등록이 완료되었습니다.',
        icon: 'success'
      })
    );
    queryClient.invalidateQueries({ queryKey: QueryKeys.ALLPLANS(userId) });
    resetForm();
    setOpen(false);
  }

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
        {/* 일정 장소 */}
        <ModalPosition address={fullAddress} />
        {/* 일정 이름 */}
        <ModalTitle title={title} onTitleChange={handleChange} />
        {/* 일정 날짜 */}
        <ModalDate date={date} onDateChange={handleChange} />
        {/* 일정 메모 */}
        <ModalMemo memo={memo} onMemoChange={handleChange} />
        {/* 버튼 영역 */}
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
