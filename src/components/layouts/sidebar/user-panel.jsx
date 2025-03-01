import { Link } from 'react-router-dom';
import { MdOutlinePerson } from 'react-icons/md';
import { MdLogout } from 'react-icons/md';
import { Button } from '@/components/ui/button';

export default function UserPanel({ user }) {
  return (
    <section className="flex flex-col gap-4 items-center">
      <img
        src={user.profileUrl || '/default_profile.png'}
        alt={`${user.nickname} 프로필`}
        className="w-30 rounded-full border-2 border-primary aspect-square object-cover object-top"
      />
      <p className="text-xl">
        <b className="text-primary">{user.nickname}</b> 님
      </p>
      <div className="space-x-4">
        <Button size="icon">
          <Link to="/profile">
            <MdOutlinePerson />
          </Link>
        </Button>
        <Button size="icon">
          <MdLogout />
        </Button>
      </div>
    </section>
  );
}
