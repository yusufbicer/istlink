import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { PermissionGuard } from "@/components/ui/permission-guard";
import { WithLoading } from "@/components/ui/loading";
import ErrorBoundary from "@/components/ui/error-boundary";
import { useAuth } from "@/lib/auth";
import { useAsync } from "@/hooks/use-async";
import { orderService, Order } from "@/lib/api";
import { 
  Plus, 
  Search, 
  FileText, 
  ClipboardCheck, 
  TruckIcon,
  Package,
  CheckCircle,
  RefreshCcw
} from "lucide-react";

// Enhanced with stages that match our workflow
const OrderStages = {
  ORDER_CREATION: "order_creation",
  ORDER_CONFIRMATION: "order_confirmation",
  INVOICE_MANAGEMENT: "invoice_management",
  PAYMENT_PROCESSING: "payment_processing",
  SHIPPING_TO_WAREHOUSE: "shipping_to_warehouse",
  READY_FOR_CONSOLIDATION: "ready_for_consolidation"
};

const Orders = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentFilter, setCurrentFilter] = useState("all");
  
  // Use the async hook for data fetching with loading state
  const { data: orders, isLoading, error, execute: fetchOrders } = 
    useAsync<Order[], []>(() => orderService.getOrders(true), true);
  
  // Filter orders based on search term and current tab
  const filteredOrders = orders ? orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.supplierName.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (currentFilter === "all") return matchesSearch;
    return matchesSearch && order.status === currentFilter;
  }) : [];

  // Get status badge based on order status
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline">Pending</Badge>;
      case "confirmed":
        return <Badge variant="secondary">Confirmed</Badge>;
      case "invoiced":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Invoiced</Badge>;
      case "paid":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Paid</Badge>;
      case "shipped":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Shipped</Badge>;
      case "delivered":
        return <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-100">Delivered</Badge>;
      case "ready_for_consolidation":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Ready for Consolidation</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <ErrorBoundary>
      <WithLoading isLoading={isLoading} loadingMessage="Loading orders...">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold">Orders</h1>
              <p className="text-muted-foreground">Manage orders in the consolidation workflow</p>
            </div>
            
            <div className="flex gap-4">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search orders..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              {/* Only allow customers and admins to create new orders */}
              <PermissionGuard resource="orders" action="create" fallback={null}>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  New Order
                </Button>
              </PermissionGuard>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl">
                  {orders?.filter(o => o.status === "pending").length || 0}
                </CardTitle>
                <CardDescription>Pending Orders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold flex items-center text-amber-600">
                  <FileText className="mr-2 h-4 w-4" />
                  <span>Action Required</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl">
                  {orders?.filter(o => o.status === "confirmed" || o.status === "invoiced").length || 0}
                </CardTitle>
                <CardDescription>In Progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold flex items-center text-blue-600">
                  <ClipboardCheck className="mr-2 h-4 w-4" />
                  <span>Processing</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl">
                  {orders?.filter(o => o.status === "ready_for_consolidation").length || 0}
                </CardTitle>
                <CardDescription>Ready for Consolidation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold flex items-center text-green-600">
                  <Package className="mr-2 h-4 w-4" />
                  <span>Ready</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {error && (
            <Card className="border-red-200 bg-red-50">
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <div className="mr-4 text-red-500">
                    An error occurred: {error.message}
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => fetchOrders()}
                    className="ml-auto"
                  >
                    <RefreshCcw className="mr-2 h-4 w-4" />
                    Retry
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
          
          <Tabs defaultValue="all" onValueChange={setCurrentFilter}>
            <TabsList>
              <TabsTrigger value="all">All Orders</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
              <TabsTrigger value="invoiced">Invoiced</TabsTrigger>
              <TabsTrigger value="paid">Paid</TabsTrigger>
              <TabsTrigger value="shipped">Shipped</TabsTrigger>
              <TabsTrigger value="ready_for_consolidation">Ready for Consolidation</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>All Orders</CardTitle>
                  <CardDescription>Manage and track your orders through the workflow</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Supplier</TableHead>
                        <TableHead>Items</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredOrders.length > 0 ? (
                        filteredOrders.map(order => (
                          <TableRow key={order.id}>
                            <TableCell className="font-medium">{order.id}</TableCell>
                            <TableCell>{order.customerName}</TableCell>
                            <TableCell>{order.supplierName}</TableCell>
                            <TableCell>{order.items}</TableCell>
                            <TableCell>${order.amount}</TableCell>
                            <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                            <TableCell>{getStatusBadge(order.status)}</TableCell>
                            <TableCell className="text-right">
                              {/* Different actions based on status and user role */}
                              {order.status === "pending" && (
                                <PermissionGuard resource="orders" action="update">
                                  <Button variant="outline" size="sm">Confirm</Button>
                                </PermissionGuard>
                              )}
                              
                              {order.status === "confirmed" && (
                                <PermissionGuard resource="invoices" action="create">
                                  <Button variant="outline" size="sm">Create Invoice</Button>
                                </PermissionGuard>
                              )}
                              
                              {order.status === "invoiced" && (
                                <PermissionGuard resource="payments" action="create">
                                  <Button variant="outline" size="sm">Process Payment</Button>
                                </PermissionGuard>
                              )}
                              
                              {order.status === "paid" && (
                                <PermissionGuard resource="shipping" action="create">
                                  <Button variant="outline" size="sm">
                                    <TruckIcon className="mr-2 h-3 w-3" />
                                    Ship to Warehouse
                                  </Button>
                                </PermissionGuard>
                              )}
                              
                              {order.status === "shipped" && (
                                <PermissionGuard resource="warehouse" action="update">
                                  <Button variant="outline" size="sm">
                                    <CheckCircle className="mr-2 h-3 w-3" />
                                    Mark as Received
                                  </Button>
                                </PermissionGuard>
                              )}
                              
                              {/* View details available for all */}
                              <Button variant="ghost" size="sm" className="ml-2">
                                Details
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={8} className="h-24 text-center">
                            {searchTerm ? "No matching orders found" : "No orders yet"}
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Similar content for other tabs - omitted for brevity */}
            {["pending", "confirmed", "invoiced", "paid", "shipped", "ready_for_consolidation"].map(status => (
              <TabsContent key={status} value={status} className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="capitalize">{status.replace('_', ' ')} Orders</CardTitle>
                    <CardDescription>Manage orders in {status.replace('_', ' ')} status</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    {/* Similar table as above, filtered by status */}
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Order ID</TableHead>
                          <TableHead>Customer</TableHead>
                          <TableHead>Supplier</TableHead>
                          <TableHead>Items</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredOrders.filter(order => order.status === status).length > 0 ? (
                          filteredOrders.filter(order => order.status === status).map(order => (
                            <TableRow key={order.id}>
                              <TableCell className="font-medium">{order.id}</TableCell>
                              <TableCell>{order.customerName}</TableCell>
                              <TableCell>{order.supplierName}</TableCell>
                              <TableCell>{order.items}</TableCell>
                              <TableCell>${order.amount}</TableCell>
                              <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                              <TableCell>{getStatusBadge(order.status)}</TableCell>
                              <TableCell className="text-right">
                                {/* Different actions based on status and user role */}
                                {order.status === "pending" && (
                                  <PermissionGuard resource="orders" action="update">
                                    <Button variant="outline" size="sm">Confirm</Button>
                                  </PermissionGuard>
                                )}
                                
                                {order.status === "confirmed" && (
                                  <PermissionGuard resource="invoices" action="create">
                                    <Button variant="outline" size="sm">Create Invoice</Button>
                                  </PermissionGuard>
                                )}
                                
                                {order.status === "invoiced" && (
                                  <PermissionGuard resource="payments" action="create">
                                    <Button variant="outline" size="sm">Process Payment</Button>
                                  </PermissionGuard>
                                )}
                                
                                {order.status === "paid" && (
                                  <PermissionGuard resource="shipping" action="create">
                                    <Button variant="outline" size="sm">
                                      <TruckIcon className="mr-2 h-3 w-3" />
                                      Ship to Warehouse
                                    </Button>
                                  </PermissionGuard>
                                )}
                                
                                {order.status === "shipped" && (
                                  <PermissionGuard resource="warehouse" action="update">
                                    <Button variant="outline" size="sm">
                                      <CheckCircle className="mr-2 h-3 w-3" />
                                      Mark as Received
                                    </Button>
                                  </PermissionGuard>
                                )}
                                
                                {/* View details available for all */}
                                <Button variant="ghost" size="sm" className="ml-2">
                                  Details
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={8} className="h-24 text-center">
                              {searchTerm ? "No matching orders found" : "No orders yet"}
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </WithLoading>
    </ErrorBoundary>
  );
};

export default Orders;
