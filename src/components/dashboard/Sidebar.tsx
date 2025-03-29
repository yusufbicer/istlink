
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuLabel,
  SidebarMenuTrigger,
} from "@/components/ui/sidebar";
import {
  Package,
  Users,
  ShoppingBag,
  Truck,
  TrendingUp,
  Settings,
  LogOut,
  Home,
  UserCircle,
  FileText,
  GitMerge,
  DollarSign,
  User,
  BarChart4,
  HelpCircle,
  Zap,
  Atom,
} from "lucide-react";

interface SidebarProps {
  userRole?: 'importer' | 'supplier' | 'admin';
}

const Sidebar = ({ userRole = 'importer' }: SidebarProps) => {
  const { logout, user } = useAuth();
  const location = useLocation();

  // Define menu items based on user role
  const getMenuItems = () => {
    switch (userRole) {
      case 'admin':
        return [
          { icon: Home, label: "Dashboard", path: "/dashboard" },
          { icon: Users, label: "Customers", path: "/dashboard/customers" },
          { icon: ShoppingBag, label: "Suppliers", path: "/dashboard/suppliers" },
          { icon: Package, label: "Orders", path: "/dashboard/orders" },
          { icon: GitMerge, label: "Consolidations", path: "/dashboard/consolidations" },
          { icon: Truck, label: "Shipping", path: "/dashboard/shipping" },
          { icon: FileText, label: "Documents", path: "/dashboard/documents" },
          { icon: DollarSign, label: "Payments", path: "/dashboard/payments" },
          { icon: TrendingUp, label: "Analytics", path: "/dashboard/analytics" },
          { icon: BarChart4, label: "Reports", path: "/dashboard/reports" },
          { icon: Settings, label: "Settings", path: "/dashboard/settings" },
        ];
      case 'supplier':
        return [
          { icon: Home, label: "Dashboard", path: "/dashboard" },
          { icon: Package, label: "Orders", path: "/dashboard/orders" },
          { icon: Users, label: "Customers", path: "/dashboard/customers" },
          { icon: FileText, label: "Documents", path: "/dashboard/documents" },
          { icon: DollarSign, label: "Payments", path: "/dashboard/payments" },
          { icon: TrendingUp, label: "Analytics", path: "/dashboard/analytics" },
          { icon: Settings, label: "Settings", path: "/dashboard/settings" },
        ];
      case 'importer':
      default:
        return [
          { icon: Home, label: "Dashboard", path: "/dashboard" },
          { icon: Package, label: "Orders", path: "/dashboard/orders" },
          { icon: ShoppingBag, label: "Suppliers", path: "/dashboard/suppliers" },
          { icon: GitMerge, label: "Consolidations", path: "/dashboard/consolidations" },
          { icon: Truck, label: "Shipping", path: "/dashboard/shipping" },
          { icon: FileText, label: "Documents", path: "/dashboard/documents" },
          { icon: DollarSign, label: "Payments", path: "/dashboard/payments" },
          { icon: Settings, label: "Settings", path: "/dashboard/settings" },
        ];
    }
  };

  const menuItems = getMenuItems();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <SidebarComponent>
      <SidebarHeader className="py-4 px-3 flex flex-col items-center justify-center border-b">
        <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 relative overflow-hidden">
          <Zap className="w-5 h-5 text-white absolute" />
          <Atom className="w-6 h-6 text-white/80 animate-pulse" />
        </div>
        <div className="mt-2 text-center">
          <span className="font-bold text-lg text-gray-900">GROOP</span>
          <span className="block text-xs text-indigo-600 font-medium tracking-wide">BEYOND BORDERS</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="py-4 px-3">
        <SidebarMenu>
          <SidebarMenuLabel>Menu</SidebarMenuLabel>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.path}>
              <SidebarMenuTrigger asChild active={isActive(item.path)}>
                <Link to={item.path} className="flex items-center space-x-3">
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuTrigger>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        
        <div className="mt-6">
          <SidebarMenu>
            <SidebarMenuLabel>Account</SidebarMenuLabel>
            <SidebarMenuItem>
              <SidebarMenuTrigger asChild>
                <Link to="/dashboard/profile" className="flex items-center space-x-3">
                  <UserCircle className="h-5 w-5" />
                  <span>Profile</span>
                </Link>
              </SidebarMenuTrigger>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuTrigger asChild>
                <Link to="/dashboard/help" className="flex items-center space-x-3">
                  <HelpCircle className="h-5 w-5" />
                  <span>Help & Support</span>
                </Link>
              </SidebarMenuTrigger>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </SidebarContent>
      
      <SidebarFooter className="p-3 border-t">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {user?.image ? (
              <img
                src={user.image}
                alt={user.name || "User"}
                className="h-8 w-8 rounded-full object-cover"
              />
            ) : (
              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                <User className="h-5 w-5 text-gray-500" />
              </div>
            )}
            <div className="flex flex-col">
              <span className="text-sm font-medium">{user?.name || "User"}</span>
              <span className="text-xs text-muted-foreground">
                {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
              </span>
            </div>
          </div>
          
          <button
            onClick={() => logout()}
            className="p-1.5 rounded-md text-gray-500 hover:text-red-600 hover:bg-red-50"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </SidebarFooter>
    </SidebarComponent>
  );
};

export default Sidebar;
