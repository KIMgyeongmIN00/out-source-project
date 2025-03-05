import { useNavigate } from 'react-router-dom';
import PlanPanel from '@/components/layouts/sidebar/plan-panel';
import SignPanel from '@/components/layouts/sidebar/sign-panel';
import UserPanel from '@/components/layouts/sidebar/user-panel';
import { useAuthStore } from '@/stores/auth.store';
import { Suspense } from 'react';

export default function Sidebar() {
  const { isAuthenticated: isAuth, user } = useAuthStore();
  const navigate = useNavigate();

  return (
    <div className="w-[250px] h-full overflow-hidden flex flex-col gap-8 border border-primary rounded-2xl px-4 pt-8 pb-6">
      <img src="/logo.png" alt="로고 이미지" className=" w-full box-border px-6" onClick={() => navigate('/')} />
      {isAuth ? <UserPanel user={user} /> : <SignPanel />}
      <Suspense fallback={<div>Loading plans...</div>}>{isAuth && <PlanPanel userId={user.id} />}</Suspense>
    </div>
  );
}
