import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router';
import RootLayout from './Components/RootLayout';
import HomePage from './Pages/HomePage';
import AttendancePage from './Pages/AttendancePage';

// Root layout for all pages
const rootRoute = createRootRoute({
  component: RootLayout,
});

// Define individual routes
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const attendanceRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/attendance',
    component: AttendancePage,
});

// Create router with the route tree
const routeTree = rootRoute.addChildren([homeRoute, attendanceRoute]);

export const router = createRouter({
  routeTree,
});

// Enable TypeScript auto-completion
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
