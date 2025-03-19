
import { useState } from "react";
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
import { UsersIcon, UserPlusIcon, SearchIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/auth";

// Mock data for users/customers
const mockUsers = [
  {
    id: "USR-001",
    name: "John Smith",
    email: "john@example.com",
    role: "buyer",
    company: "Global Imports Ltd.",
    orders: 12,
    status: "active"
  },
  {
    id: "USR-002",
    name: "Emma Johnson",
    email: "emma@example.com",
    role: "buyer",
    company: "Johnson Retailers",
    orders: 8,
    status: "active"
  },
  {
    id: "USR-003",
    name: "Michael Brown",
    email: "michael@example.com",
    role: "buyer",
    company: "Brown Wholesale",
    orders: 5,
    status: "inactive"
  },
  {
    id: "USR-004",
    name: "Sarah Davis",
    email: "sarah@example.com",
    role: "buyer",
    company: "Davis Distributors",
    orders: 15,
    status: "active"
  },
  {
    id: "USR-005",
    name: "Robert Wilson",
    email: "robert@example.com",
    role: "buyer",
    company: "Wilson Trade Co.",
    orders: 3,
    status: "active"
  }
];

const Users = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState(mockUsers);

  // Filter users based on search and role
  const filteredUsers = users.filter(u => {
    const matchesSearch = 
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    // For suppliers, they can only see buyers (their customers)
    if (user?.role === "supplier") {
      return matchesSearch && u.role === "buyer";
    }
    
    return matchesSearch;
  });

  // Add new user
  const handleAddUser = (userData: any) => {
    const newUser = {
      id: `USR-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      ...userData,
      orders: 0,
      status: "active"
    };
    
    setUsers([...users, newUser]);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">
            {user?.role === "admin" ? "All Users" : "My Customers"}
          </h1>
          <p className="text-muted-foreground">
            {user?.role === "admin" 
              ? "Manage all users and customers in the system" 
              : "View and manage your customer accounts"}
          </p>
        </div>
        
        <div className="flex gap-4">
          <div className="relative flex-1 min-w-[200px]">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search users..."
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
                  Add User
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New User</DialogTitle>
                  <DialogDescription>
                    Enter user details to create a new account
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input id="name" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <Input id="email" type="email" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="company" className="text-right">
                      Company
                    </Label>
                    <Input id="company" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="role" className="text-right">
                      Role
                    </Label>
                    <select 
                      id="role" 
                      className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <option value="buyer">Buyer</option>
                      <option value="supplier">Supplier</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                </div>
                
                <DialogFooter>
                  <Button type="submit">Create User</Button>
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
              {user?.role === "admin" ? "Total Users" : "Total Customers"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center text-blue-600">
              <UsersIcon className="mr-2 h-4 w-4" />
              <span>{user?.role === "admin" ? "Users" : "Customers"}</span>
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
              {Math.round((filteredUsers.filter(u => u.status === "active").length / filteredUsers.length) * 100)}% of accounts are currently active
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
              Avg. {Math.round(filteredUsers.reduce((sum, user) => sum + user.orders, 0) / filteredUsers.length)} orders per user
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>{user?.role === "admin" ? "All Users" : "My Customers"}</CardTitle>
          <CardDescription>
            {user?.role === "admin" 
              ? "Manage users and their access to the system" 
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
              {filteredUsers.map(user => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.id}</TableCell>
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
              ))}
              
              {filteredUsers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                    No users found matching your criteria
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
