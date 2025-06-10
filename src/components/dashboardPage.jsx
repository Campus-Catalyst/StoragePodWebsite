import React from 'react';
import OverviewStorage from '../components/OverviewStorage';
import QuickActions from '../components/QuickActions';
import { AppSidebar } from '@/components/app-sidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"

import {
  Image, Video, Music, FileText,
} from 'lucide-react';
import { SidebarProvider,SidebarInset, SidebarTrigger, } from '@/components/ui/sidebar';

export function DashboardPage() { 
  const storageData = [
    { type: 'Images', count: 361, used: '15GB', total: '1TB', color: 'bg-primary', icon: Image },
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
     <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
         <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <OverviewStorage storageData={storageData} />

            <div className="w-full bg-border h-px my-4" /> 
            <QuickActions suggestions={suggestions} />
          </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
