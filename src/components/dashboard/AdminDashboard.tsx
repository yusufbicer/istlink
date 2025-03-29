
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  TrendingUp, Users, Package, Truck, DollarSign, Zap, 
  FileText, AlertCircle, BarChart, PieChart, Search
} from 'lucide-react';
import { Input } from '@/components/ui/input';

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for demonstration
  const consolidations = [
    { 
      id: 'CON-2023-1458', 
      customer: 'Globex Inc.', 
      orders: 3, 
      suppliers: 2, 
      totalValue: 26430, 
      status: 'Ready to Ship', 
      space: '92%',
      estimatedArrival: '2023-12-10' 
    },
    { 
      id: 'CON-2023-1457', 
      customer: 'Acme Corp', 
      orders: 5, 
      suppliers: 3, 
      totalValue: 18920, 
      status: 'Consolidating', 
      space: '85%',
      estimatedArrival: '2023-12-18' 
    },
    { 
      id: 'CON-2023-1456', 
      customer: 'Soylent Corp', 
      orders: 2, 
      suppliers: 1, 
      totalValue: 14250, 
      status: 'Payment Pending', 
      space: '78%',
      estimatedArrival: '2023-12-22' 
    },
    { 
      id: 'CON-2023-1455', 
      customer: 'Initech', 
      orders: 4, 
      suppliers: 4, 
      totalValue: 22780, 
      status: 'In Transit', 
      space: '90%',
      estimatedArrival: '2023-12-05' 
    },
  ];

  const pendingActions = [
    { id: 'ACT-001', description: 'Payment approval for CON-2023-1456', priority: 'High', type: 'Payment' },
    { id: 'ACT-002', description: 'Customs document for CON-2023-1457', priority: 'Medium', type: 'Document' },
    { id: 'ACT-003', description: 'Supplier approval for new vendor', priority: 'Low', type: 'Approval' },
  ];

  const containerMetrics = [
    { id: 1, size: '20ft', count: 3, utilization: 92, status: 'In Transit' },
    { id: 2, size: '40ft', count: 1, utilization: 85, status: 'Loading' },
    { id: 3, size: '40ft HC', count: 2, utilization: 88, status: 'Scheduled' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ready to Ship':
        return 'bg-green-100 text-green-800';
      case 'Consolidating':
        return 'bg-blue-100 text-blue-800';
      case 'Payment Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'In Transit':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Payment':
        return 'bg-indigo-100 text-indigo-800';
      case 'Document':
        return 'bg-green-100 text-green-800';
      case 'Approval':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredConsolidations = consolidations.filter(con =>
    con.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    con.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Monitor all consolidation operations and performance metrics
          </p>
        </div>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..." 
            className="pl-9 pr-4 py-2"
          />
        </div>
      </div>

      {/* Status Cards - First Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
            <Users className="h-4 w-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+3 from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
            <Package className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48</div>
            <p className="text-xs text-muted-foreground">From 18 suppliers</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Consolidations</CardTitle>
            <Truck className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">4 ready to ship</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$284,560</div>
            <p className="text-xs text-muted-foreground">+12.5% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Status Cards - Second Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Space Optimization</CardTitle>
            <Zap className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89%</div>
            <p className="text-xs text-muted-foreground">Average container utilization</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Documents Processed</CardTitle>
            <FileText className="h-4 w-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">342</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Actions</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Cost Savings</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$87,230</div>
            <p className="text-xs text-muted-foreground">Through consolidation</p>
          </CardContent>
        </Card>
      </div>

      {/* Consolidations Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Active Consolidations</CardTitle>
            <CardDescription>Monitor all consolidation operations</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center gap-1">
              <BarChart className="h-3 w-3" /> 12 Total
            </div>
            <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center gap-1">
              <TrendingUp className="h-3 w-3" /> 89% Avg. Util.
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left font-medium py-3 px-4">ID</th>
                  <th className="text-left font-medium py-3 px-4">Customer</th>
                  <th className="text-left font-medium py-3 px-4">Orders</th>
                  <th className="text-left font-medium py-3 px-4">Suppliers</th>
                  <th className="text-left font-medium py-3 px-4">Value</th>
                  <th className="text-left font-medium py-3 px-4">Space Util.</th>
                  <th className="text-left font-medium py-3 px-4">Status</th>
                  <th className="text-left font-medium py-3 px-4">Est. Arrival</th>
                </tr>
              </thead>
              <tbody>
                {filteredConsolidations.map((con) => (
                  <tr key={con.id} className="border-b">
                    <td className="py-3 px-4">{con.id}</td>
                    <td className="py-3 px-4">{con.customer}</td>
                    <td className="py-3 px-4">{con.orders}</td>
                    <td className="py-3 px-4">{con.suppliers}</td>
                    <td className="py-3 px-4">${con.totalValue.toLocaleString()}</td>
                    <td className="py-3 px-4">{con.space}</td>
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

      {/* Container Metrics and Pending Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Container Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Container Metrics</CardTitle>
            <CardDescription>Space utilization and container status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {containerMetrics.map((container) => (
                <div key={container.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <span className="font-medium">{container.size} Container</span>
                      <span className="text-xs text-muted-foreground ml-2">({container.count} units)</span>
                    </div>
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                      {container.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-grow h-2 bg-gray-200 rounded-full">
                      <div 
                        className="h-2 bg-indigo-500 rounded-full" 
                        style={{ width: `${container.utilization}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-medium">{container.utilization}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pending Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Pending Actions</CardTitle>
            <CardDescription>Items requiring administrative action</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingActions.map((action) => (
                <div key={action.id} className="flex justify-between items-center border-b pb-4 last:border-b-0 last:pb-0">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      <AlertCircle className="h-4 w-4 text-yellow-600" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">{action.description}</div>
                      <div className="text-xs text-muted-foreground">Ref: {action.id}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(action.type)}`}>
                      {action.type}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(action.priority)}`}>
                      {action.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
