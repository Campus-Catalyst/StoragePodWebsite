import React from 'react';
import { createRootRoute, Outlet, redirect } from '@tanstack/react-router';

export const Route = createRootRoute({
  beforeLoad: ({ location }) => {
    if (location.pathname === '/') {
      throw redirect({ to: '/login' }); 
    }
  },
  component: () => (
    <div className="flex h-screen bg-gradient-to-br from-cyan-100 to-purple-200 ">
      <Outlet />
    </div>
  ),
});
