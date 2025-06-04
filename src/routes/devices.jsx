import React from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import DevicesSideMenu from '../components/devicesSideMenu'; 
import Header from '../components/header'; 

export const Route = createFileRoute('/devices')({
  component: DevicesPage,
});

function DevicesPage() {
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
    <div className="flex-1 flex"> {/* flex-1 ensures it takes available space from __root.jsx */}
      <DevicesSideMenu/> 
      <div className="flex-1 overflow-hidden">
        <Header /> 
        <div className="p-8 overflow-y-auto h-full">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8">My Devices</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {devices.map((device) => (
              <div
                key={device.id}
                className="bg-white bg-opacity-80 backdrop-blur-sm rounded-lg p-6 shadow-md cursor-pointer
                           hover:shadow-lg hover:scale-105 transition-all duration-200 ease-in-out"
                onClick={() => handleDeviceClick(device.id)}
              >
                <h3 className="text-xl font-bold text-gray-800 mb-2">{device.name}</h3>
                
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
