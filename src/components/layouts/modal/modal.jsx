import React from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Trash2, PencilLine } from 'lucide-react';
import Title from './modal-title';
import { DialogDescription } from '@radix-ui/react-dialog';
import useForm from '@/lib/hooks/useForm';
import { SET_MODE } from '@/constants/modal-constants';
import Location from './modal-position';
import Memo from './modal-memo';
import Date from './modal-date';

export default function Modal({
  mode,
  Fulladdress,
  shareText,
  deleteText,
  submitText,
  onShareClick,
  onDeleteClick,
  onSubmitClick
}) {
  const { formState, handleChange, resetForm } = useForm({
    address: Fulladdress,
    title: '',
    date: '',
    memo: ''
  });

  const { address, title, date, memo } = formState;

  return (
    <Dialog isOpen={true}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          일정 추가
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg max-h-[500px] h-auto p-4 bg-card rounded-xl shadow-lg space-y-1 border border-border text-primary">
        {mode === SET_MODE ? (
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-primary">일정 생성</DialogTitle>
            <DialogDescription />
          </DialogHeader>
        ) : (
          <DialogHeader className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <DialogTitle className="text-lg font-semibold text-primary">{title}</DialogTitle>
              <DialogDescription />

              {/* 이걸 누르면 제목 수정이 가능하도록 추후 계발 예정정 */}
              <button className="text-gray-500 hover:text-red-500">
                <PencilLine className="w-5 h-5" />
              </button>

              {/* 닫기(X) 버튼 */}
            </div>
          </DialogHeader>
        )}

        {/* 일정 장소 */}
        <Location address={address} />

        {/* 일정 이름 */}
        <Title title={title} onTitleChange={handleChange} />

        {/* 일정 날짜 */}
        <Date date={date} onDateChange={handleChange} />

        {/* 일정 메모 */}
        <Memo memo={memo} onMemoChange={handleChange} />

        {/* 버튼 영역 */}
        <DialogFooter className="flex justify-end gap-2 mt-2">
          {mode === 'edit' && (
            <>
              <Button
                variant="secondary"
                className="flex items-center gap-1 px-3 py-1.5 text-sm"
                onClick={onShareClick}
              >
                {shareText}
              </Button>
              <Button
                variant="destructive"
                className="flex items-center gap-1 px-3 py-1.5 text-sm"
                onClick={onDeleteClick}
              >
                <Trash2 className="w-4 h-4" /> {deleteText}
              </Button>
            </>
          )}
          <Button
            className="bg-primary text-primary-foreground px-3 py-1.5 rounded-lg hover:bg-primary/90 text-sm"
            onClick={(e) => onSubmitClick(e, formState)}
          >
            {submitText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
