import { useAuthStore } from '@/stores/auth.store';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import WarningAlert from '@/components/features/protected-router/warning-alert';

export default function ProtectedRouter() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      setOpen(true);
    }
  }, [isAuthenticated]);

  if (!isAuthenticated)
    return (
      <div>
        로딩 중...
        <WarningAlert openState={open} changeOpenState={setOpen} />
      </div>
    );

  return <Outlet />;
}
