import { Outlet } from '@tanstack/react-router';
import NavBar from './NavBar';

const RootLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
