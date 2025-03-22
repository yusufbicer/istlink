
import { useEffect, useState } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/auth";
import { BellIcon, SearchIcon } from "lucide-react";
import { useIsMobile, useIsTablet } from "@/hooks/use-mobile";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const { user, logout } = useAuth();
  const [greeting, setGreeting] = useState('');
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  useEffect(() => {
    const hours = new Date().getHours();
    if (hours < 12) {
      setGreeting('Good morning');
    } else if (hours < 18) {
      setGreeting('Good afternoon');
    } else {
      setGreeting('Good evening');
    }
  }, []);

  // Get the first name if available, otherwise use a default
  const firstName = user?.name ? user.name.split(' ')[0] : 'User';

  return (
    <header className="sticky top-0 z-10 w-full bg-white border-b border-gray-100">
      <div className="h-16 px-4 flex items-center justify-between">
        <div className="flex items-center">
          <SidebarTrigger className="mr-4 md:hidden" />
          
          <div className="hidden md:block max-w-[200px] lg:max-w-[calc(100vw-900px)] overflow-hidden pr-2">
            <h1 className="text-xl font-semibold truncate">
              {greeting}, {firstName}
            </h1>
            <p className="text-sm text-muted-foreground truncate">
              {isTablet ? "Welcome to your dashboard" : "Here's what's happening with your account today."}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search..." 
              className="w-64 pl-9 h-9 rounded-full bg-gray-50 border-gray-200 focus-visible:ring-blue-500"
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <BellIcon className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-80 overflow-y-auto">
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <div className="flex flex-col space-y-1">
                      <div className="flex justify-between">
                        <span className="font-medium">New order received</span>
                        <span className="text-xs text-muted-foreground">2m ago</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        Order #1234 has been placed by Company XYZ.
                      </span>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <div className="flex flex-col space-y-1">
                      <div className="flex justify-between">
                        <span className="font-medium">Shipment update</span>
                        <span className="text-xs text-muted-foreground">1h ago</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        Consolidated shipment #5678 is ready for pickup.
                      </span>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <div className="flex flex-col space-y-1">
                      <div className="flex justify-between">
                        <span className="font-medium">Payment received</span>
                        <span className="text-xs text-muted-foreground">5h ago</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        Payment for invoice #INV-567 has been processed.
                      </span>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="justify-center text-blue-600">
                View all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                {user?.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt={user.name || 'User'} 
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 font-medium">
                      {user?.name ? user.name.charAt(0) : 'U'}
                    </span>
                  </div>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => logout()}>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
