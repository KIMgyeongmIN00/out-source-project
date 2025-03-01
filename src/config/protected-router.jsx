import { useAuthStore } from '@/stores/auth.store';
import { Outlet } from 'react-router-dom';
import PleaseSignInAlert from '@/components/features/protected-router/warning-alert';

export default function ProtectedRouter() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated)
    return (
      <div>
        로딩 중...
        <PleaseSignInAlert />
      </div>
    );

  return <Outlet />;
}
