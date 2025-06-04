import React from 'react';
import { Outlet } from '@tanstack/react-router'; // Import Outlet

// App will now act as the root layout for your router
function App() {
  return (
    // The Outlet component renders the currently matched route's component
    <Outlet />
  );
}

export default App;
