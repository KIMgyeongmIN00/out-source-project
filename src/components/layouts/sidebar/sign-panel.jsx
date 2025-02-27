import { useState } from 'react';
import { Button } from '@/components/ui/button';
import SignInForm from '@/components/layouts/sidebar/sign-in-form';
import SignUpForm from '@/components/layouts/sidebar/sign-up-form';

export default function SignPanel() {
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
      {isSignIn ? <SignInForm /> : <SignUpForm />}
    </section>
  );
}
