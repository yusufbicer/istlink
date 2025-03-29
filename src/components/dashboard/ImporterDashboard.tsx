
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowUpRight, Package, CreditCard, Truck, Calendar, AlertCircle, CheckCircle, Clock } from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { useAuth } from '@/lib/auth';

// Sample data
const orderData = [
  { name: 'Jan', orders: 5 },
  { name: 'Feb', orders: 8 },
  { name: 'Mar', orders: 12 },
  { name: 'Apr', orders: 19 },
  { name: 'May', orders: 15 },
  { name: 'Jun', orders: 25 },
  { name: 'Jul', orders: 30 },
  { name: 'Aug', orders: 35 },
];

const shipmentStatusData = [
  { name: 'In Transit', value: 10 },
  { name: 'Processing', value: 5 },
  { name: 'Delivered', value: 15 },
  { name: 'Pending', value: 3 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const ImporterDashboard = () => {
  const { user } = useAuth();
  const [activeOrders, setActiveOrders] = useState(12);
  const [pendingPayments, setPendingPayments] = useState(3);
  const [consolidations, setConsolidations] = useState(4);
  const [upcomingShipments, setUpcomingShipments] = useState(2);

  const recentOrders = [
    { id: 'OR-7832', date: '2023-08-15', status: 'Processing', amount: '$2,500.00', supplier: 'Tech Supplies Co.' },
    { id: 'OR-7833', date: '2023-08-12', status: 'Shipped', amount: '$1,200.00', supplier: 'Office Gear Ltd.' },
    { id: 'OR-7834', date: '2023-08-10', status: 'Processing', amount: '$3,450.00', supplier: 'Industrial Parts Inc.' },
    { id: 'OR-7835', date: '2023-08-05', status: 'Delivered', amount: '$980.00', supplier: 'Global Electronics' },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Processing':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'Shipped':
        return <Truck className="h-4 w-4 text-blue-500" />;
      case 'Delivered':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1 - Active Orders */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex justify-between items-center">
              Active Orders
              <span className="p-2 rounded-full bg-blue-50">
                <Package className="h-5 w-5 text-blue-500" />
              </span>
            </CardTitle>
            <CardDescription>Current open orders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold">{activeOrders}</span>
              <span className="text-sm flex items-center text-green-600">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                12%
              </span>
            </div>
            <Progress value={65} className="h-2 mt-4" />
            <p className="text-xs text-muted-foreground mt-2">
              65% increase since last month
            </p>
          </CardContent>
        </Card>

        {/* Card 2 - Pending Payments */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex justify-between items-center">
              Pending Payments
              <span className="p-2 rounded-full bg-amber-50">
                <CreditCard className="h-5 w-5 text-amber-500" />
              </span>
            </CardTitle>
            <CardDescription>Awaiting payment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold">{pendingPayments}</span>
              <span className="text-sm flex items-center text-red-600">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                3%
              </span>
            </div>
            <Progress value={30} className="h-2 mt-4" />
            <p className="text-xs text-muted-foreground mt-2">
              $12,450 total pending amount
            </p>
          </CardContent>
        </Card>

        {/* Card 3 - Active Consolidations */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex justify-between items-center">
              Consolidations
              <span className="p-2 rounded-full bg-purple-50">
                <Package className="h-5 w-5 text-purple-500" />
              </span>
            </CardTitle>
            <CardDescription>Active consolidation groups</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold">{consolidations}</span>
              <span className="text-sm flex items-center text-green-600">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                8%
              </span>
            </div>
            <Progress value={45} className="h-2 mt-4" />
            <p className="text-xs text-muted-foreground mt-2">
              12 items being consolidated
            </p>
          </CardContent>
        </Card>

        {/* Card 4 - Upcoming Shipments */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex justify-between items-center">
              Upcoming Shipments
              <span className="p-2 rounded-full bg-green-50">
                <Truck className="h-5 w-5 text-green-500" />
              </span>
            </CardTitle>
            <CardDescription>Scheduled for delivery</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold">{upcomingShipments}</span>
              <span className="text-sm flex items-center text-green-600">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                5%
              </span>
            </div>
            <Progress value={80} className="h-2 mt-4" />
            <p className="text-xs text-muted-foreground mt-2">
              Next shipment in 3 days
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart 1 - Order Trend */}
        <Card className="lg:col-span-2 hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle>Orders Over Time</CardTitle>
            <CardDescription>
              Monthly order volume trends
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={orderData}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="orders" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Chart 2 - Shipment Status */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle>Shipment Status</CardTitle>
            <CardDescription>
              Current status breakdown
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={shipmentStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {shipmentStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>
            Your latest order activity
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="pb-3 text-left">Order ID</th>
                  <th className="pb-3 text-left">Date</th>
                  <th className="pb-3 text-left">Supplier</th>
                  <th className="pb-3 text-left">Amount</th>
                  <th className="pb-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 text-blue-600 font-medium">{order.id}</td>
                    <td className="py-3">{order.date}</td>
                    <td className="py-3">{order.supplier}</td>
                    <td className="py-3">{order.amount}</td>
                    <td className="py-3">
                      <div className="flex items-center">
                        {getStatusIcon(order.status)}
                        <span className="ml-2">{order.status}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImporterDashboard;
