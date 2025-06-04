import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import SideMenu from '../components/SideMenu';
import Header from '../components/Header';
import OverviewStorage from '../components/OverviewStorage';
import QuickActions from '../components/QuickActions';

import {
  Image, Video, Music, FileText,
} from 'lucide-react';

// Create a file route for this component.
// The component property now references the named function DashboardPage.
export const Route = createFileRoute('/dashboard')({ 
  component: DashboardPage, 
});

// The actual React component for your Dashboard page.
function DashboardPage() { 
  const storageData = [
    { type: 'Images', count: 361, used: '15GB', total: '1TB', color: 'bg-purple-400', icon: Image },
    { type: 'Video', count: 361, used: '15GB', total: '1TB', color: 'bg-blue-400', icon: Video },
    { type: 'Music', count: 361, used: '15GB', total: '1TB', color: 'bg-indigo-400', icon: Music },
    { type: 'Documents', count: 361, used: '15GB', total: '1TB', color: 'bg-gray-400', icon: FileText }
  ];

  const suggestions = [
    {
      title: 'Upload File',
      icon: '⤴️',
      color: 'bg-teal-100'
    },
    {
      title: 'Delete File',
      icon:'🗑️',
      color: 'bg-teal-100'
    },
    {
      title: 'Share Document', 
      icon: '🔗',
      color: 'bg-blue-200',
    },
    {
      title: 'Create Folder', 
      icon: '📁',
      color: 'bg-teal-100'
    }
  ];

  return (
    // This div is now part of the Dashboard component's layout.
    // The main background and h-screen are provided by __root.jsx.
    // flex-1 here ensures it takes up the remaining horizontal space within the root's flex container.
    <div className="flex-1 flex">
      <SideMenu />

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden">
        <Header />

        {/* Content Section */}
        <div className="p-8 overflow-y-auto h-full">
          <OverviewStorage storageData={storageData} />
          <QuickActions suggestions={suggestions} />
        </div>
      </div>
    </div>
  );
}
