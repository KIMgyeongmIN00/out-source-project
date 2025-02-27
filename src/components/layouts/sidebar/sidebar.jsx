import AuthSignPanel from '@/components/layouts/sidebar/auth-sign-panel';

export default function Sidebar() {
  return (
    <div className="w-[250px] h-full flex flex-col gap-8 border border-primary rounded-2xl px-4 py-8">
      <img src="/logo.png" alt="로고 이미지" className=" w-full box-border px-6" />
      <AuthSignPanel />
    </div>
  );
}
