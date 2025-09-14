import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Onboarding from "./pages/Onboarding";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";

const queryClient = new QueryClient();

// Wrap component with DashboardLayout for protected routes
const withDashboardLayout = (Component: React.ComponentType) => (
  <ProtectedRoute>
    <DashboardLayout>
      <Component />
    </DashboardLayout>
  </ProtectedRoute>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/dashboard" element={withDashboardLayout(Dashboard)} />
            {/* Placeholder routes for navigation items */}
            <Route 
              path="/goals" 
              element={withDashboardLayout(() => (
                <div className="container">
                  <h1 className="text-2xl font-bold mb-6">Goals</h1>
                  <p>Goals page coming soon...</p>
                </div>
              ))} 
            />
            <Route 
              path="/achievements" 
              element={withDashboardLayout(() => (
                <div className="container">
                  <h1 className="text-2xl font-bold mb-6">Achievements</h1>
                  <p>Achievements page coming soon...</p>
                </div>
              ))} 
            />
            <Route 
              path="/settings" 
              element={withDashboardLayout(() => (
                <div className="container">
                  <h1 className="text-2xl font-bold mb-6">Settings</h1>
                  <p>Settings page coming soon...</p>
                </div>
              ))} 
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
