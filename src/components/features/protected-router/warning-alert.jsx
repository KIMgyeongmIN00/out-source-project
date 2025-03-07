import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction
} from '@/components/ui/alert-dialog';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PleaseSignInAlert() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogDescription className="place-self-center w-4/5 box-border px-6">
            <img src="/logo.png" alt="로고 이미지" className="w-full box-border px-6" />
          </AlertDialogDescription>
          <AlertDialogTitle className="place-self-center">로그인을 해주세요!</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter className="place-self-center">
          <AlertDialogAction
            onClick={() => {
              setOpen(false);
              navigate('/');
            }}
          >
            확인
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
