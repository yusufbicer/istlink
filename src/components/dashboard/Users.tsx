
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UsersIcon, UserPlusIcon, SearchIcon, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

// Type definitions
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  company: string;
  orders: number;
  status: string;
}

const Users = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    company: "",
    role: "customer"
  });

  // Fetch users from Supabase
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        console.log("Fetching users...");
        
        // Fetch profiles (users)
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('role', 'customer');
        
        if (error) {
          console.error("Error fetching users:", error);
          toast({
            title: "Error",
            description: "Failed to load users data. " + error.message,
            variant: "destructive"
          });
          return;
        }
        
        // For each user, count their orders
        const usersWithOrderCounts = await Promise.all(
          data.map(async (userData) => {
            let orderCount = 0;
            
            // Try to count orders for this user
            try {
              const { count, error: orderError } = await supabase
                .from('orders')
                .select('*', { count: 'exact', head: true })
                .eq('customer_id', userData.id);
                
              if (!orderError && count !== null) {
                orderCount = count;
              }
            } catch (err) {
              console.error("Error counting orders for user:", userData.id, err);
            }
            
            return {
              id: userData.id,
              name: userData.name,
              email: userData.email,
              role: userData.role,
              company: userData.company || 'Not specified',
              orders: orderCount,
              status: userData.status || 'active'
            };
          })
        );
        
        console.log("Users loaded:", usersWithOrderCounts.length);
        setUsers(usersWithOrderCounts);
        setFilteredUsers(usersWithOrderCounts);
      } catch (err) {
        console.error("Error in fetchUsers:", err);
        toast({
          title: "Error",
          description: "Something went wrong while loading users.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchUsers();
    }
  }, [user, toast]);

  // Filter users based on search and role
  useEffect(() => {
    const filtered = users.filter(u => {
      const matchesSearch = 
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.company.toLowerCase().includes(searchTerm.toLowerCase());
      
      // For suppliers, they can only see customers (their customers)
      if (user?.role === "supplier") {
        return matchesSearch && u.role === "customer";
      }
      
      return matchesSearch;
    });
    
    setFilteredUsers(filtered);
  }, [searchTerm, users, user]);

  // Add new user
  const handleAddUser = async () => {
    try {
      if (!newUser.name || !newUser.email) {
        toast({
          title: "Validation Error",
          description: "Name and email are required fields.",
          variant: "destructive"
        });
        return;
      }
      
      // Create profile entry with proper type casting for role
      const { data, error } = await supabase
        .from('profiles')
        .insert({
          name: newUser.name,
          email: newUser.email,
          company: newUser.company,
          role: newUser.role as "customer" | "supplier" | "admin", // Cast to expected enum type
          status: 'active'
        })
        .select();
        
      if (error) {
        console.error("Error adding user:", error);
        toast({
          title: "Error",
          description: "Failed to add user. " + error.message,
          variant: "destructive"
        });
        return;
      }
      
      // Add the new user to state
      const newUserData: User = {
        id: data[0].id,
        name: data[0].name,
        email: data[0].email,
        role: data[0].role,
        company: data[0].company || 'Not specified',
        orders: 0,
        status: 'active'
      };
      
      setUsers([...users, newUserData]);
      
      // Reset form
      setNewUser({
        name: "",
        email: "",
        company: "",
        role: "customer"
      });
      
      toast({
        title: "Success",
        description: "User added successfully."
      });
    } catch (err) {
      console.error("Error in handleAddUser:", err);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-indigo-600 animate-spin mx-auto" />
          <p className="mt-2 text-gray-600">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">
            {user?.role === "admin" ? "All Customers" : "My Customers"}
          </h1>
          <p className="text-muted-foreground">
            {user?.role === "admin" 
              ? "Manage all customers in the system" 
              : "View and manage your customer accounts"}
          </p>
        </div>
        
        <div className="flex gap-4">
          <div className="relative flex-1 min-w-[200px]">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search customers..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {user?.role === "admin" && (
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <UserPlusIcon className="mr-2 h-4 w-4" />
                  Add Customer
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Customer</DialogTitle>
                  <DialogDescription>
                    Enter customer details to create a new account
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input 
                      id="name" 
                      className="col-span-3"
                      value={newUser.name}
                      onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <Input 
                      id="email" 
                      type="email" 
                      className="col-span-3"
                      value={newUser.email}
                      onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="company" className="text-right">
                      Company
                    </Label>
                    <Input 
                      id="company" 
                      className="col-span-3"
                      value={newUser.company}
                      onChange={(e) => setNewUser({...newUser, company: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="role" className="text-right">
                      Role
                    </Label>
                    <select 
                      id="role" 
                      className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      value={newUser.role}
                      onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                    >
                      <option value="customer">Customer</option>
                      <option value="supplier">Supplier</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                </div>
                
                <DialogFooter>
                  <Button type="submit" onClick={handleAddUser}>Create Customer</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">{filteredUsers.length}</CardTitle>
            <CardDescription>
              {user?.role === "admin" ? "Total Customers" : "My Customers"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center text-blue-600">
              <UsersIcon className="mr-2 h-4 w-4" />
              <span>Customers</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">
              {filteredUsers.filter(u => u.status === "active").length}
            </CardTitle>
            <CardDescription>Active Accounts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              {filteredUsers.length > 0 
                ? Math.round((filteredUsers.filter(u => u.status === "active").length / filteredUsers.length) * 100)
                : 0}% of accounts are currently active
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">
              {filteredUsers.reduce((sum, user) => sum + user.orders, 0)}
            </CardTitle>
            <CardDescription>Total Orders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              Avg. {filteredUsers.length > 0 
                ? Math.round(filteredUsers.reduce((sum, user) => sum + user.orders, 0) / filteredUsers.length) 
                : 0} orders per customer
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>{user?.role === "admin" ? "All Customers" : "My Customers"}</CardTitle>
          <CardDescription>
            {user?.role === "admin" 
              ? "Manage customers and their access to the system" 
              : "View and manage your customer relationships"}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map(user => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.id.substring(0, 8)}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.company}</TableCell>
                    <TableCell>{user.orders}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={user.status === "active" ? "default" : "outline"}
                        className={user.status === "active" ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}
                      >
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">View</Button>
                      {user?.role === "admin" && (
                        <Button variant="ghost" size="sm">Edit</Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                    No customers found matching your criteria
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Users;
