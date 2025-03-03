import Router from '@/config/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useAuthSubScriber from '@/lib/hooks/use-auth-subscriber';

const queryClient = new QueryClient();

export default function App() {
  useAuthSubScriber();

  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
}
