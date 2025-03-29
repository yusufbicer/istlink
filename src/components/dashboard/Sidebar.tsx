
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import {
  Sidebar as SidebarContainer,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { 
  Home, 
  Package,
  Truck, 
  ShoppingCart, 
  PieChart, 
  Map, 
  Settings, 
  Users, 
  FileText, 
  Box, 
  CreditCard, 
  FileCheck,
  User,
  HelpCircle,
  Building2,
  LogOut
} from 'lucide-react';

interface SidebarProps {
  userRole: 'importer' | 'supplier' | 'admin';
}

const Sidebar = ({ userRole }: SidebarProps) => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(true);

  // Common menu items for all roles
  const commonMenuItems = [
    { icon: Home, text: 'Dashboard', path: '/dashboard' },
    { icon: Settings, text: 'Settings', path: '/dashboard/settings' },
    { icon: User, text: 'Profile', path: '/dashboard/profile' },
    { icon: HelpCircle, text: 'Help', path: '/dashboard/help' },
  ];

  // Role-specific menu items
  const roleSpecificMenuItems = {
    importer: [
      { icon: Package, text: 'Orders', path: '/dashboard/orders' },
      { icon: Truck, text: 'Shipping', path: '/dashboard/shipping' },
      { icon: Map, text: 'Tracking', path: '/dashboard/tracking' },
      { icon: CreditCard, text: 'Payments', path: '/dashboard/payments' },
      { icon: FileCheck, text: 'Documents', path: '/dashboard/documents' },
      { icon: Box, text: 'Consolidations', path: '/dashboard/consolidations' },
      { icon: Building2, text: 'Suppliers', path: '/dashboard/suppliers' },
    ],
    supplier: [
      { icon: ShoppingCart, text: 'Orders', path: '/dashboard/orders' },
      { icon: Package, text: 'Products', path: '/dashboard/products' },
      { icon: CreditCard, text: 'Payments', path: '/dashboard/payments' },
      { icon: FileText, text: 'Documents', path: '/dashboard/documents' },
      { icon: Users, text: 'Customers', path: '/dashboard/customers' },
    ],
    admin: [
      { icon: Users, text: 'Users', path: '/dashboard/users' },
      { icon: Building2, text: 'Suppliers', path: '/dashboard/suppliers' },
      { icon: ShoppingCart, text: 'Orders', path: '/dashboard/orders' },
      { icon: Truck, text: 'Shipping', path: '/dashboard/shipping' },
      { icon: Box, text: 'Consolidations', path: '/dashboard/consolidations' },
      { icon: CreditCard, text: 'Payments', path: '/dashboard/payments' },
      { icon: FileCheck, text: 'Documents', path: '/dashboard/documents' },
      { icon: PieChart, text: 'Analytics', path: '/dashboard/analytics' },
      { icon: FileText, text: 'Reports', path: '/dashboard/reports' },
    ],
  };

  // Combine common and role-specific menu items
  const menuItems = [...commonMenuItems, ...roleSpecificMenuItems[userRole]];

  // Check if a menu item is active
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <SidebarContainer collapsible="icon">
      <SidebarHeader className="flex items-center px-4 py-2">
        <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 relative overflow-hidden">
          <Package className="w-5 h-5 text-white" />
        </div>
        <div className="ml-3">
          <span className="font-bold text-xl">GROOP</span>
          <span className="block text-xs text-indigo-600 font-medium tracking-wide">Consolidation Platform</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.path)}
                    tooltip={item.text}
                  >
                    <Link to={item.path} className="w-full flex items-center">
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.text}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="py-4">
        <div className="px-3 mb-2">
          <div className="flex items-center p-2 rounded-lg bg-gray-50">
            {user?.avatar ? (
              <img 
                src={user.avatar} 
                alt={user.name || "User"} 
                className="h-10 w-10 rounded-full object-cover"
              />
            ) : (
              <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                <span className="text-indigo-600 font-medium">
                  {user?.name?.charAt(0) || "U"}
                </span>
              </div>
            )}
            <div className="ml-3 overflow-hidden">
              <p className="text-sm font-medium truncate">{user?.name}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
          </div>
        </div>
        <div className="px-3">
          <button
            onClick={() => logout()}
            className="w-full flex items-center justify-center gap-2 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span>Log out</span>
          </button>
        </div>
      </SidebarFooter>
    </SidebarContainer>
  );
};

export default Sidebar;
