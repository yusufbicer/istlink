import React, { useState } from 'react';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Package, Search, Filter, Plus, FileText, Truck, AlertCircle, CheckCircle, Clock, ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

// Sample data for demonstration
const sampleOrders = [
  {
    id: 'ORD-2023-1001',
    supplier: 'Turkish Textiles Ltd.',
    products: ['Cotton T-shirts (200 units)', 'Denim Jeans (100 units)'],
    total: '$5,240.00',
    status: 'processing',
    date: '2023-05-15',
    paymentStatus: 'paid',
    shippingStatus: 'preparing'
  },
  {
    id: 'ORD-2023-1002',
    supplier: 'Istanbul Furniture Co.',
    products: ['Wooden Chairs (50 units)', 'Coffee Tables (25 units)'],
    total: '$8,750.00',
    status: 'shipped',
    date: '2023-05-10',
    paymentStatus: 'paid',
    shippingStatus: 'in_transit'
  },
  {
    id: 'ORD-2023-1003',
    supplier: 'Anatolian Ceramics',
    products: ['Decorative Vases (75 units)', 'Ceramic Plates (150 units)'],
    total: '$3,125.00',
    status: 'pending',
    date: '2023-05-18',
    paymentStatus: 'pending',
    shippingStatus: 'not_started'
  },
  {
    id: 'ORD-2023-1004',
    supplier: 'Bosphorus Leather Goods',
    products: ['Leather Bags (30 units)', 'Wallets (100 units)'],
    total: '$4,890.00',
    status: 'completed',
    date: '2023-04-28',
    paymentStatus: 'paid',
    shippingStatus: 'delivered'
  },
  {
    id: 'ORD-2023-1005',
    supplier: 'Turkish Delight Sweets',
    products: ['Assorted Turkish Delights (500 boxes)', 'Baklava (200 boxes)'],
    total: '$6,750.00',
    status: 'processing',
    date: '2023-05-14',
    paymentStatus: 'partially_paid',
    shippingStatus: 'preparing'
  }
];

// Sample supplier orders for the supplier view
const supplierOrders = [
  {
    id: 'ORD-2023-2001',
    customer: 'Global Imports Inc.',
    products: ['Cotton T-shirts (500 units)', 'Hoodies (250 units)'],
    total: '$12,750.00',
    status: 'processing',
    date: '2023-05-16',
    paymentStatus: 'paid',
    productionStatus: 'in_progress'
  },
  {
    id: 'ORD-2023-2002',
    customer: 'European Retail Group',
    products: ['Denim Jeans (300 units)', 'Casual Shirts (200 units)'],
    total: '$9,840.00',
    status: 'ready',
    date: '2023-05-12',
    paymentStatus: 'paid',
    productionStatus: 'completed'
  },
  {
    id: 'ORD-2023-2003',
    customer: 'American Department Stores',
    products: ['Winter Jackets (150 units)', 'Scarves (300 units)'],
    total: '$14,250.00',
    status: 'pending',
    date: '2023-05-18',
    paymentStatus: 'pending',
    productionStatus: 'not_started'
  }
];

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  const statusMap: Record<string, { label: string, variant: "default" | "secondary" | "destructive" | "outline" }> = {
    processing: { label: 'Processing', variant: 'secondary' },
    shipped: { label: 'Shipped', variant: 'default' },
    pending: { label: 'Pending', variant: 'outline' },
    completed: { label: 'Completed', variant: 'default' },
    ready: { label: 'Ready for Pickup', variant: 'default' },
    cancelled: { label: 'Cancelled', variant: 'destructive' }
  };

  const { label, variant } = statusMap[status] || { label: status, variant: 'outline' };

  return <Badge variant={variant}>{label}</Badge>;
};

// Payment status badge component
const PaymentBadge = ({ status }: { status: string }) => {
  const statusMap: Record<string, { label: string, variant: "default" | "secondary" | "destructive" | "outline" | "success" }> = {
    paid: { label: 'Paid', variant: 'success' },
    pending: { label: 'Pending', variant: 'outline' },
    partially_paid: { label: 'Partially Paid', variant: 'secondary' },
    refunded: { label: 'Refunded', variant: 'destructive' }
  };

  // Custom success variant
  if (status === 'paid') {
    return <Badge className="bg-green-600 hover:bg-green-700">{statusMap[status].label}</Badge>;
  }

  const { label, variant } = statusMap[status] || { label: status, variant: 'outline' };

  return <Badge variant={variant as any}>{label}</Badge>;
};

// Shipping status badge component
const ShippingBadge = ({ status }: { status: string }) => {
  const statusMap: Record<string, { label: string, variant: "default" | "secondary" | "destructive" | "outline" }> = {
    not_started: { label: 'Not Started', variant: 'outline' },
    preparing: { label: 'Preparing', variant: 'secondary' },
    in_transit: { label: 'In Transit', variant: 'default' },
    delivered: { label: 'Delivered', variant: 'default' }
  };

  const { label, variant } = statusMap[status] || { label: status, variant: 'outline' };

  return <Badge variant={variant}>{label}</Badge>;
};

// Production status badge component
const ProductionBadge = ({ status }: { status: string }) => {
  const statusMap: Record<string, { label: string, variant: "default" | "secondary" | "destructive" | "outline" }> = {
    not_started: { label: 'Not Started', variant: 'outline' },
    in_progress: { label: 'In Progress', variant: 'secondary' },
    completed: { label: 'Completed', variant: 'default' }
  };

  const { label, variant } = statusMap[status] || { label: status, variant: 'outline' };

  return <Badge variant={variant}>{label}</Badge>;
};

const Orders = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showNewOrderDialog, setShowNewOrderDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [showOrderDetailsDialog, setShowOrderDetailsDialog] = useState(false);

  // Filter orders based on search term and status
  const filteredOrders = user?.role === "importer" 
    ? sampleOrders.filter(order => 
        (order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
         order.supplier.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (statusFilter === 'all' || order.status === statusFilter)
      )
    : supplierOrders.filter(order => 
        (order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
         order.customer.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (statusFilter === 'all' || order.status === statusFilter)
      );

  const handleOrderClick = (order: any) => {
    setSelectedOrder(order);
    setShowOrderDetailsDialog(true);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Orders</h1>
          <p className="text-gray-500">Manage and track your orders</p>
        </div>
        
        {user?.role === "importer" && (
          <Button onClick={() => setShowNewOrderDialog(true)}>
            <Plus className="mr-2 h-4 w-4" /> New Order
          </Button>
        )}
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search orders..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="shipped">Shipped</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            {user?.role === "supplier" && (
              <SelectItem value="ready">Ready for Pickup</SelectItem>
            )}
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {user?.role === "importer" && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Your Orders</CardTitle>
            <CardDescription>
              View and manage all your orders from Turkish suppliers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Shipping</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <TableRow key={order.id} className="cursor-pointer hover:bg-gray-50" onClick={() => handleOrderClick(order)}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.supplier}</TableCell>
                      <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                      <TableCell>{order.total}</TableCell>
                      <TableCell><StatusBadge status={order.status} /></TableCell>
                      <TableCell><PaymentBadge status={order.paymentStatus} /></TableCell>
                      <TableCell><ShippingBadge status={order.shippingStatus} /></TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={(e) => {
                              e.stopPropagation();
                              handleOrderClick(order);
                            }}>
                              View details
                            </DropdownMenuItem>
                            <DropdownMenuItem>Track shipment</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Download invoice</DropdownMenuItem>
                            {order.status !== 'cancelled' && order.status !== 'completed' && (
                              <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">Cancel order</DropdownMenuItem>
                              </>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-4 text-gray-500">
                      No orders found. Try adjusting your search or filters.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
      
      {user?.role === "supplier" && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Customer Orders</CardTitle>
            <CardDescription>
              Manage orders from your customers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Production</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <TableRow key={order.id} className="cursor-pointer hover:bg-gray-50" onClick={() => handleOrderClick(order)}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                      <TableCell>{order.total}</TableCell>
                      <TableCell><StatusBadge status={order.status} /></TableCell>
                      <TableCell><PaymentBadge status={order.paymentStatus} /></TableCell>
                      <TableCell><ProductionBadge status={order.productionStatus} /></TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={(e) => {
                              e.stopPropagation();
                              handleOrderClick(order);
                            }}>
                              View details
                            </DropdownMenuItem>
                            <DropdownMenuItem>Update status</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Generate invoice</DropdownMenuItem>
                            <DropdownMenuItem>Mark as ready</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-4 text-gray-500">
                      No orders found. Try adjusting your search or filters.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
      
      {user?.role === "admin" && (
        <Tabs defaultValue="all">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="processing">Processing</TabsTrigger>
            <TabsTrigger value="issues">Issues</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>All Orders</CardTitle>
                <CardDescription>
                  Complete overview of all orders in the system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Supplier</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {/* Combined and extended list for admin view */}
                    {[...sampleOrders, ...supplierOrders].slice(0, 5).map((order: any) => (
                      <TableRow key={order.id} className="cursor-pointer hover:bg-gray-50" onClick={() => handleOrderClick(order)}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.customer || "Direct Import"}</TableCell>
                        <TableCell>{order.supplier || "Various Suppliers"}</TableCell>
                        <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                        <TableCell>{order.total}</TableCell>
                        <TableCell><StatusBadge status={order.status} /></TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="pending">
            <Card>
              <CardHeader>
                <CardTitle>Pending Orders</CardTitle>
                <CardDescription>Orders awaiting processing or approval</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Pending orders content */}
                <div className="text-center py-8 text-gray-500">
                  <p>Pending orders will appear here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="processing">
            <Card>
              <CardHeader>
                <CardTitle>Processing Orders</CardTitle>
                <CardDescription>Orders currently being processed</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Processing orders content */}
                <div className="text-center py-8 text-gray-500">
                  <p>Processing orders will appear here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="issues">
            <Card>
              <CardHeader>
                <CardTitle>Orders with Issues</CardTitle>
                <CardDescription>Orders requiring attention</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Issues content */}
                <div className="text-center py-8 text-gray-500">
                  <p>Orders with issues will appear here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
      
      {/* New Order Dialog */}
      <Dialog open={showNewOrderDialog} onOpenChange={setShowNewOrderDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Order</DialogTitle>
            <DialogDescription>
              Enter the details for your new order from a Turkish supplier.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="supplier" className="text-right">
                Supplier
              </Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select supplier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="turkish-textiles">Turkish Textiles Ltd.</SelectItem>
                  <SelectItem value="istanbul-furniture">Istanbul Furniture Co.</SelectItem>
                  <SelectItem value="anatolian-ceramics">Anatolian Ceramics</SelectItem>
                  <SelectItem value="bosphorus-leather">Bosphorus Leather Goods</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="products" className="text-right">
                Products
              </Label>
              <div className="col-span-3 space-y-2">
                <div className="flex items-center space-x-2">
                  <Input id="product1" placeholder="Product name" />
                  <Input id="quantity1" placeholder="Qty" className="w-20" />
                  <Button variant="outline" size="sm">+</Button>
                </div>
                <div className="flex items-center space-x-2">
                  <Input id="product2" placeholder="Product name" />
                  <Input id="quantity2" placeholder="Qty" className="w-20" />
                  <Button variant="outline" size="sm">-</Button>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="shipping" className="text-right">
                Shipping Method
              </Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select shipping method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sea">Sea Freight</SelectItem>
                  <SelectItem value="air">Air Freight</SelectItem>
                  <SelectItem value="express">Express Courier</SelectItem>
                  <SelectItem value="consolidated">Consolidated Shipping</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="notes" className="text-right">
                Notes
              </Label>
              <Input id="notes" placeholder="Additional instructions" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="text-right">
                <Label htmlFor="consolidate">Consolidation</Label>
              </div>
              <div className="flex items-center space-x-2 col-span-3">
                <Checkbox id="consolidate" />
                <label
                  htmlFor="consolidate"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Add to consolidation group
                </label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewOrderDialog(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Order</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Order Details Dialog */}
      <Dialog open={showOrderDetailsDialog} onOpenChange={setShowOrderDetailsDialog}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>
              Complete information about order {selectedOrder?.id}
            </DialogDescription>
          </DialogHeader>
          
          {selectedOrder && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Order Information</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Order ID:</span>
                      <span className="text-sm font-medium">{selectedOrder.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Date:</span>
                      <span className="text-sm font-medium">{new Date(selectedOrder.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Status:</span>
                      <StatusBadge status={selectedOrder.status} />
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Total:</span>
                      <span className="text-sm font-medium">{selectedOrder.total}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    {user?.role === "importer" ? "Supplier Information" : "Customer Information"}
                  </h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Name:</span>
                      <span className="text-sm font-medium">
                        {user?.role === "importer" ? selectedOrder.supplier : selectedOrder.customer}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Contact:</span>
                      <span className="text-sm font-medium">+90 212 555 1234</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Email:</span>
                      <span className="text-sm font-medium">contact@example.com</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Location:</span>
                      <span className="text-sm font-medium">Istanbul, Turkey</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Products</h3>
                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead className="text-right">Quantity</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedOrder.products.map((product: string, index: number) => {
                        const [name, quantity] = product.split('(');
                        const cleanQuantity = quantity ? quantity.replace(')', '') : '';
                        
                        return (
                          <TableRow key={index}>
                            <TableCell>{name.trim()}</TableCell>
                            <TableCell className="text-right">{cleanQuantity}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Payment</h3>
                  <div className="p-3 border rounded-md space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Status:</span>
                      <PaymentBadge status={selectedOrder.paymentStatus} />
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Method:</span>
                      <span className="text-sm font-medium">Bank Transfer</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Date:</span>
                      <span className="text-sm font-medium">
                        {selectedOrder.paymentStatus === 'paid' ? new Date(selectedOrder.date).toLocaleDateString() : '-'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Shipping</h3>
                  <div className="p-3 border rounded-md space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Status:</span>
                      {user?.role === "importer" ? (
                        <ShippingBadge status={selectedOrder.shippingStatus} />
                      ) : (
                        <ProductionBadge status={selectedOrder.productionStatus} />
                      )}
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Method:</span>
                      <span className="text-sm font-medium">Sea Freight</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Tracking:</span>
                      <span className="text-sm font-medium">
                        {selectedOrder.status === 'shipped' ? 'TRK123456789' : '-'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Documents</h3>
                  <div className="p-3 border rounded-md space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <FileText className="mr-2 h-4 w-4" /> Invoice
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <FileText className="mr-2 h-4 w-4" /> Packing List
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <FileText className="mr-2 h-4 w-4" /> Bill of Lading
                    </Button>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Timeline</h3>
                <div className="p-3 border rounded-md">
                  <div className="space-y-4">
                    <div className="flex">
                      <div className="mr-3">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100">
                          <CheckCircle className="h-3 w-3 text-blue-600" />
                        </div>
                        <div className="h-full w-px bg-gray-200 mx-auto mt-1"></div>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Order Placed</p>
                        <p className="text-xs text-gray-500">{new Date(selectedOrder.date).toLocaleString()}</p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="mr-3">
                        {selectedOrder.paymentStatus === 'paid' ? (
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100">
                            <CheckCircle className="h-3 w-3 text-blue-600" />
                          </div>
                        ) : (
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100">
                            <Clock className="h-3 w-3 text-gray-400" />
                          </div>
                        )}
                        <div className="h-full w-px bg-gray-200 mx-auto mt-1"></div>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Payment Confirmed</p>
                        <p className="text-xs text-gray-500">
                          {selectedOrder.paymentStatus === 'paid' ? 
                            new Date(selectedOrder.date).toLocaleString() : 
                            'Pending payment confirmation'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="mr-3">
                        {selectedOrder.status === 'processing' || selectedOrder.status === 'shipped' || selectedOrder.status === 'completed' ? (
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100">
                            <CheckCircle className="h-3 w-3 text-blue-600" />
                          </div>
                        ) : (
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100">
                            <Clock className="h-3 w-3 text-gray-400" />
                          </div>
                        )}
                        <div className="h-full w-px bg-gray-200 mx-auto mt-1"></div>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Processing</p>
                        <p className="text-xs text-gray-500">
                          {selectedOrder.status === 'processing' || selectedOrder.status === 'shipped' || selectedOrder.status === 'completed' ? 
                            'Order is being processed' : 
                            'Waiting to begin processing'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="mr-3">
                        {selectedOrder.status === 'shipped' || selectedOrder.status === 'completed' ? (
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100">
                            <CheckCircle className="h-3 w-3 text-blue-600" />
                          </div>
                        ) : (
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100">
                            <Clock className="h-3 w-3 text-gray-400" />
                          </div>
                        )}
                        <div className="h-full w-px bg-gray-200 mx-auto mt-1"></div>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Shipped</p>
                        <p className="text-xs text-gray-500">
                          {selectedOrder.status === 'shipped' || selectedOrder.status === 'completed' ? 
                            'Order has been shipped' : 
                            'Waiting to be shipped'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="mr-3">
                        {selectedOrder.status === 'completed' ? (
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100">
                            <CheckCircle className="h-3 w-3 text-blue-600" />
                          </div>
                        ) : (
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100">
                            <Clock className="h-3 w-3 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium">Delivered</p>
                        <p className="text-xs text-gray-500">
                          {selectedOrder.status === 'completed' ? 
                            'Order has been delivered' : 
                            'Waiting to be delivered'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter className="gap-2 sm:gap-0">
            {user?.role === "importer" && selectedOrder?.status !== 'completed' && selectedOrder?.status !== 'cancelled' && (
              <Button variant="destructive" className="mr-auto">
                Cancel Order
              </Button>
            )}
            <Button variant="outline" onClick={() => setShowOrderDetailsDialog(false)}>
              Close
            </Button>
            {user?.role === "supplier" && selectedOrder?.status === 'pending' && (
              <Button>Process Order</Button>
            )}
            {user?.role === "importer" && selectedOrder?.status === 'processing' && (
              <Button>Track Order</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Orders;
