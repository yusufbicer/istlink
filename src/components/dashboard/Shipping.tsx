
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Package, 
  TruckIcon, 
  GlobeIcon, 
  CheckCircleIcon, 
  PlusIcon, 
  ArrowRightIcon,
  CreditCardIcon,
  ClipboardCheckIcon,
  BoxIcon
} from "lucide-react";

// Mock data for shipments
const shipments = [
  {
    id: "SHP-567",
    orders: ["ORD-1234", "ORD-1235"],
    status: "delivered",
    createdAt: "2023-07-10",
    deliveredAt: "2023-07-18",
    origin: "Istanbul, Turkey",
    destination: "Berlin, Germany",
    trackingNo: "TRK123456789",
    carrier: "International Express",
    weight: "45kg",
    dimensions: "120x80x60 cm",
    consolidation: true,
    timeline: [
      { status: "Order Placed", date: "Jul 10, 2023", completed: true },
      { status: "Processing", date: "Jul 11, 2023", completed: true },
      { status: "Consolidated", date: "Jul 12, 2023", completed: true },
      { status: "Shipped", date: "Jul 13, 2023", completed: true },
      { status: "In Transit", date: "Jul 14, 2023", completed: true },
      { status: "Out for Delivery", date: "Jul 17, 2023", completed: true },
      { status: "Delivered", date: "Jul 18, 2023", completed: true }
    ]
  },
  {
    id: "SHP-568",
    orders: ["ORD-1237"],
    status: "in-transit",
    createdAt: "2023-07-28",
    deliveredAt: null,
    origin: "Izmir, Turkey",
    destination: "Paris, France",
    trackingNo: "TRK987654321",
    carrier: "Global Logistics",
    weight: "28kg",
    dimensions: "90x60x40 cm",
    consolidation: false,
    timeline: [
      { status: "Order Placed", date: "Jul 28, 2023", completed: true },
      { status: "Processing", date: "Jul 29, 2023", completed: true },
      { status: "Consolidated", date: "Jul 30, 2023", completed: true },
      { status: "Shipped", date: "Jul 31, 2023", completed: true },
      { status: "In Transit", date: "Aug 1, 2023", completed: true },
      { status: "Out for Delivery", date: null, completed: false },
      { status: "Delivered", date: null, completed: false }
    ]
  },
  {
    id: "SHP-569",
    orders: ["ORD-1236", "ORD-1238"],
    status: "processing",
    createdAt: "2023-08-02",
    deliveredAt: null,
    origin: "Ankara, Turkey",
    destination: "London, UK",
    trackingNo: "TRK543216789",
    carrier: "Turkish Cargo",
    weight: "35kg",
    dimensions: "100x70x50 cm",
    consolidation: true,
    timeline: [
      { status: "Order Placed", date: "Aug 2, 2023", completed: true },
      { status: "Processing", date: "Aug 3, 2023", completed: true },
      { status: "Consolidated", date: null, completed: false },
      { status: "Shipped", date: null, completed: false },
      { status: "In Transit", date: null, completed: false },
      { status: "Out for Delivery", date: null, completed: false },
      { status: "Delivered", date: null, completed: false }
    ]
  }
];

const Shipping = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Get progress percentage for a shipment
  const getProgressPercentage = (timeline: any[]) => {
    const completedSteps = timeline.filter(step => step.completed).length;
    return (completedSteps / timeline.length) * 100;
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "delivered":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Delivered</Badge>;
      case "in-transit":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">In Transit</Badge>;
      case "processing":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Processing</Badge>;
      default:
        return <Badge variant="outline">Pending</Badge>;
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Shipping</h1>
          <p className="text-muted-foreground">Manage and track your consolidated shipments.</p>
        </div>
        
        <Button className="h-10">
          <PlusIcon className="mr-2 h-4 w-4" />
          New Consolidation
        </Button>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Shipments</TabsTrigger>
          <TabsTrigger value="processing">Processing</TabsTrigger>
          <TabsTrigger value="in-transit">In Transit</TabsTrigger>
          <TabsTrigger value="delivered">Delivered</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {shipments.map((shipment, index) => (
              <Card 
                key={shipment.id}
                className={`transition-all duration-500 transform ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                          <TruckIcon className="h-4 w-4 text-blue-600" />
                        </div>
                        {shipment.id}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        Created on {formatDate(shipment.createdAt)}
                      </CardDescription>
                    </div>
                    {getStatusBadge(shipment.status)}
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Progress 
                        value={getProgressPercentage(shipment.timeline)} 
                        className="h-2" 
                      />
                      <span className="text-xs text-muted-foreground ml-2">
                        {Math.round(getProgressPercentage(shipment.timeline))}%
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                      <div className="flex items-center">
                        <BoxIcon className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-muted-foreground">Orders:</span>
                      </div>
                      <div>{shipment.orders.length}</div>
                      
                      <div className="flex items-center">
                        <GlobeIcon className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-muted-foreground">Origin:</span>
                      </div>
                      <div>{shipment.origin}</div>
                      
                      <div className="flex items-center">
                        <GlobeIcon className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-muted-foreground">Destination:</span>
                      </div>
                      <div>{shipment.destination}</div>
                      
                      <div className="flex items-center">
                        <TruckIcon className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-muted-foreground">Carrier:</span>
                      </div>
                      <div>{shipment.carrier}</div>
                    </div>
                    
                    <div className="pt-2">
                      <div className="text-sm font-medium mb-2">Timeline</div>
                      <div className="relative">
                        {shipment.timeline.map((step, i) => (
                          <div key={i} className="flex mb-2 last:mb-0">
                            <div className="relative flex-none mr-3">
                              <div className={`h-5 w-5 rounded-full flex items-center justify-center ${
                                step.completed ? 'bg-blue-100' : 'bg-gray-100'
                              }`}>
                                {step.completed ? (
                                  <CheckCircleIcon className="h-3 w-3 text-blue-600" />
                                ) : (
                                  <div className="h-2 w-2 rounded-full bg-gray-400"></div>
                                )}
                              </div>
                              {i < shipment.timeline.length - 1 && (
                                <div className={`absolute top-5 left-2.5 w-0.5 h-full -ml-px ${
                                  step.completed && shipment.timeline[i + 1].completed
                                    ? 'bg-blue-200'
                                    : 'bg-gray-200'
                                }`}></div>
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between">
                                <div className={`text-xs font-medium ${
                                  step.completed ? 'text-gray-900' : 'text-gray-500'
                                }`}>
                                  {step.status}
                                </div>
                                {step.date && (
                                  <div className="text-xs text-gray-500">
                                    {step.date}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-2">
                  <Button variant="outline" size="sm">
                    Track
                  </Button>
                  <Button size="sm">
                    Details
                    <ArrowRightIcon className="ml-2 h-3 w-3" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="processing">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {shipments
              .filter(shipment => shipment.status === "processing")
              .map((shipment, index) => (
                // Same card as above, for processing shipments
                <Card key={shipment.id}>
                  {/* Card content same as above */}
                </Card>
              ))}
            
            {shipments.filter(shipment => shipment.status === "processing").length === 0 && (
              <Card className="col-span-full">
                <CardContent className="flex flex-col items-center justify-center py-8">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <Package className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No processing shipments</h3>
                  <p className="text-muted-foreground text-center mb-4">
                    There are currently no shipments in the processing stage.
                  </p>
                  <Button>Create Consolidation</Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="in-transit">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {shipments
              .filter(shipment => shipment.status === "in-transit")
              .map((shipment, index) => (
                // Same card as above, for in-transit shipments
                <Card key={shipment.id}>
                  {/* Card content same as above */}
                </Card>
              ))}
            
            {shipments.filter(shipment => shipment.status === "in-transit").length === 0 && (
              <Card className="col-span-full">
                <CardContent className="flex flex-col items-center justify-center py-8">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <TruckIcon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No in-transit shipments</h3>
                  <p className="text-muted-foreground text-center mb-4">
                    There are currently no shipments in transit.
                  </p>
                  <Button>Track Existing Shipment</Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="delivered">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {shipments
              .filter(shipment => shipment.status === "delivered")
              .map((shipment, index) => (
                // Same card as above, for delivered shipments
                <Card key={shipment.id}>
                  {/* Card content same as above */}
                </Card>
              ))}
            
            {shipments.filter(shipment => shipment.status === "delivered").length === 0 && (
              <Card className="col-span-full">
                <CardContent className="flex flex-col items-center justify-center py-8">
                  <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                    <CheckCircleIcon className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No delivered shipments</h3>
                  <p className="text-muted-foreground text-center mb-4">
                    You don't have any delivered shipments yet.
                  </p>
                  <Button>View All Shipments</Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card 
          className={`col-span-1 transition-all duration-500 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
          style={{ transitionDelay: '300ms' }}
        >
          <CardHeader>
            <CardTitle>Consolidation Benefits</CardTitle>
            <CardDescription>Why use our consolidation service</CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="mt-1 mr-3 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                  <CreditCardIcon className="h-3 w-3 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">Cost Savings</h4>
                  <p className="text-sm text-muted-foreground">
                    Save up to 30% on shipping costs by consolidating multiple orders.
                  </p>
                </div>
              </div>
              <Separator />
              <div className="flex items-start">
                <div className="mt-1 mr-3 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                  <ClipboardCheckIcon className="h-3 w-3 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">Simplified Documentation</h4>
                  <p className="text-sm text-muted-foreground">
                    One bill of lading for all your shipments from Turkey.
                  </p>
                </div>
              </div>
              <Separator />
              <div className="flex items-start">
                <div className="mt-1 mr-3 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                  <TruckIcon className="h-3 w-3 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">Efficient Tracking</h4>
                  <p className="text-sm text-muted-foreground">
                    Track all your shipments in one place with real-time updates.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Learn More About Consolidation
            </Button>
          </CardFooter>
        </Card>
        
        <Card 
          className={`col-span-1 lg:col-span-2 transition-all duration-500 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          <CardHeader>
            <CardTitle>Global Shipping Map</CardTitle>
            <CardDescription>Visualize your shipping routes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-[16/9] relative bg-gray-100 rounded-md overflow-hidden">
              {/* This would be replaced with an actual map component in a real application */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100">
                <div className="absolute top-1/4 left-1/3 h-3 w-3 rounded-full bg-blue-500 animate-ping"></div>
                <div className="absolute top-1/4 left-1/3 h-3 w-3 rounded-full bg-blue-500"></div>
                <div className="absolute top-1/3 right-1/3 h-3 w-3 rounded-full bg-green-500 animate-ping"></div>
                <div className="absolute top-1/3 right-1/3 h-3 w-3 rounded-full bg-green-500"></div>
                <div className="absolute top-1/2 right-1/4 h-3 w-3 rounded-full bg-amber-500 animate-ping"></div>
                <div className="absolute top-1/2 right-1/4 h-3 w-3 rounded-full bg-amber-500"></div>
                
                {/* Curved lines representing shipping routes */}
                <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <path 
                    d="M 200,100 C 250,150 300,170 350,150" 
                    stroke="#3b82f6" 
                    strokeWidth="2" 
                    fill="none" 
                    strokeDasharray="5,5"
                  />
                  <path 
                    d="M 300,120 C 350,130 400,150 500,200" 
                    stroke="#3b82f6" 
                    strokeWidth="2" 
                    fill="none" 
                    strokeDasharray="5,5"
                  />
                  <path 
                    d="M 200,100 C 300,100 400,120 450,200" 
                    stroke="#3b82f6" 
                    strokeWidth="2" 
                    fill="none" 
                    strokeDasharray="5,5"
                  />
                </svg>
                
                <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm p-2 rounded text-xs">
                  • Active Shipments
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Shipping;
