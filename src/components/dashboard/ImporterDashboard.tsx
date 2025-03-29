
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, Truck, DollarSign, FileText, Calendar, AlertCircle, TrendingUp, Clock } from 'lucide-react';

const ImporterDashboard = () => {
  const [view, setView] = useState('all');

  // Mock data for demonstration
  const orders = [
    { id: 'ORD-2023-001', supplier: 'Turkish Textiles Ltd', items: 34, amount: 12400, status: 'In Transit', date: '2023-10-15' },
    { id: 'ORD-2023-002', supplier: 'Ankara Furniture Co', items: 12, amount: 8750, status: 'Consolidated', date: '2023-10-22' },
    { id: 'ORD-2023-003', supplier: 'Istanbul Ceramics', items: 50, amount: 5280, status: 'Processing', date: '2023-11-01' },
    { id: 'ORD-2023-004', supplier: 'Izmir Textiles', items: 28, amount: 9640, status: 'Awaiting Payment', date: '2023-11-05' },
  ];

  const consolidations = [
    { id: 'CON-2023-1458', orders: 3, totalValue: 26430, status: 'Ready to Ship', estimatedArrival: '2023-12-10' },
    { id: 'CON-2023-1457', orders: 5, totalValue: 18920, status: 'Consolidating', estimatedArrival: '2023-12-18' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Transit':
        return 'bg-blue-100 text-blue-800';
      case 'Consolidated':
        return 'bg-green-100 text-green-800';
      case 'Processing':
        return 'bg-purple-100 text-purple-800';
      case 'Awaiting Payment':
        return 'bg-yellow-100 text-yellow-800';
      case 'Ready to Ship':
        return 'bg-green-100 text-green-800';
      case 'Consolidating':
        return 'bg-indigo-100 text-indigo-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Importer Dashboard</h1>
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setView('all')} 
            className={`px-3 py-1.5 text-sm font-medium rounded-md ${
              view === 'all' ? 'bg-indigo-100 text-indigo-800' : 'bg-white text-gray-600'
            }`}
          >
            All
          </button>
          <button 
            onClick={() => setView('orders')} 
            className={`px-3 py-1.5 text-sm font-medium rounded-md ${
              view === 'orders' ? 'bg-indigo-100 text-indigo-800' : 'bg-white text-gray-600'
            }`}
          >
            Orders
          </button>
          <button 
            onClick={() => setView('consolidations')} 
            className={`px-3 py-1.5 text-sm font-medium rounded-md ${
              view === 'consolidations' ? 'bg-indigo-100 text-indigo-800' : 'bg-white text-gray-600'
            }`}
          >
            Consolidations
          </button>
        </div>
      </div>

      {/* Status Cards - First Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
            <Package className="h-4 w-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">From 3 suppliers</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Consolidations</CardTitle>
            <Truck className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">In Progress</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <DollarSign className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$36,070</div>
            <p className="text-xs text-muted-foreground">Outstanding balance</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Next Arrival</CardTitle>
            <Calendar className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Dec 10</div>
            <p className="text-xs text-muted-foreground">Estimated arrival date</p>
          </CardContent>
        </Card>
      </div>

      {/* Status Cards - Second Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Actions</CardTitle>
            <AlertCircle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Payments to approve</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Space Saved</CardTitle>
            <TrendingUp className="h-4 w-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">38%</div>
            <p className="text-xs text-muted-foreground">Through consolidation</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Documentation</CardTitle>
            <FileText className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">Processed automatically</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Processing Time</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">-41%</div>
            <p className="text-xs text-muted-foreground">Compared to direct shipping</p>
          </CardContent>
        </Card>
      </div>

      {/* Orders Table */}
      {(view === 'all' || view === 'orders') && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Your latest orders from suppliers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left font-medium py-3 px-4">Order ID</th>
                    <th className="text-left font-medium py-3 px-4">Supplier</th>
                    <th className="text-left font-medium py-3 px-4">Items</th>
                    <th className="text-left font-medium py-3 px-4">Amount</th>
                    <th className="text-left font-medium py-3 px-4">Status</th>
                    <th className="text-left font-medium py-3 px-4">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b">
                      <td className="py-3 px-4">{order.id}</td>
                      <td className="py-3 px-4">{order.supplier}</td>
                      <td className="py-3 px-4">{order.items}</td>
                      <td className="py-3 px-4">${order.amount.toLocaleString()}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">{new Date(order.date).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Consolidations Table */}
      {(view === 'all' || view === 'consolidations') && (
        <Card>
          <CardHeader>
            <CardTitle>Active Consolidations</CardTitle>
            <CardDescription>Your ongoing consolidated shipments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left font-medium py-3 px-4">Consolidation ID</th>
                    <th className="text-left font-medium py-3 px-4">Orders</th>
                    <th className="text-left font-medium py-3 px-4">Total Value</th>
                    <th className="text-left font-medium py-3 px-4">Status</th>
                    <th className="text-left font-medium py-3 px-4">Est. Arrival</th>
                  </tr>
                </thead>
                <tbody>
                  {consolidations.map((con) => (
                    <tr key={con.id} className="border-b">
                      <td className="py-3 px-4">{con.id}</td>
                      <td className="py-3 px-4">{con.orders}</td>
                      <td className="py-3 px-4">${con.totalValue.toLocaleString()}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs ${getStatusColor(con.status)}`}>
                          {con.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">{new Date(con.estimatedArrival).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ImporterDashboard;
