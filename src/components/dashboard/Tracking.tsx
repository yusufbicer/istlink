
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPinIcon, TruckIcon, PackageIcon, CheckCircleIcon } from "lucide-react";

const Tracking = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Shipment Tracking</h1>
        <p className="text-muted-foreground">Monitor your shipments in real-time</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">12</CardTitle>
            <CardDescription>Active Shipments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-blue-600 flex items-center">
              <TruckIcon className="h-4 w-4 mr-1" />
              <span>In Transit</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">5</CardTitle>
            <CardDescription>At Customs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-amber-600 flex items-center">
              <PackageIcon className="h-4 w-4 mr-1" />
              <span>Processing</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">7</CardTitle>
            <CardDescription>Delivered</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-green-600 flex items-center">
              <CheckCircleIcon className="h-4 w-4 mr-1" />
              <span>This Week</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">2</CardTitle>
            <CardDescription>Delayed</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-red-600 flex items-center">
              <MapPinIcon className="h-4 w-4 mr-1" />
              <span>Attention Needed</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Shipments</CardTitle>
          <CardDescription>
            Track your latest shipment status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">SHP-7890</p>
                <p className="text-sm text-muted-foreground">Istanbul → New York</p>
              </div>
              <div className="flex items-center text-blue-600 bg-blue-50 px-3 py-1 rounded-full text-sm">
                <TruckIcon className="h-4 w-4 mr-1" />
                <span>In Transit</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">SHP-6543</p>
                <p className="text-sm text-muted-foreground">Izmir → Los Angeles</p>
              </div>
              <div className="flex items-center text-amber-600 bg-amber-50 px-3 py-1 rounded-full text-sm">
                <PackageIcon className="h-4 w-4 mr-1" />
                <span>At Customs</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">SHP-5432</p>
                <p className="text-sm text-muted-foreground">Ankara → Chicago</p>
              </div>
              <div className="flex items-center text-green-600 bg-green-50 px-3 py-1 rounded-full text-sm">
                <CheckCircleIcon className="h-4 w-4 mr-1" />
                <span>Delivered</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Tracking;
