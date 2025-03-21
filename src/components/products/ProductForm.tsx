
import { useState } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { 
  Card, 
  CardHeader, 
  CardContent, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  ImageIcon,
  Loader2
} from "lucide-react";

export interface ProductFormValues {
  name: string;
  description: string;
  price: string;
  sku: string;
  category: string;
  stock: string;
}

interface ProductFormProps {
  userId: string | undefined;
  onSuccess: () => void;
  onCancel: () => void;
}

const ProductForm = ({ userId, onSuccess, onCancel }: ProductFormProps) => {
  const { toast } = useToast();
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
  
  const onSubmit = async (data: ProductFormValues) => {
    try {
      const { data: supplierData, error: supplierError } = await supabase
        .from('suppliers')
        .select('id')
        .eq('user_id', userId)
        .single();
        
      if (supplierError) throw supplierError;
      
      if (!supplierData?.id) {
        const { data: newSupplier, error: createError } = await supabase
          .from('suppliers')
          .insert({
            name: 'Unknown Supplier', // Default name if user name not available
            user_id: userId
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
      
      form.reset();
      setSelectedImage(null);
      onSuccess();
      
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

  return (
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
              <Button type="button" variant="outline" onClick={onCancel}>
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
  );
};

export default ProductForm;
