
// Simple auth utilities
import { useState, useEffect, createContext, useContext } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Session, User as SupabaseUser } from '@supabase/supabase-js';
import { useToast } from '@/hooks/use-toast';

export type UserRole = 'customer' | 'supplier' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  resendConfirmationEmail: (email: string) => Promise<void>;
}

// Create an authentication context
const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// Auth provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [session, setSession] = useState<Session | null>(null);
  const { toast } = useToast();

  // Set up Supabase auth state listener
  useEffect(() => {
    let mounted = true;
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        if (!mounted) return;
        
        console.log("Auth state changed:", event, !!currentSession);
        setSession(currentSession);
        
        if (currentSession?.user) {
          try {
            // Fetch the user profile data
            const { data: profile, error } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', currentSession.user.id)
              .single();

            if (error) {
              console.error('Error fetching user profile:', error);
              if (mounted) setUser(null);
            } else if (profile) {
              if (mounted) {
                setUser({
                  id: profile.id,
                  email: profile.email,
                  name: profile.name,
                  role: profile.role,
                  avatar: profile.avatar,
                });
              }
            }
          } catch (error) {
            console.error('Session restoration error:', error);
            if (mounted) setUser(null);
          }
        } else {
          if (mounted) setUser(null);
        }
        
        if (mounted) setIsLoading(false);
      }
    );

    // Check for existing session
    const initializeAuth = async () => {
      if (!mounted) return;
      setIsLoading(true);
      
      try {
        const { data: { session: initialSession } } = await supabase.auth.getSession();
        
        if (initialSession?.user) {
          console.log("Found existing session");
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', initialSession.user.id)
            .single();

          if (error) {
            console.error('Error fetching user profile:', error);
            if (mounted) setUser(null);
          } else if (profile) {
            if (mounted) {
              setUser({
                id: profile.id,
                email: profile.email,
                name: profile.name,
                role: profile.role,
                avatar: profile.avatar,
              });
            }
          }
        }
      } catch (error) {
        console.error('Initial auth error:', error);
        if (mounted) setUser(null);
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    initializeAuth();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      console.log("Attempting login for:", email);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Login error:", error.message, error.code);
        
        // Handle the email not confirmed error specifically
        if (error.message === "Email not confirmed" || error.code === "email_not_confirmed") {
          toast({
            title: "Email not verified",
            description: "Please check your email and click the verification link first. We can resend the email if needed.",
            variant: "destructive",
          });
          
          // Automatically resend the verification email
          await supabase.auth.resend({
            type: 'signup',
            email,
          });
          
          toast({
            title: "Verification email resent",
            description: "We've sent another verification email. Please check your inbox.",
          });
        } else {
          throw error;
        }
      } else {
        console.log("Login successful, session:", !!data.session);
        toast({
          title: "Login successful",
          description: "Welcome back to GROOP!",
        });
      }
    } catch (error: any) {
      console.error('Login error details:', error);
      toast({
        title: "Login failed",
        description: error.message || "An error occurred during login",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Logout successful",
        description: "You have been logged out",
      });
    } catch (error: any) {
      console.error('Logout error:', error);
      toast({
        title: "Logout failed",
        description: error.message || "An error occurred during logout",
        variant: "destructive",
      });
    }
  };

  const register = async (name: string, email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    try {
      console.log("Registering user:", email, role);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            role
          }
        }
      });

      if (error) throw error;

      toast({
        title: "Registration successful",
        description: "Your account has been created. Please check your email for verification.",
      });
    } catch (error: any) {
      console.error('Registration error:', error);
      toast({
        title: "Registration failed",
        description: error.message || "An error occurred during registration",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const resendConfirmationEmail = async (email: string) => {
    try {
      console.log("Resending confirmation to:", email);
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
      });

      if (error) throw error;

      toast({
        title: "Verification email sent",
        description: "Please check your inbox for the verification link.",
      });
    } catch (error: any) {
      console.error('Email resend error:', error);
      toast({
        title: "Failed to resend verification email",
        description: error.message || "An error occurred",
        variant: "destructive",
      });
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, register, resendConfirmationEmail }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the auth context
export function useAuth() {
  return useContext(AuthContext);
}
