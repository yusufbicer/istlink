
import { useState, useEffect, createContext, useContext, useRef } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase, Profile, UserRole, generateUUID } from "@/integrations/supabase/client";
import { useToast } from '@/components/ui/use-toast';

interface AuthContextType {
  user: Profile | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  resendConfirmationEmail: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [session, setSession] = useState<Session | null>(null);
  const { toast } = useToast();
  const isMounted = useRef(true);

  // Set up auth state listener
  useEffect(() => {
    console.log("[Auth] Setting up auth state listener");
    setIsLoading(true);
    
    // Initialize auth listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log("[Auth] Auth state changed:", event, !!currentSession);
        
        if (!isMounted.current) return;
        
        if (currentSession) {
          setSession(currentSession);
          
          if (event === 'SIGNED_IN') {
            // Set a temporary user to allow redirect
            setUser({
              id: currentSession.user.id,
              email: currentSession.user.email || 'unknown',
              name: currentSession.user.email?.split('@')[0] || 'User',
              role: 'customer',
            });
            setIsLoading(false);
            
            // Fetch full profile in background
            setTimeout(async () => {
              try {
                const { data, error } = await supabase
                  .from('profiles')
                  .select('*')
                  .eq('id', currentSession.user.id)
                  .maybeSingle();

                if (error) {
                  console.error('[Auth] Error fetching profile:', error);
                } else if (data && isMounted.current) {
                  setUser(data as Profile);
                }
              } catch (error) {
                console.error('[Auth] Error loading profile:', error);
              }
            }, 100);
          } else {
            // For other events, fetch profile normally
            setTimeout(async () => {
              try {
                const { data, error } = await supabase
                  .from('profiles')
                  .select('*')
                  .eq('id', currentSession.user.id)
                  .maybeSingle();

                if (error) {
                  console.error('[Auth] Error fetching profile:', error);
                  if (isMounted.current) setUser(null);
                } else if (data && isMounted.current) {
                  setUser(data as Profile);
                }
              } catch (error) {
                console.error('[Auth] Session restoration error:', error);
                if (isMounted.current) setUser(null);
              } finally {
                if (isMounted.current) setIsLoading(false);
              }
            }, 0);
          }
        } else {
          if (isMounted.current) {
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
          setSession(initialSession);
          
          // Set temporary user for immediate redirect
          setUser({
            id: initialSession.user.id,
            email: initialSession.user.email || 'unknown',
            name: initialSession.user.email?.split('@')[0] || 'User',
            role: 'customer',
          });
          setIsLoading(false);
          
          // Fetch actual profile in background
          setTimeout(async () => {
            try {
              const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', initialSession.user.id)
                .maybeSingle();

              if (error) {
                console.error('[Auth] Error fetching profile:', error);
              } else if (data && isMounted.current) {
                setUser(data as Profile);
              }
            } catch (error) {
              console.error('[Auth] Initial auth error:', error);
            }
          }, 100);
        } else {
          if (isMounted.current) {
            setIsLoading(false);
          }
        }
      } catch (error) {
        console.error('[Auth] Initial auth error:', error);
        if (isMounted.current) {
          setUser(null);
          setIsLoading(false);
        }
      }
    };

    setTimeout(initializeAuth, 10);

    return () => {
      isMounted.current = false;
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    if (!isMounted.current) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
    } catch (error: any) {
      console.error('Login error:', error);
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
      // Create the auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            role
          }
        }
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error("Failed to create user account");
      
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
      if (isMounted.current) setIsLoading(false);
    }
  };

  const resendConfirmationEmail = async (email: string) => {
    if (!isMounted.current) return;
    
    try {
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

export function useAuth() {
  return useContext(AuthContext);
}

export type { UserRole };
export type { Profile as User };
