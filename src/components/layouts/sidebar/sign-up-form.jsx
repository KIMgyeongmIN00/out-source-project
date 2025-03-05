import SignErrorPanel from '@/components/layouts/sidebar/sign-error-panel';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useSignUpForm from '@/lib/hooks/sidebar/use-sign-up-form.hook';

export default function SignUpForm() {
  const { errorMessages, handleBlurEvent, handleSubmitEvent } = useSignUpForm();
  return (
    <form onSubmit={handleSubmitEvent}>
      <Input
        type="email"
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
        className={`rounded-none ${errorMessages.password.message && 'border-error'}`}
      />
      <Input
        type="text"
        name="nickname"
        onBlur={handleBlurEvent}
        placeholder="닉네임 입력"
        autoComplete="nickname"
        className={`rounded-t-none ${errorMessages.nickname.message && 'border-error'}`}
      />
      <SignErrorPanel errorMessages={errorMessages} />
      <Button type="submit" className="w-full mt-4">
        회원가입
      </Button>
    </form>
  );
}
