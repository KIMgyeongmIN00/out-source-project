import PlanPanel from '@/components/layouts/sidebar/plan-panel';
import SignPanel from '@/components/layouts/sidebar/sign-panel';
import UserPanel from '@/components/layouts/sidebar/user-panel';
import { useAuthStore } from '@/stores/auth.store';

export default function Sidebar() {
  const { isAuthenticated: isAuth, user } = useAuthStore();

  return (
    <div className="w-[250px] h-full overflow-hidden flex flex-col gap-8 border border-primary rounded-2xl px-4 pt-8 pb-6">
      <img src="/logo.png" alt="로고 이미지" className=" w-full box-border px-6" />
      {isAuth ? <UserPanel user={user} /> : <SignPanel />}
      {isAuth && <PlanPanel />}
    </div>
  );
}
