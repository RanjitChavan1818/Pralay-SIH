import { Outlet, Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Map, 
  FileText, 
  BarChart3, 
  MessageCircle, 
  Settings, 
  Shield,
  Menu,
  X,
  ArrowLeft
} from "lucide-react";
import { useState } from "react";

const DashboardLayout = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const navigationItems = [
    { path: "/dashboard", icon: Map, label: "Hazard Map", exact: true },
    { path: "/dashboard/reports", icon: FileText, label: "Reports Table" },
    { path: "/dashboard/analytics", icon: BarChart3, label: "Analytics" },
    { path: "/dashboard/social", icon: MessageCircle, label: "Social Feed" },
    { path: "/dashboard/settings", icon: Settings, label: "Settings" },
  ];

  const isActive = (path: string, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar Overlay (Mobile) */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-50
        w-64 bg-gradient-depth transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Shield className="h-8 w-8 text-primary-glow" />
                <div>
                  <h1 className="text-lg font-semibold text-white">Ocean Dashboard</h1>
                  <p className="text-xs text-white/70">Official Portal</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
                className="md:hidden text-white hover:bg-white/10"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`
                  flex items-center space-x-3 px-4 py-3 rounded-lg transition-smooth
                  ${
                    isActive(item.path, item.exact)
                      ? "bg-primary-glow/20 text-primary-glow border border-primary-glow/30"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  }
                `}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-white/10">
            <Link to="/" className="flex items-center space-x-2 text-white/70 hover:text-white transition-smooth">
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm">Back to Landing</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="bg-card border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
                className="md:hidden"
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  {navigationItems.find(item => isActive(item.path, item.exact))?.label || "Dashboard"}
                </h2>
                <p className="text-sm text-muted-foreground">
                  Monitor and manage ocean hazard reports
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Card className="px-3 py-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">System Online</span>
                </div>
              </Card>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;