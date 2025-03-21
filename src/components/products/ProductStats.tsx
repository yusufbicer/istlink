
import { PackageIcon } from "lucide-react";
import { 
  Card, 
  CardHeader, 
  CardContent, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Product } from "@/types/supabase";

interface ProductStatsProps {
  products: Product[];
}

const ProductStats = ({ products }: ProductStatsProps) => {
  const activeProducts = products.filter(p => parseFloat(p.price?.toString() || '0') > 0);
  const inactiveProducts = products.filter(p => parseFloat(p.price?.toString() || '0') === 0);
  
  const activePercentage = products.length > 0 
    ? Math.round((activeProducts.length / products.length) * 100)
    : 0;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl">{products.length}</CardTitle>
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
          <CardTitle className="text-2xl">
            {activeProducts.length}
          </CardTitle>
          <CardDescription>Active Products</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">
            {products.length > 0 
              ? `${activePercentage}% of your products are currently active`
              : 'No products available'
            }
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl">
            {inactiveProducts.length}
          </CardTitle>
          <CardDescription>Inactive Products</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">
            Products that need pricing
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductStats;
