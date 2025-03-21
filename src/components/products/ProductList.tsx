
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/supabase";
import { formatCurrency } from "@/lib/utils";
import { ImageIcon, PlusIcon } from "lucide-react";

interface ProductListProps {
  products: Product[];
  canAddProducts: boolean;
  onAddProduct: () => void;
}

const ProductList = ({ products, canAddProducts, onAddProduct }: ProductListProps) => {
  // Helper function to format price
  const getPrice = (price: number | null | undefined) => {
    if (price === null || price === undefined || price === 0) {
      return "Not priced";
    }
    return formatCurrency(price);
  };

  // Helper function to get image or placeholder
  const getImageElement = (imageUrl: string | null | undefined) => {
    if (!imageUrl) {
      return (
        <div className="flex items-center justify-center bg-gray-100 h-10 w-10 rounded">
          <ImageIcon className="h-5 w-5 text-gray-400" />
        </div>
      );
    }
    return (
      <img
        src={imageUrl}
        alt="Product"
        className="h-10 w-10 rounded object-cover"
      />
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Products</CardTitle>
        <CardDescription>
          Manage your products and pricing
        </CardDescription>
      </CardHeader>
      <CardContent>
        {products.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    {getImageElement(product.image_url)}
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>
                    {product.description || 
                      <span className="text-gray-400 italic">No description</span>
                    }
                  </TableCell>
                  <TableCell>{getPrice(product.price)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <ImageIcon className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No products found</h3>
            <p className="text-muted-foreground max-w-sm mb-6">
              {canAddProducts
                ? "You haven't added any products yet. Add your first product to get started."
                : "No products are available in the system yet."}
            </p>
            {canAddProducts && (
              <Button onClick={onAddProduct} className="gap-2">
                <PlusIcon className="h-4 w-4" />
                Add First Product
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductList;
