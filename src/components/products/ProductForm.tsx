
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2Icon } from "lucide-react";

// Define an explicit interface for the form values
interface ProductFormValues {
  name: string;
  description: string;
  price: string;
  image_url: string;
}

interface ProductFormProps {
  userId: string | undefined;
  onSuccess: () => void;
  onCancel: () => void;
}

const ProductForm = ({ userId, onSuccess, onCancel }: ProductFormProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  // Explicitly initialize with concrete type
  const [formValues, setFormValues] = useState<ProductFormValues>({
    name: '',
    description: '',
    price: '',
    image_url: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Get supplier ID for the user
      const { data: supplierData, error: supplierError } = await supabase
        .from('suppliers')
        .select('id')
        .eq('user_id', userId)
        .single();
      
      if (supplierError) {
        throw new Error('Could not find supplier information. Please complete your supplier profile first.');
      }

      // Convert price to numeric value
      const numericPrice = formValues.price ? parseFloat(formValues.price) : null;
      
      // Insert product data
      const { error } = await supabase
        .from('products')
        .insert([
          {
            name: formValues.name,
            description: formValues.description,
            price: numericPrice,
            image_url: formValues.image_url,
            supplier_id: supplierData.id
          }
        ]);

      if (error) throw error;
      
      toast({
        title: "Product Added",
        description: "Your product has been added successfully.",
      });
      
      onSuccess();
    } catch (error: any) {
      console.error('Error adding product:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to add product",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Product</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              name="name"
              value={formValues.name}
              onChange={handleChange}
              placeholder="Enter product name"
              required
              disabled={isLoading}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formValues.description}
              onChange={handleChange}
              placeholder="Enter product description"
              rows={3}
              disabled={isLoading}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="price">Price (USD)</Label>
            <Input
              id="price"
              name="price"
              type="number"
              step="0.01"
              min="0"
              value={formValues.price}
              onChange={handleChange}
              placeholder="0.00"
              disabled={isLoading}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="image_url">Image URL</Label>
            <Input
              id="image_url"
              name="image_url"
              value={formValues.image_url}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              disabled={isLoading}
            />
          </div>
          
          <div className="flex justify-end gap-3 pt-3">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                  Adding...
                </>
              ) : (
                'Add Product'
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProductForm;
