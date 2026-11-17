import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './sidebar';
import { TopAppBar } from './top-app-bar';

export const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Sidebar />
      <div className="pl-[260px] flex flex-col min-h-screen">
        <TopAppBar />
        <main className="flex-1 p-6 overflow-y-auto bg-[#F8FAFC]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
