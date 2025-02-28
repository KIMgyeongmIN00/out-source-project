import React from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Trash2, PencilLine } from 'lucide-react';
import ModalPosition from './modal-position';
import ModalDate from './modal-date';
import ModalMemo from './modal-memo';
import { useState } from 'react';
import Title from './modal-title';
import { DialogDescription } from '@radix-ui/react-dialog';
import { EDIT_MODE, SET_MODE } from '@/constants/constants';

export default function Modal(props) {
  const { mode, btn1Text, btn2Text, btn3Text, onShareClick, onDeleteClick, onSubmitClick } = props;
  const [location, setLocation] = useState({
    address: '',
    latitude: 0,
    longitude: 0
  });
  const [title, setTitle] = useState('카카오 취업하기');
  const [date, setDate] = useState('');
  const [memo, setMemo] = useState('일정 상세내용');

  const handleLocation = (newLocation) => setLocation(newLocation);

  const handleTitle = (newTitle) => {
    setTitle(newTitle);
  };
  const handleDate = (newDate) => {
    setDate(newDate);
  };
  const handleMemo = (newMemo) => {
    setMemo(newMemo);
  };

  return (
    <Dialog isOpen={true}>
      <DialogTrigger asChild>
        <Button variant="outline">{'Open'}</Button>
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

              {/* 이걸 누르면 제목 수정이 가능하도록 추후 계발 예정정 */}
              <button className="text-gray-500 hover:text-red-500">
                <PencilLine className="w-5 h-5" />
              </button>

              {/* 닫기(X) 버튼 */}
            </div>
          </DialogHeader>
        )}

        {/* 일정 장소 */}
        <ModalPosition address={location.address} />

        {/* 일정 이름 */}
        {(mode === SET_MODE || mode === EDIT_MODE) && <Title onTitleChange={handleTitle} />}

        {/* 일정 날짜 */}
        <ModalDate date={date} onDateChange={handleDate} />

        {/* 일정 메모 */}
        <ModalMemo memo={memo} onMemoChange={handleMemo} />

        {/* 버튼 영역 */}
        <DialogFooter className="flex justify-end gap-2 mt-2">
          {mode === 'edit' && (
            <>
              <Button variant="secondary" className="flex items-center gap-1 px-3 py-1.5 text-sm" onClick={onShareClick}>
                {btn1Text}
              </Button>
              <Button
                variant="destructive"
                className="flex items-center gap-1 px-3 py-1.5 text-sm"
                onClick={onDeleteClick}
              >
                <Trash2 className="w-4 h-4" /> {btn2Text}
              </Button>
            </>
          )}
          <Button
            className="bg-primary text-primary-foreground px-3 py-1.5 rounded-lg hover:bg-primary/90 text-sm"
            onClick={onSubmitClick}
          >
            {btn3Text}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
