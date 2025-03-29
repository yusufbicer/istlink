
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowUpRight, Users, CreditCard, Ship, TrendingUp, Clock, CheckCircle, TruckIcon, AlertCircle } from "lucide-react";
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

// Sample data
const monthlyRevenueData = [
  { name: 'Jan', consolidation: 45000, shipping: 25000 },
  { name: 'Feb', consolidation: 52000, shipping: 28000 },
  { name: 'Mar', consolidation: 49000, shipping: 29000 },
  { name: 'Apr', consolidation: 60000, shipping: 32000 },
  { name: 'May', consolidation: 55000, shipping: 30000 },
  { name: 'Jun', consolidation: 75000, shipping: 40000 },
  { name: 'Jul', consolidation: 80000, shipping: 45000 },
  { name: 'Aug', consolidation: 90000, shipping: 50000 },
];

const containerUtilizationData = [
  { name: 'Utilized', value: 85 },
  { name: 'Available', value: 15 },
];

const COLORS = ['#0088FE', '#CCCCCC'];

const AdminDashboard = () => {
  // Recent shipments
  const recentShipments = [
    { id: 'SH-1234', date: '2023-08-15', status: 'In Transit', container: 'CONT-3456', customers: 5, origin: 'Shanghai', destination: 'Los Angeles' },
    { id: 'SH-1235', date: '2023-08-12', status: 'Loading', container: 'CONT-3457', customers: 3, origin: 'Hong Kong', destination: 'New York' },
    { id: 'SH-1236', date: '2023-08-10', status: 'Delivered', container: 'CONT-3458', customers: 6, origin: 'Tokyo', destination: 'Seattle' },
    { id: 'SH-1237', date: '2023-08-05', status: 'In Transit', container: 'CONT-3459', customers: 4, origin: 'Singapore', destination: 'Vancouver' },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'In Transit':
        return <TruckIcon className="h-4 w-4 text-blue-500" />;
      case 'Loading':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'Delivered':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1 - Total Revenue */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex justify-between items-center">
              Total Revenue
              <span className="p-2 rounded-full bg-green-50">
                <CreditCard className="h-5 w-5 text-green-500" />
              </span>
            </CardTitle>
            <CardDescription>Monthly earnings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold">$140K</span>
              <span className="text-sm flex items-center text-green-600">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                18%
              </span>
            </div>
            <Progress value={75} className="h-2 mt-4" />
            <p className="text-xs text-muted-foreground mt-2">
              75% of quarterly target
            </p>
          </CardContent>
        </Card>

        {/* Card 2 - Active Users */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex justify-between items-center">
              Active Users
              <span className="p-2 rounded-full bg-blue-50">
                <Users className="h-5 w-5 text-blue-500" />
              </span>
            </CardTitle>
            <CardDescription>Registered platform users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold">156</span>
              <span className="text-sm flex items-center text-green-600">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                12%
              </span>
            </div>
            <Progress value={65} className="h-2 mt-4" />
            <p className="text-xs text-muted-foreground mt-2">
              118 importers, 38 suppliers
            </p>
          </CardContent>
        </Card>

        {/* Card 3 - Containers */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex justify-between items-center">
              Active Containers
              <span className="p-2 rounded-full bg-purple-50">
                <Ship className="h-5 w-5 text-purple-500" />
              </span>
            </CardTitle>
            <CardDescription>Containers in transit</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold">24</span>
              <span className="text-sm flex items-center text-green-600">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                8%
              </span>
            </div>
            <Progress value={85} className="h-2 mt-4" />
            <p className="text-xs text-muted-foreground mt-2">
              85% average utilization
            </p>
          </CardContent>
        </Card>

        {/* Card 4 - Growth Rate */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex justify-between items-center">
              Growth Rate
              <span className="p-2 rounded-full bg-amber-50">
                <TrendingUp className="h-5 w-5 text-amber-500" />
              </span>
            </CardTitle>
            <CardDescription>Year-over-year growth</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold">34%</span>
              <span className="text-sm flex items-center text-green-600">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                5%
              </span>
            </div>
            <Progress value={75} className="h-2 mt-4" />
            <p className="text-xs text-muted-foreground mt-2">
              Projected to reach 40% EOY
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart 1 - Revenue Breakdown */}
        <Card className="lg:col-span-2 hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle>Revenue Breakdown</CardTitle>
            <CardDescription>
              Consolidation vs. Shipping revenue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlyRevenueData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, '']} />
                  <Bar dataKey="consolidation" name="Consolidation" stackId="a" fill="#8884d8" />
                  <Bar dataKey="shipping" name="Shipping" stackId="a" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Chart 2 - Container Utilization */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle>Container Utilization</CardTitle>
            <CardDescription>
              Average space utilization
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={containerUtilizationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {containerUtilizationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, '']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Shipments */}
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle>Recent Shipments</CardTitle>
          <CardDescription>
            Container shipment status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="pb-3 text-left">Shipment ID</th>
                  <th className="pb-3 text-left">Date</th>
                  <th className="pb-3 text-left">Origin</th>
                  <th className="pb-3 text-left">Destination</th>
                  <th className="pb-3 text-left">Customers</th>
                  <th className="pb-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentShipments.map((shipment) => (
                  <tr key={shipment.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 text-blue-600 font-medium">{shipment.id}</td>
                    <td className="py-3">{shipment.date}</td>
                    <td className="py-3">{shipment.origin}</td>
                    <td className="py-3">{shipment.destination}</td>
                    <td className="py-3">{shipment.customers}</td>
                    <td className="py-3">
                      <div className="flex items-center">
                        {getStatusIcon(shipment.status)}
                        <span className="ml-2">{shipment.status}</span>
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

export default AdminDashboard;
