
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowUpRight, ShoppingCart, CreditCard, Users, Box, Clock, CheckCircle, TruckIcon, AlertCircle } from "lucide-react";
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
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';

// Sample data
const revenueData = [
  { name: 'Jan', revenue: 15000 },
  { name: 'Feb', revenue: 18000 },
  { name: 'Mar', revenue: 25000 },
  { name: 'Apr', revenue: 22000 },
  { name: 'May', revenue: 30000 },
  { name: 'Jun', revenue: 28000 },
  { name: 'Jul', revenue: 35000 },
  { name: 'Aug', revenue: 42000 },
];

const productPerformanceData = [
  { name: 'Product A', sales: 120 },
  { name: 'Product B', sales: 80 },
  { name: 'Product C', sales: 150 },
  { name: 'Product D', sales: 200 },
  { name: 'Product E', sales: 70 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const SupplierDashboard = () => {
  // Recent orders from importers
  const recentOrders = [
    { id: 'OR-7832', date: '2023-08-15', status: 'Processing', amount: '$2,500.00', customer: 'Global Imports Inc.' },
    { id: 'OR-7833', date: '2023-08-12', status: 'Shipped', amount: '$1,200.00', customer: 'Eastern Trading Co.' },
    { id: 'OR-7834', date: '2023-08-10', status: 'Pending', amount: '$3,450.00', customer: 'Pacific Distributors' },
    { id: 'OR-7835', date: '2023-08-05', status: 'Delivered', amount: '$980.00', customer: 'American Importers Ltd.' },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Processing':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'Shipped':
        return <TruckIcon className="h-4 w-4 text-blue-500" />;
      case 'Delivered':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'Pending':
        return <AlertCircle className="h-4 w-4 text-orange-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1 - Order Requests */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex justify-between items-center">
              Order Requests
              <span className="p-2 rounded-full bg-blue-50">
                <ShoppingCart className="h-5 w-5 text-blue-500" />
              </span>
            </CardTitle>
            <CardDescription>New order requests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold">18</span>
              <span className="text-sm flex items-center text-green-600">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                24%
              </span>
            </div>
            <Progress value={70} className="h-2 mt-4" />
            <p className="text-xs text-muted-foreground mt-2">
              5 require immediate attention
            </p>
          </CardContent>
        </Card>

        {/* Card 2 - Revenue */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex justify-between items-center">
              Monthly Revenue
              <span className="p-2 rounded-full bg-green-50">
                <CreditCard className="h-5 w-5 text-green-500" />
              </span>
            </CardTitle>
            <CardDescription>This month's earnings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold">$42K</span>
              <span className="text-sm flex items-center text-green-600">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                18%
              </span>
            </div>
            <Progress value={85} className="h-2 mt-4" />
            <p className="text-xs text-muted-foreground mt-2">
              85% of monthly target
            </p>
          </CardContent>
        </Card>

        {/* Card 3 - Active Customers */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex justify-between items-center">
              Active Customers
              <span className="p-2 rounded-full bg-purple-50">
                <Users className="h-5 w-5 text-purple-500" />
              </span>
            </CardTitle>
            <CardDescription>Importers working with you</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold">24</span>
              <span className="text-sm flex items-center text-green-600">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                12%
              </span>
            </div>
            <Progress value={60} className="h-2 mt-4" />
            <p className="text-xs text-muted-foreground mt-2">
              3 new customers this month
            </p>
          </CardContent>
        </Card>

        {/* Card 4 - Products */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex justify-between items-center">
              Active Products
              <span className="p-2 rounded-full bg-amber-50">
                <Box className="h-5 w-5 text-amber-500" />
              </span>
            </CardTitle>
            <CardDescription>Listed in catalog</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold">85</span>
              <span className="text-sm flex items-center text-green-600">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                5%
              </span>
            </div>
            <Progress value={75} className="h-2 mt-4" />
            <p className="text-xs text-muted-foreground mt-2">
              12 new products added
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart 1 - Revenue Trend */}
        <Card className="lg:col-span-2 hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <CardDescription>
              Monthly revenue performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={revenueData}
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
                  <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                  <Area type="monotone" dataKey="revenue" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Chart 2 - Top Products */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
            <CardDescription>
              Best selling products
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={productPerformanceData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" scale="band" />
                  <Tooltip />
                  <Bar dataKey="sales" fill="#8884d8" barSize={20} />
                </BarChart>
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
            Latest customer orders
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="pb-3 text-left">Order ID</th>
                  <th className="pb-3 text-left">Date</th>
                  <th className="pb-3 text-left">Customer</th>
                  <th className="pb-3 text-left">Amount</th>
                  <th className="pb-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 text-blue-600 font-medium">{order.id}</td>
                    <td className="py-3">{order.date}</td>
                    <td className="py-3">{order.customer}</td>
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

export default SupplierDashboard;
