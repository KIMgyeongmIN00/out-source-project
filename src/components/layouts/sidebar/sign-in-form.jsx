import SignErrorPanel from '@/components/layouts/sidebar/sign-error-panel';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useSignInForm from '@/lib/hooks/sidebar/use-sign-in-form.hook';

export default function SignInForm() {
  const { errorMessages, handleBlurEvent, handleSubmitEvent } = useSignInForm();
  return (
    <form onSubmit={handleSubmitEvent}>
      <Input
        type="text"
        name="email"
        onBlur={handleBlurEvent}
        placeholder="이메일 입력"
        autoComplete="email"
        className={`rounded-b-none ${errorMessages.email.message && 'border-error'}`}
      />
      <Input
        type="password"
        name="password"
        onBlur={handleBlurEvent}
        placeholder="비밀번호 입력"
        autoComplete="password"
        className={`rounded-t-none ${errorMessages.password.message && 'border-error'}`}
      />
      <SignErrorPanel errorMessages={errorMessages} />
      <Button type="submit" className="w-full mt-4">
        로그인
      </Button>
    </form>
  );
}
