import { useState } from 'react';
import { useAuth } from '@/lib/auth';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Download, Filter, Plus, Search, ArrowUpDown, FileText, CreditCard, CheckCircle, AlertCircle, Clock } from 'lucide-react';

// Mock data for payments
const importerPayments = [
  { id: 'PAY-001', date: '2023-05-15', amount: 12500, status: 'completed', method: 'Bank Transfer', reference: 'INV-2023-001' },
  { id: 'PAY-002', date: '2023-05-28', amount: 8750, status: 'completed', method: 'Credit Card', reference: 'INV-2023-002' },
  { id: 'PAY-003', date: '2023-06-10', amount: 15000, status: 'pending', method: 'Bank Transfer', reference: 'INV-2023-003' },
  { id: 'PAY-004', date: '2023-06-22', amount: 9200, status: 'failed', method: 'Credit Card', reference: 'INV-2023-004' },
  { id: 'PAY-005', date: '2023-07-05', amount: 11800, status: 'completed', method: 'Bank Transfer', reference: 'INV-2023-005' },
];

const supplierPayments = [
  { id: 'PAY-101', date: '2023-05-18', amount: 8500, status: 'completed', method: 'Bank Transfer', reference: 'ORD-2023-101' },
  { id: 'PAY-102', date: '2023-06-02', amount: 12300, status: 'completed', method: 'Bank Transfer', reference: 'ORD-2023-102' },
  { id: 'PAY-103', date: '2023-06-15', amount: 9800, status: 'pending', method: 'Bank Transfer', reference: 'ORD-2023-103' },
  { id: 'PAY-104', date: '2023-06-28', amount: 14500, status: 'completed', method: 'Bank Transfer', reference: 'ORD-2023-104' },
  { id: 'PAY-105', date: '2023-07-10', amount: 7600, status: 'pending', method: 'Bank Transfer', reference: 'ORD-2023-105' },
];

const Payments = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"importer" | "supplier">("importer");
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Filter payments based on search query and status filter
  const filteredImporterPayments = importerPayments.filter(payment => {
    const matchesSearch = 
      payment.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.reference.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const filteredSupplierPayments = supplierPayments.filter(payment => {
    const matchesSearch = 
      payment.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.reference.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Calculate totals
  const calculateTotals = (payments: typeof importerPayments) => {
    const total = payments.reduce((sum, payment) => sum + payment.amount, 0);
    const completed = payments.filter(p => p.status === 'completed').reduce((sum, payment) => sum + payment.amount, 0);
    const pending = payments.filter(p => p.status === 'pending').reduce((sum, payment) => sum + payment.amount, 0);
    const failed = payments.filter(p => p.status === 'failed').reduce((sum, payment) => sum + payment.amount, 0);
    
    return { total, completed, pending, failed };
  };

  const importerTotals = calculateTotals(importerPayments);
  const supplierTotals = calculateTotals(supplierPayments);

  // Status badge component
  const StatusBadge = ({ status }: { status: string }) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100"><CheckCircle className="w-3 h-3 mr-1" /> Completed</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100"><Clock className="w-3 h-3 mr-1" /> Pending</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100"><AlertCircle className="w-3 h-3 mr-1" /> Failed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Payments</h1>
        
        {user?.role === "admin" && (
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              New Payment
            </Button>
          </div>
        )}
        
        {user?.role === "importer" && (
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <FileText className="h-4 w-4 mr-2" />
              Payment History
            </Button>
            <Button size="sm">
              <CreditCard className="h-4 w-4 mr-2" />
              Make Payment
            </Button>
          </div>
        )}
        
        {user?.role === "supplier" && (
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Payment History
          </Button>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 text-gray-400 mr-1" />
              <div className="text-2xl font-bold">
                ${activeTab === "importer" ? importerTotals.total.toLocaleString() : supplierTotals.total.toLocaleString()}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
              <div className="text-2xl font-bold text-green-600">
                ${activeTab === "importer" ? importerTotals.completed.toLocaleString() : supplierTotals.completed.toLocaleString()}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Clock className="h-4 w-4 text-yellow-500 mr-1" />
              <div className="text-2xl font-bold text-yellow-600">
                ${activeTab === "importer" ? importerTotals.pending.toLocaleString() : supplierTotals.pending.toLocaleString()}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Failed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <AlertCircle className="h-4 w-4 text-red-500 mr-1" />
              <div className="text-2xl font-bold text-red-600">
                ${activeTab === "importer" ? importerTotals.failed.toLocaleString() : supplierTotals.failed.toLocaleString()}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for different payment views */}
      {user?.role === "admin" && (
        <Tabs defaultValue="importer" className="mb-6" onValueChange={(value) => setActiveTab(value as "importer" | "supplier")}>
          <TabsList>
            <TabsTrigger value="importer">Importer Payments</TabsTrigger>
            <TabsTrigger value="supplier">Supplier Payments</TabsTrigger>
          </TabsList>
        </Tabs>
      )}

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search payments..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <div className="w-[180px]">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <div className="flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  <span>Status: {statusFilter === 'all' ? 'All' : statusFilter}</span>
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button variant="outline" size="icon">
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Payments Table */}
      {activeTab === "importer" && (
        <Card>
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
            <CardDescription>
              {user?.role === "admin" ? "All payments made by importers" : "Your payment history"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Payment ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Reference</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredImporterPayments.length > 0 ? (
                  filteredImporterPayments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">{payment.id}</TableCell>
                      <TableCell>{payment.date}</TableCell>
                      <TableCell>${payment.amount.toLocaleString()}</TableCell>
                      <TableCell>{payment.method}</TableCell>
                      <TableCell>{payment.reference}</TableCell>
                      <TableCell>
                        <StatusBadge status={payment.status} />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4 text-gray-500">
                      No payments found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {activeTab === "supplier" && (
        <Card>
          <CardHeader>
            <CardTitle>Supplier Payments</CardTitle>
            <CardDescription>
              {user?.role === "admin" ? "All payments made to suppliers" : "Payments received for your products"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Payment ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Reference</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSupplierPayments.length > 0 ? (
                  filteredSupplierPayments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">{payment.id}</TableCell>
                      <TableCell>{payment.date}</TableCell>
                      <TableCell>${payment.amount.toLocaleString()}</TableCell>
                      <TableCell>{payment.method}</TableCell>
                      <TableCell>{payment.reference}</TableCell>
                      <TableCell>
                        <StatusBadge status={payment.status} />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4 text-gray-500">
                      No payments found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Payment Form (simplified) */}
      {user?.role === "importer" && (
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Make a Payment</CardTitle>
              <CardDescription>
                Pay for your orders or add funds to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                      <Input id="amount" type="number" placeholder="0.00" className="pl-8" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="reference">Reference</Label>
                    <Input id="reference" placeholder="Invoice or Order ID" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="payment-method">Payment Method</Label>
                  <Select defaultValue="bank-transfer">
                    <SelectTrigger id="payment-method">
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                      <SelectItem value="credit-card">Credit Card</SelectItem>
                      <SelectItem value="paypal">PayPal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button type="submit" className="w-full">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Process Payment
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Payments;
