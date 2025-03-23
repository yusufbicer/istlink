
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
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
import { useToast } from "@/components/ui/use-toast";
import { PermissionGuard } from "@/components/ui/permission-guard";
import { 
  BoxesIcon, 
  MoreHorizontalIcon, 
  SearchIcon, 
  PlusIcon, 
  TruckIcon, 
  FileIcon, 
  PackageIcon, 
  DownloadIcon 
} from "lucide-react";
import { useAuth } from "@/lib/auth";

// Mock consolidations data
const initialConsolidations = [
  {
    id: "CONS-001",
    name: "Summer Collection Shipment",
    orders: ["ORD-1234", "ORD-1235", "ORD-1236"],
    status: "processing",
    totalWeight: 325,
    totalValue: 5550,
    createdAt: "2023-08-10T14:30:00Z",
    shippingDate: "2023-08-25T00:00:00Z",
    trackingNumber: "TRK123456789",
    hasPayment: true
  },
  {
    id: "CONS-002",
    name: "Fall Inventory Restock",
    orders: ["ORD-1237", "ORD-1238"],
    status: "pending",
    totalWeight: 450,
    totalValue: 6200,
    createdAt: "2023-08-15T09:45:00Z",
    shippingDate: null,
    trackingNumber: null,
    hasPayment: false
  },
  {
    id: "CONS-003",
    name: "Electronics Shipment",
    orders: ["ORD-1239", "ORD-1240", "ORD-1241"],
    status: "shipped",
    totalWeight: 175,
    totalValue: 8750,
    createdAt: "2023-08-05T11:20:00Z",
    shippingDate: "2023-08-15T00:00:00Z",
    trackingNumber: "TRK987654321",
    hasPayment: true
  }
];

// Mock orders data for consolidation
const availableOrders = [
  { id: "ORD-1234", supplier: "Textile Masters Co.", status: "completed", value: 2100, weight: 125 },
  { id: "ORD-1235", supplier: "Anatolian Ceramics", status: "processing", value: 750, weight: 80 },
  { id: "ORD-1236", supplier: "Turkish Delights Ltd.", status: "pending", value: 2700, weight: 120 },
  { id: "ORD-1237", supplier: "Modern Furniture Co.", status: "processing", value: 2250, weight: 320 },
  { id: "ORD-1238", supplier: "Bosphorus Tech", status: "pending", value: 3950, weight: 130 }
];

const Consolidations = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [consolidations, setConsolidations] = useState(initialConsolidations);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrderIds, setSelectedOrderIds] = useState<string[]>([]);
  const [newConsolidation, setNewConsolidation] = useState({
    name: "",
    shippingDate: ""
  });

  // Filter consolidations based on search term
  const filteredConsolidations = consolidations.filter(cons =>
    cons.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cons.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Format date
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Not scheduled";
    
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="capitalize">Pending</Badge>;
      case 'processing':
        return <Badge variant="secondary" className="capitalize">Processing</Badge>;
      case 'shipped':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100 capitalize">Shipped</Badge>;
      case 'delivered':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 capitalize">Delivered</Badge>;
      default:
        return <Badge variant="outline" className="capitalize">{status}</Badge>;
    }
  };

  // Handle order selection in create modal
  const handleOrderSelection = (orderId: string) => {
    setSelectedOrderIds(ids => 
      ids.includes(orderId) 
        ? ids.filter(id => id !== orderId)
        : [...ids, orderId]
    );
  };

  // Create new consolidation
  const handleCreateConsolidation = () => {
    if (!newConsolidation.name || selectedOrderIds.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please provide a name and select at least one order.",
        variant: "destructive"
      });
      return;
    }
    
    // Calculate total weight and value
    const selectedOrders = availableOrders.filter(order => 
      selectedOrderIds.includes(order.id)
    );
    
    const totalWeight = selectedOrders.reduce((sum, order) => sum + order.weight, 0);
    const totalValue = selectedOrders.reduce((sum, order) => sum + order.value, 0);
    
    const newConsolidationObj = {
      id: `CONS-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      name: newConsolidation.name,
      orders: selectedOrderIds,
      status: "pending",
      totalWeight,
      totalValue,
      createdAt: new Date().toISOString(),
      shippingDate: newConsolidation.shippingDate ? new Date(newConsolidation.shippingDate).toISOString() : null,
      trackingNumber: null,
      hasPayment: false
    };
    
    setConsolidations([...consolidations, newConsolidationObj]);
    
    // Reset form
    setNewConsolidation({ name: "", shippingDate: "" });
    setSelectedOrderIds([]);
    
    toast({
      title: "Consolidation Created",
      description: `${newConsolidationObj.name} has been created with ${selectedOrderIds.length} orders.`
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Consolidations</h1>
          <p className="text-muted-foreground">
            Manage order consolidations and shipments
          </p>
        </div>
        
        <div className="flex gap-4">
          <div className="relative flex-1 min-w-[200px]">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search consolidations..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Use PermissionGuard to control access to create consolidation */}
          <PermissionGuard resource="consolidation" action="create" fallback={null}>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <PlusIcon className="mr-2 h-4 w-4" />
                  New Consolidation
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle>Create New Consolidation</DialogTitle>
                  <DialogDescription>
                    Combine multiple orders into a single shipment
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid gap-6 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="cons-name" className="text-right">
                      Name
                    </Label>
                    <Input 
                      id="cons-name" 
                      placeholder="Consolidation name"
                      className="col-span-3"
                      value={newConsolidation.name}
                      onChange={(e) => setNewConsolidation({...newConsolidation, name: e.target.value})}
                    />
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="shipping-date" className="text-right">
                      Shipping Date
                    </Label>
                    <Input 
                      id="shipping-date" 
                      type="date"
                      className="col-span-3"
                      value={newConsolidation.shippingDate}
                      onChange={(e) => setNewConsolidation({...newConsolidation, shippingDate: e.target.value})}
                    />
                  </div>
                  
                  <div className="grid grid-cols-4 items-start gap-4">
                    <Label className="text-right pt-2">
                      Select Orders
                    </Label>
                    <div className="col-span-3 border rounded-md p-4 max-h-[300px] overflow-y-auto">
                      <div className="space-y-4">
                        {availableOrders.map(order => (
                          <div key={order.id} className="flex items-center space-x-3 border-b pb-2">
                            <Checkbox 
                              id={order.id} 
                              checked={selectedOrderIds.includes(order.id)}
                              onCheckedChange={() => handleOrderSelection(order.id)}
                            />
                            <div className="flex-1 grid grid-cols-4 gap-2">
                              <Label htmlFor={order.id} className="font-medium">
                                {order.id}
                              </Label>
                              <span className="text-sm text-muted-foreground">
                                {order.supplier}
                              </span>
                              <span className="text-sm">
                                ${order.value}
                              </span>
                              <span className="text-sm">
                                {order.weight} kg
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {availableOrders.length === 0 && (
                        <p className="text-center py-4 text-muted-foreground">
                          No eligible orders available for consolidation
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <div className="text-right text-sm text-muted-foreground">
                      Summary
                    </div>
                    <div className="col-span-3 bg-gray-50 p-3 rounded-md">
                      <div className="flex justify-between text-sm">
                        <span>Selected Orders:</span>
                        <span className="font-medium">{selectedOrderIds.length}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Total Weight:</span>
                        <span className="font-medium">
                          {availableOrders
                            .filter(order => selectedOrderIds.includes(order.id))
                            .reduce((sum, order) => sum + order.weight, 0)} kg
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Total Value:</span>
                        <span className="font-medium">
                          ${availableOrders
                            .filter(order => selectedOrderIds.includes(order.id))
                            .reduce((sum, order) => sum + order.value, 0)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button 
                    onClick={handleCreateConsolidation}
                    disabled={!newConsolidation.name || selectedOrderIds.length === 0}
                  >
                    Create Consolidation
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </PermissionGuard>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">{consolidations.length}</CardTitle>
            <CardDescription>Total Consolidations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center text-blue-600">
              <BoxesIcon className="mr-2 h-4 w-4" />
              <span>Consolidations</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">
              {consolidations.filter(c => c.status === "shipped" || c.status === "delivered").length}
            </CardTitle>
            <CardDescription>Shipped</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              {Math.round((consolidations.filter(c => c.status === "shipped" || c.status === "delivered").length / consolidations.length) * 100)}% of consolidations have been shipped
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">
              {consolidations.reduce((total, cons) => total + cons.orders.length, 0)}
            </CardTitle>
            <CardDescription>Total Orders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              Avg. {(consolidations.reduce((total, cons) => total + cons.orders.length, 0) / consolidations.length).toFixed(1)} orders per consolidation
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>All Consolidations</CardTitle>
          <CardDescription>
            View and manage consolidated shipments
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Weight</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Shipping Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredConsolidations.length > 0 ? (
                filteredConsolidations.map(consolidation => (
                  <TableRow key={consolidation.id}>
                    <TableCell className="font-medium">{consolidation.id}</TableCell>
                    <TableCell>{consolidation.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <PackageIcon className="h-4 w-4 text-blue-600" />
                        <span>{consolidation.orders.length}</span>
                      </div>
                    </TableCell>
                    <TableCell>{consolidation.totalWeight} kg</TableCell>
                    <TableCell>${consolidation.totalValue}</TableCell>
                    <TableCell>{formatDate(consolidation.shippingDate)}</TableCell>
                    <TableCell>{getStatusBadge(consolidation.status)}</TableCell>
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
                          <DropdownMenuItem>
                            <FileIcon className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          
                          {/* Use PermissionGuard for role-specific actions */}
                          <PermissionGuard resource="consolidation" action="update" fallback={null}>
                            {consolidation.status !== "shipped" && (
                              <>
                                <DropdownMenuItem>
                                  <TruckIcon className="h-4 w-4 mr-2" />
                                  Mark as Shipped
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <PlusIcon className="h-4 w-4 mr-2" />
                                  Add Orders
                                </DropdownMenuItem>
                              </>
                            )}
                          </PermissionGuard>
                          
                          <DropdownMenuItem>
                            <DownloadIcon className="h-4 w-4 mr-2" />
                            Download Manifest
                          </DropdownMenuItem>
                          
                          {consolidation.hasPayment && (
                            <DropdownMenuItem>
                              View Payment Info
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-10 text-muted-foreground">
                    No consolidations found matching your criteria
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

export default Consolidations;
