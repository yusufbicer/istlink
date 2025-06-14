
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
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
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
        ? t('successfullySubscribed')
        : t('thankYouInterest');
      
      toast({
        title: isNewsletterSubscription ? t('newsletterSubscriptionSuccess') : t('requestSubmittedSuccess'),
        description: successMessage,
      });
      
      form.reset();
      setTimeout(() => navigate('/'), 2000);
    } catch (error: any) {
      let errorMessage = t('failedToSubmit');
      
      // Handle duplicate email error
      if (error.code === '23505') {
        errorMessage = isNewsletterSubscription 
          ? t('emailAlreadySubscribed')
          : t('emailAlreadyRegistered');
      }
      
      toast({
        title: t('submissionError'),
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const pageTitle = isNewsletterSubscription ? t('subscribeToOurNewsletter') : t('getStartedPage');
  const pageDescription = isNewsletterSubscription 
    ? t('newsletterDesc')
    : t('getStartedDesc');
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-6 sm:py-8 lg:py-12">
        {/* Back to home link */}
        <div className="mb-6 sm:mb-8">
          <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors group">
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            {t('backToHome')}
          </Link>
        </div>
        
        <div className="max-w-lg mx-auto">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
              <div className="w-8 h-8 bg-primary rounded-full"></div>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 text-foreground">
              {pageTitle}
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-md mx-auto">
              {pageDescription}
            </p>
          </div>
          
          {/* Form Card */}
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl shadow-xl p-6 sm:p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-foreground">
                        {t('fullName')}
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="John Doe" 
                          className="h-12 bg-background/50 border-border/60 focus:border-primary/60 focus:ring-primary/20 rounded-xl transition-all duration-200"
                          {...field} 
                        />
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
                      <FormLabel className="text-sm font-semibold text-foreground">
                        {t('businessEmail')}
                      </FormLabel>
                      <FormControl>
                        <Input 
                          type="email" 
                          placeholder="you@company.com" 
                          className="h-12 bg-background/50 border-border/60 focus:border-primary/60 focus:ring-primary/20 rounded-xl transition-all duration-200"
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription className="text-xs text-muted-foreground">
                        {t('neverShareEmail')}
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
                      <FormLabel className="text-sm font-semibold text-foreground">
                        {t('companyOptional')}
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder={t('company')} 
                          className="h-12 bg-background/50 border-border/60 focus:border-primary/60 focus:ring-primary/20 rounded-xl transition-all duration-200"
                          {...field} 
                        />
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
                      <FormLabel className="text-sm font-semibold text-foreground">
                        {isNewsletterSubscription 
                          ? t('whatInterests')
                          : t('whyInterested')
                        }
                      </FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder={isNewsletterSubscription 
                            ? t('tellUsInterests')
                            : t('tellUsAboutNeeds')
                          }
                          className="min-h-[120px] bg-background/50 border-border/60 focus:border-primary/60 focus:ring-primary/20 rounded-xl resize-none transition-all duration-200"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  size="lg"
                  className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                      {t('submitting')}
                    </div>
                  ) : (
                    isNewsletterSubscription ? t('subscribe') : t('requestEarlyAccess')
                  )}
                </Button>
              </form>
            </Form>
          </div>
          
          {/* Trust indicators */}
          <div className="text-center mt-6 text-xs text-muted-foreground">
            <p>🔒 Your information is secure and will never be shared</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarlyAccess;
