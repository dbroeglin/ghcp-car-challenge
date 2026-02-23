import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import HomePage from './pages/HomePage';
import ResortDetailPage from './pages/ResortDetailPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10, // 10 minutes
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename="/ghcp-car-challenge">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/resort/:id" element={<ResortDetailPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
