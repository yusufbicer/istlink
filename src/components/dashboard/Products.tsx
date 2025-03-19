
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PackageIcon } from "lucide-react";

const Products = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Products</h1>
        <p className="text-muted-foreground">Manage your product catalog</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">24</CardTitle>
            <CardDescription>Total Products</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center text-blue-600">
              <PackageIcon className="mr-2 h-4 w-4" />
              <span>Products</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">18</CardTitle>
            <CardDescription>Active Products</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              75% of your products are currently active
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">6</CardTitle>
            <CardDescription>Low Stock</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              Products that need reordering soon
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product Catalog</CardTitle>
          <CardDescription>
            View and manage your product inventory
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center py-6 text-muted-foreground">
            Your product list will appear here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Products;
