import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { DashboardPage } from '@/components/dashboardPage';

export const Route = createFileRoute('/dashboard')({ 
  component: Dashboard, 
});

function Dashboard() { 
 

  return (
   <>
    <DashboardPage/>
   </>  
  )
}
