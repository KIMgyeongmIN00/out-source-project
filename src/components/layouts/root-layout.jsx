import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/layouts/sidebar/sidebar';

export default function RootLayout() {
  return (
    <div className="p-5 flex gap-5 h-[100vh] max-h-[100vh] min-w-4xl">
      <Sidebar />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
