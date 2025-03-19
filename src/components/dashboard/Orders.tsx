
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger 
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  PlusIcon, 
  MoreHorizontalIcon, 
  SearchIcon, 
  FileTextIcon,
  CheckCircleIcon,
  ClockIcon,
  TruckIcon,
  PackageIcon,
  AlertCircleIcon
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/auth";

// Mock data for orders
const initialOrders = [
  { 
    id: "ORD-1234", 
    supplier: "Textile Masters Co.", 
    items: [
      { name: "Cotton T-Shirt", quantity: 200, price: 4.5 },
      { name: "Denim Jeans", quantity: 100, price: 12.0 }
    ],
    total: 2100,
    date: "2023-07-25",
    status: "completed",
    shipment: "SHP-567",
    payment: "paid"
  },
  { 
    id: "ORD-1235", 
    supplier: "Anatolian Ceramics", 
    items: [
      { name: "Ceramic Plates", quantity: 50, price: 8.0 },
      { name: "Coffee Mugs", quantity: 100, price: 3.5 }
    ],
    total: 750,
    date: "2023-07-27",
    status: "processing",
    shipment: "SHP-568",
    payment: "paid"
  },
  { 
    id: "ORD-1236", 
    supplier: "Turkish Delights Ltd.", 
    items: [
      { name: "Assorted Lokum Box", quantity: 300, price: 6.0 },
      { name: "Turkish Coffee", quantity: 200, price: 4.5 }
    ],
    total: 2700,
    date: "2023-07-28",
    status: "pending",
    shipment: null,
    payment: "pending"
  },
  { 
    id: "ORD-1237", 
    supplier: "Modern Furniture Co.", 
    items: [
      { name: "Office Chair", quantity: 20, price: 75.0 },
      { name: "Desk Lamp", quantity: 30, price: 25.0 }
    ],
    total: 2250,
    date: "2023-07-29",
    status: "processing",
    shipment: null,
    payment: "paid"
  },
  { 
    id: "ORD-1238", 
    supplier: "Bosphorus Tech", 
    items: [
      { name: "Bluetooth Speaker", quantity: 50, price: 35.0 },
      { name: "Wireless Earbuds", quantity: 100, price: 22.0 }
    ],
    total: 3950,
    date: "2023-07-30",
    status: "pending",
    shipment: null,
    payment: "pending"
  },
];

const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState(initialOrders);
  const [filteredOrders, setFilteredOrders] = useState(initialOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Filter orders based on search term and active tab
  useEffect(() => {
    let filtered = orders;
    
    // Filter by tab
    if (activeTab !== "all") {
      filtered = filtered.filter(order => order.status === activeTab);
    }
    
    // Filter by search
    if (searchTerm) {
      filtered = filtered.filter(order => 
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // For supplier role, only show their own orders
    if (user?.role === "supplier") {
      const supplierName = user.name.includes("Supplier") ? "Textile Masters Co." : user.name;
      filtered = filtered.filter(order => order.supplier === supplierName);
    }
    
    setFilteredOrders(filtered);
  }, [searchTerm, activeTab, orders, user]);

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircleIcon className="h-4 w-4 text-green-500" />;
      case "processing":
        return <TruckIcon className="h-4 w-4 text-blue-500" />;
      case "pending":
        return <ClockIcon className="h-4 w-4 text-yellow-500" />;
      case "cancelled":
        return <AlertCircleIcon className="h-4 w-4 text-red-500" />;
      default:
        return <PackageIcon className="h-4 w-4" />;
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Orders</h1>
          <p className="text-muted-foreground">Manage and track your orders from suppliers.</p>
        </div>
        
        {user?.role !== "supplier" && (
          <Dialog>
            <DialogTrigger asChild>
              <Button className="h-10">
                <PlusIcon className="mr-2 h-4 w-4" />
                New Order
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Order</DialogTitle>
                <DialogDescription>
                  Enter the details for your new order request.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="supplier" className="text-right">
                    Supplier
                  </Label>
                  <Input
                    id="supplier"
                    placeholder="Select supplier"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="items" className="text-right">
                    Items
                  </Label>
                  <div className="col-span-3">
                    <Input
                      placeholder="Product name"
                      className="mb-2"
                    />
                    <div className="flex gap-2 mb-2">
                      <Input
                        placeholder="Quantity"
                        type="number"
                        className="w-1/3"
                      />
                      <Input
                        placeholder="Price per unit"
                        type="number"
                        step="0.01"
                        className="w-2/3"
                      />
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      <PlusIcon className="mr-2 h-3 w-3" />
                      Add Another Item
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="notes" className="text-right">
                    Notes
                  </Label>
                  <Input
                    id="notes"
                    placeholder="Additional instructions"
                    className="col-span-3"
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button>Submit Order</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
      
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="processing">Processing</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="flex gap-4">
          <div className="relative flex-1 min-w-[200px]">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search orders..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {user?.role !== "supplier" && (
            <Button variant="outline">Export</Button>
          )}
        </div>
      </div>
      
      <Card 
        className={`transition-all duration-500 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order, index) => (
                <TableRow 
                  key={order.id}
                  className={`transition-all duration-500 transform ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <FileTextIcon className="h-4 w-4 text-blue-600" />
                      </div>
                      {order.id}
                    </div>
                  </TableCell>
                  <TableCell>{order.supplier}</TableCell>
                  <TableCell>
                    <div className="max-w-[180px]">
                      {order.items.map((item, i) => (
                        <div key={i} className="text-sm truncate">
                          {item.quantity} × {item.name}
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>${order.total.toLocaleString()}</TableCell>
                  <TableCell>{formatDate(order.date)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      {getStatusIcon(order.status)}
                      <Badge
                        variant={
                          order.status === "completed" ? "default" :
                          order.status === "processing" ? "secondary" :
                          order.status === "pending" ? "outline" :
                          "destructive"
                        }
                        className="capitalize"
                      >
                        {order.status}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={order.payment === "paid" ? "default" : "outline"}
                      className={`capitalize ${
                        order.payment === "paid" ? "bg-green-100 text-green-800 hover:bg-green-100" : ""
                      }`}
                    >
                      {order.payment}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontalIcon className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        {user?.role !== "supplier" && (
                          <>
                            <DropdownMenuItem>Track Shipment</DropdownMenuItem>
                            <DropdownMenuItem>Download Invoice</DropdownMenuItem>
                          </>
                        )}
                        {user?.role === "supplier" && order.status === "pending" && (
                          <DropdownMenuItem>Process Order</DropdownMenuItem>
                        )}
                        {order.status === "pending" && (
                          <DropdownMenuItem className="text-red-600">Cancel Order</DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              
              {filteredOrders.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    No orders found matching your criteria.
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

export default Orders;
