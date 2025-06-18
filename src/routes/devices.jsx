import React from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Sidebar, SidebarInset,SidebarTrigger, SidebarProvider } from '@/components/ui/sidebar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {DevicesPage} from '@/components/devicesPage';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"



export const Route = createFileRoute('/devices')({
  component: DevicesPage,
});

function Devices() {

  return (
    <div>
        <DevicesPage/>
    </div>
  );
}
