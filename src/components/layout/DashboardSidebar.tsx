
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { Award, BarChart3, BookOpenCheck, Building2, ClipboardList } from 'lucide-react';

const accreditationBodies = [
  {
    id: 'nba',
    title: 'NBA',
    icon: Award,
    path: '/dashboard/nba',
  },
  {
    id: 'naac',
    title: 'NAAC',
    icon: BookOpenCheck,
    path: '/dashboard/naac',
  },
  {
    id: 'nirf',
    title: 'NIRF',
    icon: BarChart3,
    path: '/dashboard/nirf',
  },
  {
    id: 'coe',
    title: 'COE',
    icon: Building2,
    path: '/dashboard/coe',
  },
  {
    id: 'qos',
    title: 'QoS',
    icon: ClipboardList,
    path: '/dashboard/qos',
  },
];

const DashboardSidebar: React.FC = () => {
  const location = useLocation();
  
  return (
    <Sidebar>
      <SidebarHeader className="flex h-16 items-center border-b border-sidebar-border px-6">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <span className="text-lg font-bold bg-primary text-white px-2 py-1 rounded">MADMS</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Accreditation Bodies</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {accreditationBodies.map((item) => {
                const isActive = location.pathname.startsWith(item.path);
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link 
                        to={item.path} 
                        className="transition-all duration-200 ease-in-out"
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border p-4">
        <div className="flex flex-col text-xs text-muted-foreground">
          <span>© 2024 Marwadi University</span>
          <span>Accreditation Dashboard</span>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSidebar;
