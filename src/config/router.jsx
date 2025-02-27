import Home from '@/pages/home';
import RootLayout from '@layouts/root-layout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
