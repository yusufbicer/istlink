
import { 
  PackageIcon, 
  Edit, 
  Trash,
  PlusIcon 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardHeader, 
  CardContent, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Product } from "@/types/supabase";

interface ProductListProps {
  products: Product[];
  canAddProducts: boolean;
  onAddProduct: () => void;
}

const ProductList = ({ products, canAddProducts, onAddProduct }: ProductListProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Catalog</CardTitle>
        <CardDescription>
          View and manage your product inventory
        </CardDescription>
      </CardHeader>
      <CardContent>
        {products.length > 0 ? (
          <div className="relative overflow-x-auto rounded-md">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-gray-50">
                <tr>
                  <th className="px-6 py-3">Product</th>
                  <th className="px-6 py-3">Category</th>
                  <th className="px-6 py-3">Price</th>
                  {canAddProducts && <th className="px-6 py-3">Actions</th>}
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="bg-white border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-md bg-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                          {product.image_url ? (
                            <img 
                              src={product.image_url} 
                              alt={product.name} 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <PackageIcon className="h-5 w-5 text-gray-400" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-xs text-gray-500 truncate max-w-xs">{product.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">{product.category || 'Uncategorized'}</td>
                    <td className="px-6 py-4">
                      {product.price 
                        ? `$${parseFloat(product.price.toString()).toFixed(2)}` 
                        : 'Not priced'
                      }
                    </td>
                    {canAddProducts && (
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-500">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <PackageIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">
              No products found
            </p>
            {canAddProducts && (
              <Button onClick={onAddProduct}>
                <PlusIcon className="mr-2 h-4 w-4" />
                Add Your First Product
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductList;
