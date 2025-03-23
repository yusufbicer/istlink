
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PermissionGuard } from "@/components/ui/permission-guard";
import { WithLoading } from "@/components/ui/loading";
import ErrorBoundary from "@/components/ui/error-boundary";
import { useAuth } from "@/lib/auth";
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
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  
  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      setIsVisible(true);
    }, 800);
    
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
    <ErrorBoundary>
      <WithLoading isLoading={isLoading} loadingMessage="Loading shipments...">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold">Shipments</h1>
              <p className="text-muted-foreground">Manage and track your consolidated shipments.</p>
            </div>
            
            {/* Use PermissionGuard for role-specific buttons */}
            <PermissionGuard resource="shipping" action="create" fallback={null}>
              <Button className="h-10">
                <PlusIcon className="mr-2 h-4 w-4" />
                New Shipment
              </Button>
            </PermissionGuard>
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
                      <PermissionGuard resource="shipping" action="update" fallback={
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      }>
                        <Button size="sm">
                          Manage
                          <ArrowRightIcon className="ml-2 h-3 w-3" />
                        </Button>
                      </PermissionGuard>
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
                        <PermissionGuard resource="shipping" action="update" fallback={
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                        }>
                          <Button size="sm">
                            Manage
                            <ArrowRightIcon className="ml-2 h-3 w-3" />
                          </Button>
                        </PermissionGuard>
                      </CardFooter>
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
                        <PermissionGuard resource="shipping" action="update" fallback={
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                        }>
                          <Button size="sm">
                            Manage
                            <ArrowRightIcon className="ml-2 h-3 w-3" />
                          </Button>
                        </PermissionGuard>
                      </CardFooter>
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
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="flex items-center">
                              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-2">
                                <CheckCircleIcon className="h-4 w-4 text-green-600" />
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
                        <PermissionGuard resource="shipping" action="update" fallback={
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                        }>
                          <Button size="sm">
                            Manage
                            <ArrowRightIcon className="ml-2 h-3 w-3" />
                          </Button>
                        </PermissionGuard>
                      </CardFooter>
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
                  Learn More
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
                <CardTitle>Consolidation Process</CardTitle>
                <CardDescription>How your orders are consolidated and shipped</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="mt-1 mr-3 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                      <div className="text-xs font-bold text-blue-600">1</div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Order Collection</h4>
                      <p className="text-sm text-muted-foreground">
                        We receive and verify your orders from different suppliers in Turkey.
                      </p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-start">
                    <div className="mt-1 mr-3 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                      <div className="text-xs font-bold text-blue-600">2</div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Quality Inspection</h4>
                      <p className="text-sm text-muted-foreground">
                        Each item is carefully checked for quality and accuracy.
                      </p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-start">
                    <div className="mt-1 mr-3 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                      <div className="text-xs font-bold text-blue-600">3</div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Consolidation & Packaging</h4>
                      <p className="text-sm text-muted-foreground">
                        Items are consolidated into a single shipment and securely packaged.
                      </p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-start">
                    <div className="mt-1 mr-3 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                      <div className="text-xs font-bold text-blue-600">4</div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">International Shipping</h4>
                      <p className="text-sm text-muted-foreground">
                        The consolidated package is shipped to your destination with tracking.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  Start Consolidation
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </WithLoading>
    </ErrorBoundary>
  );
};

export default Shipping;
