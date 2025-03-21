
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon, Loader2 } from "lucide-react";
import { useAuth } from "@/lib/auth";
import ProductForm from "@/components/products/ProductForm";
import ProductList from "@/components/products/ProductList";
import ProductStats from "@/components/products/ProductStats";
import { useProducts } from "@/hooks/use-products";

const Products = () => {
  const { user } = useAuth();
  const [showAddForm, setShowAddForm] = useState(false);
  
  const { products, isLoading, refetchProducts } = useProducts({
    userId: user?.id,
    userRole: user?.role
  });

  const handleProductAdded = () => {
    setShowAddForm(false);
    refetchProducts();
  };

  const handleCancel = () => {
    setShowAddForm(false);
  };

  const canAddProducts = user?.role === 'supplier' || user?.role === 'admin';

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-muted-foreground">Manage your product catalog</p>
        </div>
        
        {canAddProducts && !showAddForm && (
          <Button onClick={() => setShowAddForm(true)}>
            <PlusIcon className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        )}
      </div>
      
      {showAddForm && (
        <ProductForm 
          userId={user?.id}
          onSuccess={handleProductAdded}
          onCancel={handleCancel}
        />
      )}
      
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      ) : (
        <>
          <ProductStats products={products} />
          <ProductList 
            products={products}
            canAddProducts={canAddProducts}
            onAddProduct={() => setShowAddForm(true)}
          />
        </>
      )}
    </div>
  );
};

export default Products;
