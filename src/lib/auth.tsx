
import { useState, useEffect, createContext, useContext, useRef } from 'react';
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
  logout: () => Promise<void>;
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
  
  // Use a ref to track component mount state
  const isMounted = useRef(true);

  // Set up Supabase auth state listener
  useEffect(() => {
    console.log("Setting up auth state listener");
    setIsLoading(true);
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log("Auth state changed:", event, !!currentSession);
        
        if (!isMounted.current) return;
        
        if (currentSession) {
          setSession(currentSession);
          
          // Use setTimeout to avoid potential deadlocks with Supabase client
          setTimeout(async () => {
            try {
              // Fetch the user profile data
              const { data: profile, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', currentSession.user.id)
                .maybeSingle();

              if (error) {
                console.error('Error fetching user profile:', error);
                if (isMounted.current) setUser(null);
              } else if (profile) {
                if (isMounted.current) {
                  console.log("Profile loaded successfully, setting user:", profile.email);
                  setUser({
                    id: profile.id,
                    email: profile.email,
                    name: profile.name,
                    role: profile.role,
                    avatar: profile.avatar,
                  });
                }
              } else {
                console.log('No profile found for user, waiting for DB trigger to create one');
              }
            } catch (error) {
              console.error('Session restoration error:', error);
              if (isMounted.current) setUser(null);
            } finally {
              if (isMounted.current) {
                console.log("Auth loading complete, user:", user?.email || "null");
                setIsLoading(false);
              }
            }
          }, 0);
        } else {
          if (isMounted.current) {
            console.log("No active session, clearing user state");
            setSession(null);
            setUser(null);
            setIsLoading(false);
          }
        }
      }
    );

    // Check for existing session
    const initializeAuth = async () => {
      try {
        const { data: { session: initialSession } } = await supabase.auth.getSession();
        
        if (initialSession?.user && isMounted.current) {
          console.log("Found existing session");
          setSession(initialSession);
          
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', initialSession.user.id)
            .maybeSingle();

          if (error) {
            console.error('Error fetching user profile:', error);
            if (isMounted.current) setUser(null);
          } else if (profile && isMounted.current) {
            console.log("Setting user from existing session:", profile.email);
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
        console.error('Initial auth error:', error);
        if (isMounted.current) setUser(null);
      } finally {
        if (isMounted.current) {
          console.log("Initial auth check complete");
          setIsLoading(false);
        }
      }
    };

    // Initialize auth after a small delay to avoid race conditions
    setTimeout(initializeAuth, 10);

    return () => {
      console.log("Cleaning up auth state listener");
      isMounted.current = false;
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    if (!isMounted.current) return;
    
    setIsLoading(true);
    try {
      console.log("Attempting login for:", email);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Login error:", error.message, error.code);
        throw error;
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
      if (isMounted.current) setIsLoading(false);
    }
  };

  const logout = async () => {
    if (!isMounted.current) return;
    
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
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
    } finally {
      if (isMounted.current) {
        setUser(null);
        setSession(null);
        setIsLoading(false);
      }
    }
  };

  const register = async (name: string, email: string, password: string, role: UserRole) => {
    if (!isMounted.current) return;
    
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
        description: "Your account has been created. You can now log in.",
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
      if (isMounted.current) setIsLoading(false);
    }
  };

  const resendConfirmationEmail = async (email: string) => {
    if (!isMounted.current) return;
    
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
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      login, 
      logout, 
      register, 
      resendConfirmationEmail 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the auth context
export function useAuth() {
  return useContext(AuthContext);
}
