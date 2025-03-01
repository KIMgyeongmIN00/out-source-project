import Router from '@/config/router';
import useAuthSubScriber from '@/lib/hooks/use-auth-subscriber';

export default function App() {
  useAuthSubScriber();

  return <Router />;
}
