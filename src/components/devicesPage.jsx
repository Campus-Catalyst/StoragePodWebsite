import { Sidebar, SidebarInset,SidebarTrigger, SidebarProvider } from '@/components/ui/sidebar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DeviceSideBar } from '@/components/device-sidebar';
import { useNavigate } from '@tanstack/react-router';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator";

export function DevicesPage()  { 
 const navigate = useNavigate();

  const devices = [
    { id: 'dev-001', name: 'Device 1', type: 'Smart Hub', status: 'Online' },
    { id: 'dev-002', name: 'Device 2', type: 'Security Camera', status: 'Offline' },
    { id: 'dev-003', name: 'Device 3', type: 'Printer', status: 'Online' },
    { id: 'dev-004', name: 'Device 4', type: 'Smart Speaker', status: 'Online' },
    { id: 'dev-005', name: 'Device 5', type: 'Motion Sensor', status: 'Online' },
  ];

  const handleDeviceClick = (deviceId) => {
    console.log(`Device ${deviceId} clicked. Navigating to dashboard.`);
    navigate({ to: '/dashboard' });
  };

  return (
    <SidebarProvider>
     
         <DeviceSideBar/>
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

        <div className="flex-1 overflow-hidden">
          <div className="p-8 overflow-y-auto h-full">
            <h2 className="text-3xl font-semibold text-gray-800 mb-8">My Devices</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {devices.map((device) => (
                <Card
                  key={device.id}
                  className="bg-white bg-opacity-80 backdrop-blur-sm cursor-pointer
                             hover:shadow-lg hover:scale-105 transition-all duration-200 ease-in-out"
                  onClick={() => handleDeviceClick(device.id)}
                >
                  <CardHeader>
                    <CardTitle>{device.name}</CardTitle>
                    <CardDescription>Type: {device.type}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className={`font-medium ${device.status === 'Online' ? 'text-green-600' : 'text-red-600'}`}>
                      Status: {device.status}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}