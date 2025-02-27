import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function AuthSignPanel() {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <section className="border border-primary rounded-lg overflow-hidden text-center p-4 space-y-4">
      <ul className="grid grid-cols-2 gap-2 [&_button]:w-full">
        <li>
          <Button variant={isSignIn ? 'default' : 'ghost'} onClick={() => setIsSignIn(true)}>
            로그인
          </Button>
        </li>
        <li>
          <Button variant={isSignIn ? 'ghost' : 'default'} onClick={() => setIsSignIn(false)}>
            회원가입
          </Button>
        </li>
      </ul>
      <form>
        <Input type="email" name="email" placeholder="아이디 입력" className="rounded-b-none" />
        <Input
          type="password"
          name="password"
          placeholder="비밀번호 입력"
          className={isSignIn ? 'rounded-t-none' : 'rounded-none'}
        />
        {!isSignIn && <Input type="text" name="nickname" placeholder="닉네임 입력" className="rounded-t-none" />}
        <Button className="w-full mt-4">{isSignIn ? '로그인' : '회원가입'}</Button>
      </form>
    </section>
  );
}
