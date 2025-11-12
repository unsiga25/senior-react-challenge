import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UsersList } from './components/UsersList';

/**
 * React Query client configuration
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes - data stays fresh
      refetchOnWindowFocus: false, // Don't refetch when window regains focus
    },
  },
});

/**
 * Root App Component
 * Sets up React Query provider and renders the main UsersList component
 */
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UsersList />
    </QueryClientProvider>
  );
}