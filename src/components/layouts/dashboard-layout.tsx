import { ReactNode } from 'react';
import { Navigation } from '../navigation';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Navigation />
        <main className="flex-1 overflow-y-auto">
          <div className="h-full py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}