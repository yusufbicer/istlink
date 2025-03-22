
import { Link, useLocation } from "react-router-dom";
import { 
  Sidebar as ShadcnSidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem 
} from "@/components/ui/sidebar";
import { useAuth } from "@/lib/auth";
import { 
  HomeIcon, 
  PackageIcon, 
  UsersIcon, 
  TruckIcon, 
  ClipboardListIcon, 
  SettingsIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  BarChart3Icon, 
  MapPinIcon,
  BoxesIcon,
  CreditCardIcon,
  StickyNoteIcon,
  FileTextIcon,
  Zap,
  Atom
} from "lucide-react";
import { useState, useEffect } from "react";

const Sidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <ShadcnSidebar>
      <SidebarContent className="py-6">
        <div className="flex flex-col h-full justify-between">
          <div className="space-y-6">
            {/* Brand Logo */}
            <div className="px-6">
              <Link to="/dashboard" className="flex items-center">
                <div className="flex items-center">
                  <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 relative overflow-hidden">
                    <Zap className="w-5 h-5 text-white absolute" />
                    <Atom className="w-6 h-6 text-white/80 animate-pulse" />
                  </div>
                  <div className="ml-2">
                    <span className="font-bold text-base text-gray-900">GROOP</span>
                    <span className="block text-xs text-indigo-600 font-medium tracking-wide">BEYOND BORDERS</span>
                  </div>
                </div>
              </Link>
            </div>
            
            {/* Main Navigation */}
            <SidebarGroup>
              <SidebarGroupLabel>Main</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/dashboard")}>
                      <Link to="/dashboard">
                        <LayoutDashboardIcon className="w-5 h-5" />
                        <span>Dashboard</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  {/* Users/Customers - for Admin and Suppliers */}
                  {(user?.role === "admin" || user?.role === "supplier") && (
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild isActive={isActive("/dashboard/users")}>
                        <Link to="/dashboard/users">
                          <UsersIcon className="w-5 h-5" />
                          <span>{user?.role === "admin" ? "All Customers" : "My Customers"}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )}
                  
                  {/* Suppliers - for Buyers and Admins */}
                  {(user?.role === "buyer" || user?.role === "admin") && (
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild isActive={isActive("/dashboard/suppliers")}>
                        <Link to="/dashboard/suppliers">
                          <UsersIcon className="w-5 h-5" />
                          <span>Suppliers</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )}
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/dashboard/orders")}>
                      <Link to="/dashboard/orders">
                        <ClipboardListIcon className="w-5 h-5" />
                        <span>Orders</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  {/* Notes - for all users */}
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/dashboard/notes")}>
                      <Link to="/dashboard/notes">
                        <StickyNoteIcon className="w-5 h-5" />
                        <span>Order-Notes</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  {/* Consolidations - for Admin and Buyers */}
                  {(user?.role === "buyer" || user?.role === "admin") && (
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild isActive={isActive("/dashboard/consolidations")}>
                        <Link to="/dashboard/consolidations">
                          <BoxesIcon className="w-5 h-5" />
                          <span>Consolidations</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )}
                  
                  {/* Payment Info - visible to all users */}
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/dashboard/payments")}>
                      <Link to="/dashboard/payments">
                        <CreditCardIcon className="w-5 h-5" />
                        <span>Payments</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  {(user?.role === "buyer" || user?.role === "admin") && (
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild isActive={isActive("/dashboard/shipping")}>
                        <Link to="/dashboard/shipping">
                          <TruckIcon className="w-5 h-5" />
                          <span>Shipments</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )}

                  {user?.role === "supplier" && (
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild isActive={isActive("/dashboard/products")}>
                        <Link to="/dashboard/products">
                          <PackageIcon className="w-5 h-5" />
                          <span>Products</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )}
                  
                  {/* Blog Management - Admin only */}
                  {user?.role === "admin" && (
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild isActive={isActive("/dashboard/blog-management")}>
                        <Link to="/dashboard/blog-management">
                          <FileTextIcon className="w-5 h-5" />
                          <span>Blog Management</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* Admin Navigation */}
            {user?.role === "admin" && (
              <SidebarGroup>
                <SidebarGroupLabel>Admin</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild isActive={isActive("/dashboard/analytics")}>
                        <Link to="/dashboard/analytics">
                          <BarChart3Icon className="w-5 h-5" />
                          <span>Analytics</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild isActive={isActive("/dashboard/tracking")}>
                        <Link to="/dashboard/tracking">
                          <MapPinIcon className="w-5 h-5" />
                          <span>Tracking</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            )}
          </div>
          
          {/* Bottom Navigation */}
          <div className="space-y-6">
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/dashboard/settings")}>
                      <Link to="/dashboard/settings">
                        <SettingsIcon className="w-5 h-5" />
                        <span>Settings</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild onClick={() => logout()}>
                      <button className="w-full flex items-center">
                        <LogOutIcon className="w-5 h-5" />
                        <span>Logout</span>
                      </button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            
            {/* User Info */}
            {user && (
              <div className="px-6 py-4">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      {user.avatar ? (
                        <img 
                          src={user.avatar} 
                          alt={user.name} 
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-blue-600 font-medium">
                          {user.name.charAt(0)}
                        </span>
                      )}
                    </div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-white"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{user.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </SidebarContent>
    </ShadcnSidebar>
  );
};

export default Sidebar;
