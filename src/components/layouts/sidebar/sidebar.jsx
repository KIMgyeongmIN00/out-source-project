import SignPanel from '@/components/layouts/sidebar/sign-panel';
import UserPanel from '@/components/layouts/sidebar/user-panel';

export default function Sidebar() {
  // TODO: 스토어에서 상태 받아와서 사용하기
  const { isAuth, ...user } = {
    isAuth: true,
    id: crypto.randomUUID(),
    nickname: '오스트랄로피테쿠스',
    email: 'asdf@gmail.com',
    profileUrl: 'https://buly.kr/4QmkLtE'
  };

  return (
    <div className="w-[250px] h-full overflow-hidden flex flex-col gap-8 border border-primary rounded-2xl px-4 pt-8 pb-6">
      <img src="/logo.png" alt="로고 이미지" className=" w-full box-border px-6" />
      {isAuth ? <UserPanel user={user} /> : <SignPanel />}
    </div>
  );
}
