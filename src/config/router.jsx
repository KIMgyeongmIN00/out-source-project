import RootLayout from '@layouts/root-layout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route path="/" element={<>home</>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
