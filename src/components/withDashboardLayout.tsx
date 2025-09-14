import { ComponentType } from 'react';
import { ProtectedRoute } from './ProtectedRoute';
import { DashboardLayout } from './layouts/dashboard-layout';

export function withDashboardLayout<P extends object>(Component: ComponentType<P>) {
  return function WrappedComponent(props: P) {
    return (
      <ProtectedRoute>
        <DashboardLayout>
          <Component {...props} />
        </DashboardLayout>
      </ProtectedRoute>
    );
  };
}