
// Fix the buyer/customer role mismatch in Orders.tsx
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
  DialogTrigger,
  DialogClose
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
  AlertCircleIcon,
  XIcon,
  UserIcon
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/components/ui/use-toast";

// Mock data for orders
const initialOrders = [
  { 
    id: "ORD-1234", 
    supplier: "Textile Masters Co.", 
    supplierId: "1",
    buyer: "Fashion Retailer Inc.",
    buyerId: "3",
    items: [
      { name: "Cotton T-Shirt", quantity: 200, price: 4.5 },
      { name: "Denim Jeans", quantity: 100, price: 12.0 }
    ],
    total: 2100,
    date: "2023-07-25",
    status: "completed",
    consolidationId: "CONS-001",
    shipment: "SHP-567",
    payment: "paid"
  },
  { 
    id: "ORD-1235", 
    supplier: "Anatolian Ceramics",
    supplierId: "2",
    buyer: "Fashion Retailer Inc.",
    buyerId: "3",
    items: [
      { name: "Ceramic Plates", quantity: 50, price: 8.0 },
      { name: "Coffee Mugs", quantity: 100, price: 3.5 }
    ],
    total: 750,
    date: "2023-07-27",
    status: "processing",
    consolidationId: "CONS-001",
    shipment: "SHP-568",
    payment: "paid"
  },
  { 
    id: "ORD-1236", 
    supplier: "Turkish Delights Ltd.", 
    supplierId: "3",
    buyer: "Retail Chain Inc.",
    buyerId: "5",
    items: [
      { name: "Assorted Lokum Box", quantity: 300, price: 6.0 },
      { name: "Turkish Coffee", quantity: 200, price: 4.5 }
    ],
    total: 2700,
    date: "2023-07-28",
    status: "pending",
    consolidationId: null,
    shipment: null,
    payment: "pending"
  },
  { 
    id: "ORD-1237", 
    supplier: "Modern Furniture Co.", 
    supplierId: "4",
    buyer: "Gadget World",
    buyerId: "4",
    items: [
      { name: "Office Chair", quantity: 20, price: 75.0 },
      { name: "Desk Lamp", quantity: 30, price: 25.0 }
    ],
    total: 2250,
    date: "2023-07-29",
    status: "processing",
    consolidationId: "CONS-003",
    shipment: null,
    payment: "paid"
  },
  { 
    id: "ORD-1238", 
    supplier: "Bosphorus Tech", 
    supplierId: "2",
    buyer: "Gadget World",
    buyerId: "4",
    items: [
      { name: "Bluetooth Speaker", quantity: 50, price: 35.0 },
      { name: "Wireless Earbuds", quantity: 100, price: 22.0 }
    ],
    total: 3950,
    date: "2023-07-30",
    status: "pending",
    consolidationId: "CONS-003",
    shipment: null,
    payment: "pending"
  },
];

// Mock data for suppliers and buyers for admin order creation
const mockSuppliers = [
  { id: "1", name: "Textile Masters Co." },
  { id: "2", name: "Bosphorus Tech" },
  { id: "3", name: "Turkish Delights Ltd." },
  { id: "4", name: "Modern Furniture Co." },
  { id: "5", name: "Anatolian Ceramics" }
];

const mockBuyers = [
  { id: "3", name: "Fashion Retailer Inc." },
  { id: "4", name: "Gadget World" },
  { id: "5", name: "Retail Chain Inc." }
];

const Orders = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [orders, setOrders] = useState(initialOrders);
  const [filteredOrders, setFilteredOrders] = useState(initialOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [isVisible, setIsVisible] = useState(false);
  const [newOrder, setNewOrder] = useState({
    supplier: "",
    buyer: user?.role === "admin" ? "" : user?.id || "",
    items: [{ name: "", quantity: 1, price: 0 }]
  });

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
        order.buyer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // For supplier role, only show their own orders
    if (user?.role === "supplier") {
      // For demo purposes, supplier with id 1 is "Textile Masters Co." and supplier with id 2 is "Bosphorus Tech"
      const supplierNameToFilter = user.name.includes("Supplier") ? "Textile Masters Co." : "Bosphorus Tech";
      filtered = filtered.filter(order => order.supplier === supplierNameToFilter);
    }
    
    // For customer role, only show their own orders
    if (user?.role === "customer") {
      // For demo purposes, buyer with id 3 is "Fashion Retailer Inc." and buyer with id 4 is "Gadget World"
      const buyerNameToFilter = user.name.includes("Buyer") ? "Fashion Retailer Inc." : "Gadget World";
      filtered = filtered.filter(order => order.buyer === buyerNameToFilter);
    }
    
    setFilteredOrders(filtered);
  }, [searchTerm, activeTab, orders, user]);

  // Add new item to order form
  const addItemToOrder = () => {
    setNewOrder({
      ...newOrder,
      items: [...newOrder.items, { name: "", quantity: 1, price: 0 }]
    });
  };

  // Remove item from order form
  const removeItemFromOrder = (index: number) => {
    if (newOrder.items.length > 1) {
      setNewOrder({
        ...newOrder,
        items: newOrder.items.filter((_, i) => i !== index)
      });
    }
  };

  // Update item in order form
  const updateItemInOrder = (index: number, field: keyof typeof newOrder.items[0], value: any) => {
    const updatedItems = [...newOrder.items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    
    setNewOrder({
      ...newOrder,
      items: updatedItems
    });
  };

  // Create new order
  const handleCreateOrder = () => {
    // Validate form
    if (!newOrder.supplier) {
      toast({
        title: "Validation Error",
        description: "Please select a supplier.",
        variant: "destructive"
      });
      return;
    }

    if (user?.role === "admin" && !newOrder.buyer) {
      toast({
        title: "Validation Error",
        description: "Please select a buyer.",
        variant: "destructive"
      });
      return;
    }

    if (newOrder.items.some(item => !item.name || item.quantity <= 0)) {
      toast({
        title: "Validation Error",
        description: "Please fill in all item details with valid quantities.",
        variant: "destructive"
      });
      return;
    }

    // Calculate total
    const total = newOrder.items.reduce(
      (sum, item) => sum + (item.quantity * item.price), 0
    );
    
    // Get supplier and buyer details
    const supplierDetails = mockSuppliers.find(s => s.id === newOrder.supplier);
    const buyerDetails = user?.role === "admin" 
      ? mockBuyers.find(b => b.id === newOrder.buyer)
      : { id: user?.id || "3", name: user?.name || "Fashion Retailer Inc." };
    
    if (!supplierDetails || !buyerDetails) {
      toast({
        title: "Error",
        description: "Invalid supplier or buyer selection.",
        variant: "destructive"
      });
      return;
    }

    // Create new order object
    const newOrderObj = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      supplier: supplierDetails.name,
      supplierId: supplierDetails.id,
      buyer: buyerDetails.name,
      buyerId: buyerDetails.id,
      items: newOrder.items,
      total: Math.round(total * 100) / 100,
      date: new Date().toISOString().split('T')[0],
      status: "pending",
      consolidationId: null,
      shipment: null,
      payment: "pending"
    };
    
    // Add to orders list
    setOrders([...orders, newOrderObj]);
    
    // Reset form
    setNewOrder({
      supplier: "",
      buyer: user?.role === "admin" ? "" : user?.id || "",
      items: [{ name: "", quantity: 1, price: 0 }]
    });
    
    toast({
      title: "Order Created",
      description: `Order ${newOrderObj.id} has been successfully created.`
    });
  };

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

  // Calculate subtotal
  const calculateSubtotal = () => {
    return newOrder.items.reduce(
      (sum, item) => sum + (item.quantity * item.price), 0
    );
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
            <DialogContent className="max-w-2xl">
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
                  <div className="col-span-3">
                    <select
                      id="supplier"
                      className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      value={newOrder.supplier}
                      onChange={(e) => setNewOrder({...newOrder, supplier: e.target.value})}
                    >
                      <option value="">Select a supplier</option>
                      {mockSuppliers.map(supplier => (
                        <option key={supplier.id} value={supplier.id}>
                          {supplier.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                {user?.role === "admin" && (
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="buyer" className="text-right">
                      Buyer
                    </Label>
                    <div className="col-span-3">
                      <select
                        id="buyer"
                        className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        value={newOrder.buyer}
                        onChange={(e) => setNewOrder({...newOrder, buyer: e.target.value})}
                      >
                        <option value="">Select a buyer</option>
                        {mockBuyers.map(buyer => (
                          <option key={buyer.id} value={buyer.id}>
                            {buyer.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
                
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="items" className="text-right mt-2">
                    Items
                  </Label>
                  <div className="col-span-3 space-y-3">
                    {newOrder.items.map((item, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className="flex-1">
                          <Input
                            placeholder="Product name"
                            value={item.name}
                            onChange={(e) => updateItemInOrder(index, "name", e.target.value)}
                          />
                        </div>
                        <div className="w-20">
                          <Input
                            placeholder="Qty"
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => updateItemInOrder(index, "quantity", parseInt(e.target.value) || 0)}
                          />
                        </div>
                        <div className="w-24">
                          <Input
                            placeholder="Price"
                            type="number"
                            step="0.01"
                            min="0"
                            value={item.price}
                            onChange={(e) => updateItemInOrder(index, "price", parseFloat(e.target.value) || 0)}
                          />
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItemFromOrder(index)}
                          disabled={newOrder.items.length <= 1}
                        >
                          <XIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    
                    <Button variant="outline" size="sm" onClick={addItemToOrder}>
                      <PlusIcon className="mr-2 h-3 w-3" />
                      Add Another Item
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <div className="text-right">
                    Subtotal
                  </div>
                  <div className="col-span-3 font-medium">
                    ${calculateSubtotal().toFixed(2)}
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
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button onClick={handleCreateOrder}>Submit Order</Button>
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
                {(user?.role === "admin" || user?.role === "supplier") && (
                  <TableHead>Buyer</TableHead>
                )}
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Consolidation</TableHead>
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
                  {(user?.role === "admin" || user?.role === "supplier") && (
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <UserIcon className="h-4 w-4 text-green-600" />
                        <span>{order.buyer}</span>
                      </div>
                    </TableCell>
                  )}
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
                    {order.consolidationId ? (
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">
                        {order.consolidationId}
                      </Badge>
                    ) : (
                      <span className="text-muted-foreground text-sm">Not assigned</span>
                    )}
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
                            <DropdownMenuItem>Add Note</DropdownMenuItem>
                          </>
                        )}
                        {user?.role === "supplier" && order.status === "pending" && (
                          <DropdownMenuItem>Process Order</DropdownMenuItem>
                        )}
                        {user?.role === "admin" && order.status === "pending" && !order.consolidationId && (
                          <DropdownMenuItem>Add to Consolidation</DropdownMenuItem>
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
                  <TableCell colSpan={user?.role === "admin" ? 10 : 9} className="text-center py-8 text-muted-foreground">
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
