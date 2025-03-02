import Home from '@/pages/home';
import Profile from '@/pages/profile';
import RootLayout from '@layouts/root-layout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProtectedRouter from './protected-router';

export default function Router() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        {
          path: '',
          element: <Home />
        },
        {
          path: '',
          element: <ProtectedRouter />,
          children: [
            {
              path: '/profile',
              element: <Profile />
            }
          ]
        }
      ]
    }
  ]);
  return <RouterProvider router={router} />;
}
