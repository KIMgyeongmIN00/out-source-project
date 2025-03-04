import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Router from '@/config/router';
import useAuthSubScriber from '@/lib/hooks/use-auth-subscriber.hook';

const queryClient = new QueryClient();

export default function App() {
  useAuthSubScriber();

  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
}
