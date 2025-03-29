
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/lib/auth";
import { ArrowUpIcon, ArrowDownIcon, PackageIcon, TruckIcon, UsersIcon, DollarSignIcon } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

// Mock data for the dashboard
const orderData = [
  { name: "Jan", orders: 10 },
  { name: "Feb", orders: 15 },
  { name: "Mar", orders: 25 },
  { name: "Apr", orders: 22 },
  { name: "May", orders: 30 },
  { name: "Jun", orders: 28 },
  { name: "Jul", orders: 35 },
];

const shipmentData = [
  { name: "Jan", shipments: 8 },
  { name: "Feb", shipments: 13 },
  { name: "Mar", shipments: 20 },
  { name: "Apr", shipments: 18 },
  { name: "May", shipments: 25 },
  { name: "Jun", shipments: 23 },
  { name: "Jul", shipments: 30 },
];

const recentActivity = [
  { 
    id: 1, 
    action: "New order placed", 
    details: "Order #12345 with 3 items", 
    timestamp: "Just now",
    status: "pending"
  },
  { 
    id: 2, 
    action: "Shipment prepared", 
    details: "Consolidated shipment #5678", 
    timestamp: "2 hours ago",
    status: "processing"
  },
  { 
    id: 3, 
    action: "Supplier payment", 
    details: "Paid $2,450 to Supplier A", 
    timestamp: "5 hours ago",
    status: "completed"
  },
  { 
    id: 4, 
    action: "Shipment delivered", 
    details: "Shipment #4321 delivered", 
    timestamp: "Yesterday",
    status: "completed"
  },
  { 
    id: 5, 
    action: "New supplier added", 
    details: "ABC Textiles added to suppliers", 
    timestamp: "2 days ago",
    status: "completed"
  },
];

const Overview = () => {
  const { user } = useAuth();
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Different stats based on user role
  const getStats = () => {
    if (user?.role === 'buyer') {
      return [
        { 
          title: "Active Orders", 
          value: "12", 
          change: "+20%", 
          trend: "up",
          icon: <PackageIcon className="h-5 w-5 text-blue-600" />
        },
        { 
          title: "Pending Shipments", 
          value: "3", 
          change: "-10%", 
          trend: "down",
          icon: <TruckIcon className="h-5 w-5 text-indigo-600" />
        },
        { 
          title: "Total Suppliers", 
          value: "8", 
          change: "+5%", 
          trend: "up",
          icon: <UsersIcon className="h-5 w-5 text-green-600" />
        },
        { 
          title: "Monthly Spend", 
          value: "$24,500", 
          change: "+15%", 
          trend: "up",
          icon: <DollarSignIcon className="h-5 w-5 text-amber-600" />
        },
      ];
    } else if (user?.role === 'supplier') {
      return [
        { 
          title: "Open Orders", 
          value: "7", 
          change: "+12%", 
          trend: "up",
          icon: <PackageIcon className="h-5 w-5 text-blue-600" />
        },
        { 
          title: "Shipped Orders", 
          value: "19", 
          change: "+25%", 
          trend: "up",
          icon: <TruckIcon className="h-5 w-5 text-indigo-600" />
        },
        { 
          title: "Active Customers", 
          value: "5", 
          change: "+0%", 
          trend: "neutral",
          icon: <UsersIcon className="h-5 w-5 text-green-600" />
        },
        { 
          title: "Monthly Revenue", 
          value: "$13,250", 
          change: "+8%", 
          trend: "up",
          icon: <DollarSignIcon className="h-5 w-5 text-amber-600" />
        },
      ];
    } else {
      // Admin role
      return [
        { 
          title: "Total Orders", 
          value: "126", 
          change: "+18%", 
          trend: "up",
          icon: <PackageIcon className="h-5 w-5 text-blue-600" />
        },
        { 
          title: "Active Shipments", 
          value: "32", 
          change: "+22%", 
          trend: "up",
          icon: <TruckIcon className="h-5 w-5 text-indigo-600" />
        },
        { 
          title: "Users", 
          value: "48", 
          change: "+15%", 
          trend: "up",
          icon: <UsersIcon className="h-5 w-5 text-green-600" />
        },
        { 
          title: "Monthly Revenue", 
          value: "$142,500", 
          change: "+24%", 
          trend: "up",
          icon: <DollarSignIcon className="h-5 w-5 text-amber-600" />
        },
      ];
    }
  };
  
  const stats = getStats();
  
  return (
    <div className="space-y-6">
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={stat.title} className={`transition-all duration-500 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`} style={{ transitionDelay: `${i * 100}ms` }}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                {stat.icon}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center mt-1">
                {stat.trend === 'up' ? (
                  <ArrowUpIcon className="h-4 w-4 text-green-500 mr-1" />
                ) : stat.trend === 'down' ? (
                  <ArrowDownIcon className="h-4 w-4 text-red-500 mr-1" />
                ) : null}
                <p className={`text-xs ${
                  stat.trend === 'up' ? 'text-green-500' :
                  stat.trend === 'down' ? 'text-red-500' : 'text-gray-500'
                }`}>
                  {stat.change} from last month
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className={`transition-all duration-500 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`} style={{ transitionDelay: '400ms' }}>
          <CardHeader>
            <CardTitle>Orders Overview</CardTitle>
            <CardDescription>Monthly order volume</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={orderData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: 'none',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                    }} 
                  />
                  <Bar 
                    dataKey="orders" 
                    fill="#3b82f6" 
                    radius={[4, 4, 0, 0]} 
                    barSize={30}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className={`transition-all duration-500 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`} style={{ transitionDelay: '500ms' }}>
          <CardHeader>
            <CardTitle>Shipping Activity</CardTitle>
            <CardDescription>Consolidated shipments per month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={shipmentData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: 'none',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="shipments" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    dot={{ r: 4, fill: "#3b82f6", strokeWidth: 2, stroke: "white" }}
                    activeDot={{ r: 6, fill: "#3b82f6", strokeWidth: 2, stroke: "white" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <Card className={`transition-all duration-500 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`} style={{ transitionDelay: '600ms' }}>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest transactions and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              {recentActivity.map((activity, i) => (
                <div key={activity.id} className="flex items-center">
                  <div className={`h-9 w-9 rounded-full flex items-center justify-center mr-3 ${
                    activity.status === 'pending' ? 'bg-yellow-100' :
                    activity.status === 'processing' ? 'bg-blue-100' : 'bg-green-100'
                  }`}>
                    <span className={`h-2 w-2 rounded-full ${
                      activity.status === 'pending' ? 'bg-yellow-500' :
                      activity.status === 'processing' ? 'bg-blue-500' : 'bg-green-500'
                    }`}></span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{activity.action}</p>
                        <p className="text-sm text-muted-foreground">{activity.details}</p>
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {activity.timestamp}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Overview;
