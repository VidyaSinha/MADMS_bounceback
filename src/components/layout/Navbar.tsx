
import React from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';

const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-white/90 backdrop-blur-sm">
      <div className="flex h-16 items-center px-6">
        <SidebarTrigger className="mr-2 md:hidden" />
        <div className="flex items-center justify-between w-full">
          <h1 className="text-xl font-semibold tracking-tight text-madms-charcoal">DASHBOARD</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="rounded-full w-8 h-8 bg-madms-purple flex items-center justify-center text-sm font-medium text-primary">
                MU
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
