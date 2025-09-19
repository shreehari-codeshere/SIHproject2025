'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  Sprout,
  LineChart,
  HelpCircle,
  CalendarClock,
} from 'lucide-react';
import { Logo } from './logo';

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    {
      href: '/',
      label: 'Dashboard',
      icon: LayoutDashboard,
      tooltip: 'Dashboard',
    },
    {
      href: '/recommendations',
      label: 'Crop Recommendations',
      icon: Sprout,
      tooltip: 'Recommendations',
    },
    {
      href: '/market-analysis',
      label: 'Market Analysis',
      icon: LineChart,
      tooltip: 'Market Analysis',
    },
    {
      href: '/ask-a-question',
      label: 'Ask a Question',
      icon: HelpCircle,
      tooltip: 'Ask a Question',
    },
    {
      href: '/upcoming',
      label: 'Upcoming',
      icon: CalendarClock,
      tooltip: 'Upcoming',
    },
  ];

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <Link href="/" className="block">
            <Logo />
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  tooltip={item.tooltip}
                  size="lg"
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
