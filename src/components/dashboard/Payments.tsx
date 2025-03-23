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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { 
  CreditCardIcon, 
  DollarSignIcon, 
  EyeIcon, 
  FileTextIcon, 
  MailIcon, 
  MoreHorizontalIcon, 
  PlusIcon, 
  SearchIcon,
  TrashIcon,
  PencilIcon
} from "lucide-react";
import { useAuth } from "@/lib/auth";

// Mock payment data
const initialPayments = [
  {
    id: "PAY-001",
    consolidationId: "CONS-001",
    consolidationName: "Summer Collection Shipment",
    amount: 5550,
    currency: "USD",
    status: "paid",
    method: "bank_transfer",
    reference: "INV-12345",
    supplierId: "1",
    supplierName: "Textile Masters Co.",
    customerId: "3",
    customerName: "Fashion Retailer Inc.",
    orderIds: ["ORD-1234", "ORD-1235"],
    details: {
      bankName: "Global Bank",
      accountNumber: "XXXX-XXXX-XXXX-1234",
      holderName: "ShipSync LLC",
      swiftCode: "GLBANK123"
    },
    createdAt: "2023-08-12T10:15:00Z",
    paidAt: "2023-08-15T14:30:00Z"
  },
  {
    id: "PAY-002",
    consolidationId: "CONS-003",
    consolidationName: "Electronics Shipment",
    amount: 8750,
    currency: "USD",
    status: "paid",
    method: "credit_card",
    reference: "INV-12346",
    supplierId: "2",
    supplierName: "Bosphorus Tech",
    customerId: "4",
    customerName: "Gadget World",
    orderIds: ["ORD-1237", "ORD-1238"],
    details: {
      cardType: "Visa",
      lastFourDigits: "4567",
      expiryDate: "XX/XX",
      holderName: "ShipSync LLC"
    },
    createdAt: "2023-08-06T08:45:00Z",
    paidAt: "2023-08-06T09:30:00Z"
  },
  {
    id: "PAY-003",
    consolidationId: "CONS-002",
    consolidationName: "Fall Inventory Restock",
    amount: 6200,
    currency: "USD",
    status: "pending",
    method: "bank_transfer",
    reference: "INV-12347",
    supplierId: "1",
    supplierName: "Textile Masters Co.",
    customerId: "5",
    customerName: "Retail Chain Inc.",
    orderIds: ["ORD-1236"],
    details: {
      bankName: "Global Bank",
      accountNumber: "XXXX-XXXX-XXXX-1234",
      holderName: "ShipSync LLC",
      swiftCode: "GLBANK123"
    },
    createdAt: "2023-08-16T11:20:00Z",
    paidAt: null
  }
];

// Mock consolidations without payment
const consolidationsWithoutPayment = [
  { id: "CONS-004", name: "Holiday Collection", total: 4800, supplierIds: ["1"], customerId: "3" },
  { id: "CONS-005", name: "Office Supplies", total: 1250, supplierIds: ["2"], customerId: "4" }
];

const Payments = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [payments, setPayments] = useState(initialPayments);
  const [searchTerm, setSearchTerm] = useState("");
  const [newPayment, setNewPayment] = useState({
    consolidationId: "",
    method: "bank_transfer",
    reference: "",
    details: {
      bankName: "",
      accountNumber: "",
      holderName: "",
      swiftCode: ""
    }
  });
  const [editingPayment, setEditingPayment] = useState<any>(null);

  // Filter payments based on search and user role
  const filteredPayments = payments.filter(payment => {
    const matchesSearch = 
      payment.consolidationId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.consolidationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.orderIds.some(id => id.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Admin can see all payments
    if (user?.role === "admin") {
      return matchesSearch;
    }
    
    // Supplier can only see payments related to their orders
    if (user?.role === "supplier") {
      // For demo purposes, supplier with id 1 is "Textile Masters Co." and supplier with id 2 is "Bosphorus Tech"
      const supplierIdToFilter = user.name.includes("Supplier") ? "1" : "2";
      return matchesSearch && payment.supplierId === supplierIdToFilter;
    }
    
    // Customer can only see their own payments
    if (user?.role === "customer") {
      // For demo purposes, customer with id 3 is "Fashion Retailer Inc." and customer with id 4 is "Gadget World"
      const customerIdToFilter = user.name.includes("Customer") ? "3" : "4";
      return matchesSearch && payment.customerId === customerIdToFilter;
    }
    
    return false;
  });

  // Format date
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Not processed";
    
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Format payment method
  const formatPaymentMethod = (method: string) => {
    switch (method) {
      case "bank_transfer":
        return "Bank Transfer";
      case "credit_card":
        return "Credit Card";
      case "paypal":
        return "PayPal";
      case "wire_transfer":
        return "Wire Transfer";
      default:
        return method.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100 capitalize">Paid</Badge>;
      case 'pending':
        return <Badge variant="outline" className="capitalize">Pending</Badge>;
      case 'cancelled':
        return <Badge variant="destructive" className="capitalize">Cancelled</Badge>;
      default:
        return <Badge variant="outline" className="capitalize">{status}</Badge>;
    }
  };

  // Create new payment (admin only)
  const handleCreatePayment = () => {
    const selectedConsolidation = consolidationsWithoutPayment.find(
      c => c.id === newPayment.consolidationId
    );
    
    if (!selectedConsolidation) {
      toast({
        title: "Error",
        description: "Please select a valid consolidation.",
        variant: "destructive"
      });
      return;
    }
    
    // Create new payment object
    const newPaymentObj = {
      id: `PAY-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      consolidationId: selectedConsolidation.id,
      consolidationName: selectedConsolidation.name,
      amount: selectedConsolidation.total,
      currency: "USD",
      status: "pending",
      method: newPayment.method,
      reference: newPayment.reference || `INV-${Date.now().toString().slice(-5)}`,
      details: newPayment.details,
      supplierId: selectedConsolidation.supplierIds[0],
      supplierName: selectedConsolidation.supplierIds[0] === "1" ? "Textile Masters Co." : "Bosphorus Tech",
      customerId: selectedConsolidation.customerId,
      customerName: selectedConsolidation.customerId === "3" ? "Fashion Retailer Inc." : "Gadget World",
      orderIds: [`ORD-${Math.floor(Math.random() * 1000 + 1240)}`],
      createdAt: new Date().toISOString(),
      paidAt: null
    };
    
    setPayments([...payments, newPaymentObj]);
    
    // Reset form
    setNewPayment({
      consolidationId: "",
      method: "bank_transfer",
      reference: "",
      details: {
        bankName: "",
        accountNumber: "",
        holderName: "",
        swiftCode: ""
      }
    });
    
    toast({
      title: "Payment Info Added",
      description: `Payment information has been added for ${selectedConsolidation.name}.`
    });
  };

  // Update payment (admin only)
  const handleUpdatePayment = () => {
    if (!editingPayment) return;
    
    const updatedPayments = payments.map(payment => 
      payment.id === editingPayment.id ? { ...payment, ...editingPayment } : payment
    );
    
    setPayments(updatedPayments);
    setEditingPayment(null);
    
    toast({
      title: "Payment Updated",
      description: "The payment information has been successfully updated."
    });
  };

  // Delete payment (admin only)
  const handleDeletePayment = (id: string) => {
    setPayments(payments.filter(payment => payment.id !== id));
    
    toast({
      title: "Payment Deleted",
      description: "The payment information has been successfully deleted."
    });
  };

  // Mark payment as paid (admin only)
  const handleMarkAsPaid = (paymentId: string) => {
    const updatedPayments = payments.map(payment => 
      payment.id === paymentId 
        ? { ...payment, status: "paid", paidAt: new Date().toISOString() } 
        : payment
    );
    
    setPayments(updatedPayments);
    
    toast({
      title: "Payment Status Updated",
      description: "The payment has been marked as paid."
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Payment Information</h1>
          <p className="text-muted-foreground">
            {user?.role === "admin" 
              ? "Manage payment information for consolidations" 
              : user?.role === "supplier"
              ? "View payment information for orders you've supplied"
              : "View payment information for your shipments"}
          </p>
        </div>
        
        <div className="flex gap-4">
          <div className="relative flex-1 min-w-[200px]">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search payments..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {user?.role === "admin" && (
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <PlusIcon className="mr-2 h-4 w-4" />
                  Add Payment Info
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Payment Information</DialogTitle>
                  <DialogDescription>
                    Create payment details for a consolidation
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="consolidation" className="text-right">
                      Consolidation
                    </Label>
                    <select 
                      id="consolidation" 
                      className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      value={newPayment.consolidationId}
                      onChange={(e) => setNewPayment({...newPayment, consolidationId: e.target.value})}
                    >
                      <option value="">Select a consolidation</option>
                      {consolidationsWithoutPayment.map(cons => (
                        <option key={cons.id} value={cons.id}>
                          {cons.name} - ${cons.total}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="payment-method" className="text-right">
                      Payment Method
                    </Label>
                    <select 
                      id="payment-method" 
                      className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      value={newPayment.method}
                      onChange={(e) => setNewPayment({...newPayment, method: e.target.value})}
                    >
                      <option value="bank_transfer">Bank Transfer</option>
                      <option value="credit_card">Credit Card</option>
                      <option value="wire_transfer">Wire Transfer</option>
                      <option value="paypal">PayPal</option>
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="reference" className="text-right">
                      Reference/Invoice
                    </Label>
                    <Input 
                      id="reference" 
                      placeholder="Invoice number"
                      className="col-span-3"
                      value={newPayment.reference}
                      onChange={(e) => setNewPayment({...newPayment, reference: e.target.value})}
                    />
                  </div>
                  
                  {newPayment.method === "bank_transfer" && (
                    <>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="bank-name" className="text-right">
                          Bank Name
                        </Label>
                        <Input 
                          id="bank-name" 
                          className="col-span-3"
                          value={newPayment.details.bankName}
                          onChange={(e) => setNewPayment({
                            ...newPayment, 
                            details: {...newPayment.details, bankName: e.target.value}
                          })}
                        />
                      </div>
                      
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="account-number" className="text-right">
                          Account Number
                        </Label>
                        <Input 
                          id="account-number" 
                          className="col-span-3"
                          value={newPayment.details.accountNumber}
                          onChange={(e) => setNewPayment({
                            ...newPayment, 
                            details: {...newPayment.details, accountNumber: e.target.value}
                          })}
                        />
                      </div>
                      
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="holder-name" className="text-right">
                          Account Holder
                        </Label>
                        <Input 
                          id="holder-name" 
                          className="col-span-3"
                          value={newPayment.details.holderName}
                          onChange={(e) => setNewPayment({
                            ...newPayment, 
                            details: {...newPayment.details, holderName: e.target.value}
                          })}
                        />
                      </div>
                      
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="swift-code" className="text-right">
                          SWIFT Code
                        </Label>
                        <Input 
                          id="swift-code" 
                          className="col-span-3"
                          value={newPayment.details.swiftCode}
                          onChange={(e) => setNewPayment({
                            ...newPayment, 
                            details: {...newPayment.details, swiftCode: e.target.value}
                          })}
                        />
                      </div>
                    </>
                  )}
                </div>
                
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button 
                    onClick={handleCreatePayment}
                    disabled={!newPayment.consolidationId}
                  >
                    Save Payment Info
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">{filteredPayments.length}</CardTitle>
            <CardDescription>Total Payments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center text-blue-600">
              <CreditCardIcon className="mr-2 h-4 w-4" />
              <span>Payments</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">
              ${filteredPayments.filter(p => p.status === "paid").reduce((total, p) => total + p.amount, 0).toLocaleString()}
            </CardTitle>
            <CardDescription>Total Paid</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              {filteredPayments.filter(p => p.status === "paid").length} payments completed
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">
              ${filteredPayments.filter(p => p.status === "pending").reduce((total, p) => total + p.amount, 0).toLocaleString()}
            </CardTitle>
            <CardDescription>Pending Payments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              {filteredPayments.filter(p => p.status === "pending").length} payments awaiting processing
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Payment Information</CardTitle>
          <CardDescription>
            {user?.role === "admin" 
              ? "Manage payment details for consolidations" 
              : "View payment details for your orders"}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Consolidation</TableHead>
                {(user?.role === "admin" || user?.role === "supplier") && (
                  <TableHead>Customer</TableHead>
                )}
                {(user?.role === "admin" || user?.role === "customer") && (
                  <TableHead>Supplier</TableHead>
                )}
                <TableHead>Amount</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Related Orders</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.length > 0 ? (
                filteredPayments.map(payment => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">{payment.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <FileTextIcon className="h-4 w-4 text-blue-600" />
                        <span title={payment.consolidationName}>
                          {payment.consolidationId}
                        </span>
                      </div>
                    </TableCell>
                    {(user?.role === "admin" || user?.role === "supplier") && (
                      <TableCell>{payment.customerName}</TableCell>
                    )}
                    {(user?.role === "admin" || user?.role === "customer") && (
                      <TableCell>{payment.supplierName}</TableCell>
                    )}
                    <TableCell>${payment.amount.toLocaleString()}</TableCell>
                    <TableCell>{formatPaymentMethod(payment.method)}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {payment.orderIds.map(orderId => (
                          <Badge key={orderId} variant="outline" className="text-xs">
                            {orderId}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(payment.status)}</TableCell>
                    <TableCell className="text-right">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <EyeIcon className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Payment Details</DialogTitle>
                            <DialogDescription>
                              {payment.consolidationName} - {payment.reference}
                            </DialogDescription>
                          </DialogHeader>
                          
                          <div className="space-y-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h4 className="text-sm font-medium mb-1">Payment ID</h4>
                                <p className="text-sm">{payment.id}</p>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium mb-1">Status</h4>
                                <p className="text-sm">{getStatusBadge(payment.status)}</p>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h4 className="text-sm font-medium mb-1">Amount</h4>
                                <p className="text-sm">${payment.amount.toLocaleString()} {payment.currency}</p>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium mb-1">Method</h4>
                                <p className="text-sm">{formatPaymentMethod(payment.method)}</p>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h4 className="text-sm font-medium mb-1">Created Date</h4>
                                <p className="text-sm">{formatDate(payment.createdAt)}</p>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium mb-1">Payment Date</h4>
                                <p className="text-sm">{formatDate(payment.paidAt)}</p>
                              </div>
                            </div>

                            <div>
                              <h4 className="text-sm font-medium mb-1">Related Orders</h4>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {payment.orderIds.map(orderId => (
                                  <Badge key={orderId} variant="outline">
                                    {orderId}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            
                            <div className="pt-2">
                              <h4 className="text-sm font-medium mb-2">Payment Details</h4>
                              {payment.method === "bank_transfer" && (
                                <div className="space-y-2 bg-gray-50 p-3 rounded-md">
                                  <div className="grid grid-cols-2 text-sm">
                                    <span className="text-muted-foreground">Bank Name:</span>
                                    <span>{payment.details.bankName}</span>
                                  </div>
                                  <div className="grid grid-cols-2 text-sm">
                                    <span className="text-muted-foreground">Account Number:</span>
                                    <span>{payment.details.accountNumber}</span>
                                  </div>
                                  <div className="grid grid-cols-2 text-sm">
                                    <span className="text-muted-foreground">Account Holder:</span>
                                    <span>{payment.details.holderName}</span>
                                  </div>
                                  <div className="grid grid-cols-2 text-sm">
                                    <span className="text-muted-foreground">SWIFT Code:</span>
                                    <span>{payment.details.swiftCode}</span>
                                  </div>
                                </div>
                              )}
                              
                              {payment.method === "credit_card" && (
                                <div className="space-y-2 bg-gray-50 p-3 rounded-md">
                                  <div className="grid grid-cols-2 text-sm">
                                    <span className="text-muted-foreground">Card Type:</span>
                                    <span>{payment.details.cardType}</span>
                                  </div>
                                  <div className="grid grid-cols-2 text-sm">
                                    <span className="text-muted-foreground">Last Four Digits:</span>
                                    <span>**** **** **** {payment.details.lastFourDigits}</span>
                                  </div>
                                  <div className="grid grid-cols-2 text-sm">
                                    <span className="text-muted-foreground">Expiry Date:</span>
                                    <span>{payment.details.expiryDate}</span>
                                  </div>
                                  <div className="grid grid-cols-2 text-sm">
                                    <span className="text-muted-foreground">Card Holder:</span>
                                    <span>{payment.details.holderName}</span>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      
                      {user?.role === "admin" && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <PencilIcon className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit Payment</DialogTitle>
                              <DialogDescription>
                                Update payment information
                              </DialogDescription>
                            </DialogHeader>
                            
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-reference" className="text-right">
                                  Reference
                                </Label>
                                <Input 
                                  id="edit-reference" 
                                  className="col-span-3"
                                  defaultValue={payment.reference}
                                  onChange={(e) => setEditingPayment({
                                    ...payment,
                                    reference: e.target.value
                                  })}
                                />
                              </div>
                              
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-method" className="text-right">
                                  Payment Method
                                </Label>
                                <select 
                                  id="edit-method" 
                                  className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                  defaultValue={payment.method}
                                  onChange={(e) => setEditingPayment({
                                    ...payment,
                                    method: e.target.value
                                  })}
                                >
                                  <option value="bank_transfer">Bank Transfer</option>
                                  <option value="credit_card">Credit Card</option>
                                  <option value="wire_transfer">Wire Transfer</option>
                                  <option value="paypal">PayPal</option>
                                </select>
                              </div>
                              
                              {(payment.method === "bank_transfer" || (!editingPayment || editingPayment.method === "bank_transfer")) && (
                                <>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-bank" className="text-right">
                                      Bank Name
                                    </Label>
                                    <Input 
                                      id="edit-bank" 
                                      className="col-span-3"
                                      defaultValue={payment.details.bankName}
                                      onChange={(e) => setEditingPayment({
                                        ...payment,
                                        details: {
                                          ...payment.details,
                                          bankName: e.target.value
                                        }
                                      })}
                                    />
                                  </div>
                                  
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-account" className="text-right">
                                      Account Number
                                    </Label>
                                    <Input 
                                      id="edit-account" 
                                      className="col-span-3"
                                      defaultValue={payment.details.accountNumber}
                                      onChange={(e) => setEditingPayment({
                                        ...payment,
                                        details: {
                                          ...payment.details,
                                          accountNumber: e.target.value
                                        }
                                      })}
                                    />
                                  </div>
                                </>
                              )}
                            </div>
                            
                            <DialogFooter>
                              <DialogClose asChild>
                                <Button variant="outline" onClick={() => setEditingPayment(null)}>
                                  Cancel
                                </Button>
                              </DialogClose>
                              <Button onClick={handleUpdatePayment}>
                                Save Changes
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      )}
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontalIcon className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          
                          {user?.role === "admin" && payment.status === "pending" && (
                            <DropdownMenuItem onClick={() => handleMarkAsPaid(payment.id)}>
                              <DollarSignIcon className="h-4 w-4 mr-2" />
                              Mark as Paid
                            </DropdownMenuItem>
                          )}
                          
                          <DropdownMenuItem>
                            <FileTextIcon className="h-4 w-4 mr-2" />
                            Download Invoice
                          </DropdownMenuItem>
                          
                          {user?.role !== "admin" && payment.status === "pending" && (
                            <DropdownMenuItem>
                              <MailIcon className="h-4 w-4 mr-2" />
                              Send Payment Proof
                            </DropdownMenuItem>
                          )}
                          
                          {user?.role === "admin" && (
                            <DropdownMenuItem onClick={() => handleDeletePayment(payment.id)} className="text-red-500">
                              <TrashIcon className="h-4 w-4 mr-2" />
                              Delete Payment
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={user?.role === "admin" ? 9 : 8} className="text-center py-10 text-muted-foreground">
                    No payment information found matching your criteria
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

export default Payments;
