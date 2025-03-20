
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
  FileTextIcon
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
                  <div className="flex items-center justify-center">
                    <svg width="32" height="32" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M30 5C16.2 5 5 16.2 5 30C5 43.8 16.2 55 30 55C43.8 55 55 43.8 55 30C55 16.2 43.8 5 30 5Z" fill="#2563EB"/>
                      <path d="M34 18C27.4 18 22 23.4 22 30C22 36.6 27.4 42 34 42C40.6 42 46 36.6 46 30C46 23.4 40.6 18 34 18Z" fill="white"/>
                      <path d="M26 24C21.6 24 18 27.6 18 32C18 36.4 21.6 40 26 40C30.4 40 34 36.4 34 32C34 27.6 30.4 24 26 24Z" fill="#1E40AF"/>
                      <path d="M20 30C16.7 30 14 32.7 14 36C14 39.3 16.7 42 20 42C23.3 42 26 39.3 26 36C26 32.7 23.3 30 20 30Z" fill="white"/>
                    </svg>
                    <div className="ml-2">
                      <span className="font-bold text-base text-gray-900">Groop</span>
                      <span className="block text-xs text-gray-500">Complexity Consolidated</span>
                    </div>
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
                          <span>{user?.role === "admin" ? "All Users" : "My Customers"}</span>
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
                        <span>Order Notes</span>
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
                        <span>Payment Info</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  {(user?.role === "buyer" || user?.role === "admin") && (
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild isActive={isActive("/dashboard/shipping")}>
                        <Link to="/dashboard/shipping">
                          <TruckIcon className="w-5 h-5" />
                          <span>Shipping</span>
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
