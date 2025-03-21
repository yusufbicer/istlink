import { useState, useEffect } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle, 
  CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { 
  PackageIcon, 
  PlusIcon, 
  X, 
  Edit, 
  Trash,
  Loader2,
  ImageIcon
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/types/supabase";

interface ProductFormValues {
  name: string;
  description: string;
  price: string;
  sku: string;
  category: string;
  stock: string;
}

const Products = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const form = useForm<ProductFormValues>({
    defaultValues: {
      name: '',
      description: '',
      price: '',
      sku: '',
      category: '',
      stock: ''
    }
  });
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let query = supabase.from('products').select('*');
        
        if (user?.role === 'supplier') {
          const { data: supplierData } = await supabase
            .from('suppliers')
            .select('id')
            .eq('user_id', user.id)
            .single();
            
          if (supplierData?.id) {
            query = query.eq('supplier_id', supplierData.id);
          }
        }
        
        const { data, error } = await query;
        
        if (error) throw error;
        
        setProducts(data || []);
      } catch (error: any) {
        console.error('Error fetching products:', error.message);
        toast({
          title: "Error",
          description: "Failed to load products",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProducts();
  }, [user, toast]);
  
  const onSubmit = async (data: ProductFormValues) => {
    try {
      const { data: supplierData, error: supplierError } = await supabase
        .from('suppliers')
        .select('id')
        .eq('user_id', user?.id)
        .single();
        
      if (supplierError) throw supplierError;
      
      if (!supplierData?.id) {
        const { data: newSupplier, error: createError } = await supabase
          .from('suppliers')
          .insert({
            name: user?.name || 'Unknown Supplier',
            user_id: user?.id
          })
          .select();
          
        if (createError) throw createError;
        
        const { error } = await supabase
          .from('products')
          .insert({
            supplier_id: newSupplier[0].id,
            name: data.name,
            description: data.description,
            price: parseFloat(data.price),
            image_url: selectedImage,
            category: data.category
          });
          
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('products')
          .insert({
            supplier_id: supplierData.id,
            name: data.name,
            description: data.description,
            price: parseFloat(data.price),
            image_url: selectedImage,
            category: data.category
          });
          
        if (error) throw error;
      }
      
      const { data: updatedProducts } = await supabase
        .from('products')
        .select('*');
        
      setProducts(updatedProducts || []);
      setShowAddForm(false);
      form.reset();
      setSelectedImage(null);
      
      toast({
        title: "Product added",
        description: `${data.name} has been added to your catalog.`,
      });
    } catch (error: any) {
      console.error('Error adding product:', error.message);
      toast({
        title: "Error",
        description: error.message || "Failed to add product",
        variant: "destructive",
      });
    }
  };

  const handleCancel = () => {
    setShowAddForm(false);
    form.reset();
    setSelectedImage(null);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    
    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    
    setIsUploading(true);
    
    try {
      const { error: uploadError } = await supabase.storage
        .from('products')
        .upload(fileName, file);
        
      if (uploadError) throw uploadError;
      
      const { data: { publicUrl } } = supabase.storage
        .from('products')
        .getPublicUrl(fileName);
        
      setSelectedImage(publicUrl);
      
      toast({
        title: "Image uploaded",
        description: "The product image has been uploaded successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message || "There was a problem uploading your image",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
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
        <Card>
          <CardHeader>
            <CardTitle>Add New Product</CardTitle>
            <CardDescription>Enter the details of your new product</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter product name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Widgets">Widgets</SelectItem>
                            <SelectItem value="Gadgets">Gadgets</SelectItem>
                            <SelectItem value="Accessories">Accessories</SelectItem>
                            <SelectItem value="Parts">Parts</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-2">
                  <FormLabel>Product Image</FormLabel>
                  <div className="flex flex-col gap-2">
                    {selectedImage && (
                      <div className="relative w-full h-40 border rounded-md overflow-hidden">
                        <img 
                          src={selectedImage} 
                          alt="Product" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <Label 
                      htmlFor="product-image" 
                      className="cursor-pointer flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      {isUploading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <ImageIcon className="mr-2 h-4 w-4" />
                          Upload Product Image
                        </>
                      )}
                    </Label>
                    <Input 
                      id="product-image" 
                      type="file" 
                      accept="image/*"
                      className="hidden" 
                      onChange={handleImageUpload}
                      disabled={isUploading}
                    />
                  </div>
                </div>
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Enter product description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price ($)</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.01" min="0" placeholder="0.00" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="stock"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Stock Quantity</FormLabel>
                        <FormControl>
                          <Input type="number" min="0" placeholder="0" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="flex justify-end space-x-2 pt-4">
                  <Button type="button" variant="outline" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    Add Product
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}
      
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      ) : (
        <>
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
                  {products.filter(p => parseFloat(p.price?.toString() || '0') > 0).length}
                </CardTitle>
                <CardDescription>Active Products</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  {products.length > 0 
                    ? `${Math.round((products.filter(p => parseFloat(p.price?.toString() || '0') > 0).length / products.length) * 100)}% of your products are currently active`
                    : 'No products available'
                  }
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl">
                  {products.filter(p => parseFloat(p.price?.toString() || '0') === 0).length}
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
                    <Button onClick={() => setShowAddForm(true)}>
                      <PlusIcon className="mr-2 h-4 w-4" />
                      Add Your First Product
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default Products;
