import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";

// Citizen App
import CitizenLayout from "./pages/citizen/CitizenLayout";
import ReportHazard from "./pages/citizen/ReportHazard";
import ReportHistory from "./pages/citizen/ReportHistory";
import Settings from "./pages/citizen/Settings";

// Dashboard
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import HazardMap from "./pages/dashboard/HazardMap";
import ReportsTable from "./pages/dashboard/ReportsTable";
import Analytics from "./pages/dashboard/Analytics";
import SocialFeed from "./pages/dashboard/SocialFeed";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename="/Pralay-SIH">
        <Routes>
          {/* Landing Page */}
          <Route path="/" element={<Landing />} />
          
          {/* Citizen App Routes */}
          <Route path="/citizen" element={<CitizenLayout />}>
            <Route index element={<ReportHazard />} />
            <Route path="history" element={<ReportHistory />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          
          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<HazardMap />} />
            <Route path="reports" element={<ReportsTable />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="social" element={<SocialFeed />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
