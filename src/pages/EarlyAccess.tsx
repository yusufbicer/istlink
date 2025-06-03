
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { supabase } from "@/integrations/supabase/client";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft } from "lucide-react";

// Validation schema
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  company: z.string().optional(),
  reason: z.string().min(10, "Please provide a bit more detail (min 10 characters)").max(500, "Please keep your response under 500 characters"),
});

type FormValues = z.infer<typeof formSchema>;

const EarlyAccess = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if coming from footer newsletter subscription
  const isNewsletterSubscription = location.pathname === '/early-access' && location.state?.isNewsletter;
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      reason: "",
    }
  });
  
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Make sure to send the data as a single object, not an array
      const { error } = await supabase
        .from('early_access_requests')
        .insert({
          name: data.name,
          email: data.email,
          company: data.company || null, // Use null for empty optional fields
          reason: data.reason
        });
      
      if (error) throw error;
      
      const successMessage = isNewsletterSubscription 
        ? "Successfully subscribed to our newsletter! We'll keep you updated."
        : "Thank you for your interest in istLinq. We'll be in touch soon.";
      
      toast({
        title: isNewsletterSubscription ? "Newsletter subscription successful!" : "Request submitted successfully!",
        description: successMessage,
      });
      
      form.reset();
      setTimeout(() => navigate('/'), 2000);
    } catch (error: any) {
      let errorMessage = "Failed to submit your request. Please try again.";
      
      // Handle duplicate email error
      if (error.code === '23505') {
        errorMessage = isNewsletterSubscription 
          ? "This email is already subscribed to our newsletter."
          : "This email has already been registered for early access.";
      }
      
      toast({
        title: "Submission Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const pageTitle = isNewsletterSubscription ? "Subscribe to Our Newsletter" : "Request Access";
  const pageDescription = isNewsletterSubscription 
    ? "Stay updated with the latest news and updates from istLinq's innovative supply chain solutions."
    : "Join our exclusive early access program and be among the first to experience istLinq's innovative supply chain solutions.";
  
  return (
    <div className="container mx-auto p-6 min-h-screen">
      {/* Back to home link */}
      <div className="mb-8">
        <Link to="/" className="flex items-center text-gray-600 hover:text-metallic-blue transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to home
        </Link>
      </div>
      
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">{pageTitle}</h1>
          <p className="text-gray-600">
            {pageDescription}
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="you@company.com" {...field} />
                    </FormControl>
                    <FormDescription>
                      We'll never share your email with anyone else.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Company" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {isNewsletterSubscription 
                        ? "What interests you most about istLinq?" 
                        : "Why are you interested in istLinq?"
                      }
                    </FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder={isNewsletterSubscription 
                          ? "Tell us what aspects of our supply chain solutions interest you most..."
                          : "Tell us about your business needs and how istLinq can help..."
                        }
                        className="min-h-[120px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full bg-metallic-blue hover:bg-metallic-dark"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : (isNewsletterSubscription ? "Subscribe" : "Submit Request")}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default EarlyAccess;
