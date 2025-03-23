
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import DashboardSidebar from './DashboardSidebar';
import Navbar from './Navbar';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar />
        <div className="flex flex-col flex-grow">
          <Navbar />
          <main className="flex-grow p-6 overflow-auto animate-fadeIn">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;
