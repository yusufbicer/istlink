import { useState, useEffect, createContext, useContext, useRef } from 'react';
import { supabase, handleSupabaseError, generateUUID } from "@/integrations/supabase/client";
import { Session } from '@supabase/supabase-js';
import { useToast } from '@/components/ui/use-toast';

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
    console.log("[Auth] Setting up auth state listener");
    setIsLoading(true);
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log("[Auth] Auth state changed:", event, !!currentSession);
        
        if (!isMounted.current) return;
        
        if (currentSession) {
          setSession(currentSession);
          
          // After successful login, assume user exists and immediately set a placeholder to allow redirect
          if (event === 'SIGNED_IN') {
            console.log("[Auth] Signed in, setting temporary user to allow redirect");
            const tempUser = {
              id: currentSession.user.id,
              email: currentSession.user.email || 'unknown',
              name: currentSession.user.email?.split('@')[0] || 'User',
              role: 'customer' as UserRole,
            };
            setUser(tempUser);
            setIsLoading(false);
            
            // Then fetch the actual profile data in the background
            setTimeout(async () => {
              try {
                console.log("[Auth] Fetching user profile for", currentSession.user.id);
                // Fetch the user data from profiles table
                const { data: userData, error } = await supabase
                  .from('profiles')
                  .select('*')
                  .eq('id', currentSession.user.id)
                  .maybeSingle();

                if (error) {
                  console.error('[Auth] Error fetching user profile:', error);
                  // Don't clear user here - keep the temporary one
                } else if (userData) {
                  console.log("[Auth] Profile loaded successfully:", userData.email);
                  if (isMounted.current) {
                    setUser({
                      id: userData.id,
                      email: userData.email,
                      name: userData.name,
                      role: userData.role,
                      avatar: userData.avatar,
                    });
                  }
                } else {
                  console.log('[Auth] No profile found, keeping temporary user');
                }
              } catch (error) {
                console.error('[Auth] Error loading profile:', error);
                // Keep temporary user
              }
            }, 100);
          } else {
            // For other events, use the normal profile loading flow with setTimeout
            setTimeout(async () => {
              try {
                // Fetch the user data from profiles table
                const { data: userData, error } = await supabase
                  .from('profiles')
                  .select('*')
                  .eq('id', currentSession.user.id)
                  .maybeSingle();

                if (error) {
                  console.error('[Auth] Error fetching user profile:', error);
                  if (isMounted.current) setUser(null);
                } else if (userData) {
                  if (isMounted.current) {
                    console.log("[Auth] Profile loaded:", userData.email);
                    setUser({
                      id: userData.id,
                      email: userData.email,
                      name: userData.name,
                      role: userData.role,
                      avatar: userData.avatar,
                    });
                  }
                } else {
                  console.log('[Auth] No profile found for user, waiting for DB trigger');
                }
              } catch (error) {
                console.error('[Auth] Session restoration error:', error);
                if (isMounted.current) setUser(null);
              } finally {
                if (isMounted.current) {
                  console.log("[Auth] Auth loading complete, user:", user?.email || "null");
                  setIsLoading(false);
                }
              }
            }, 0);
          }
        } else {
          if (isMounted.current) {
            console.log("[Auth] No active session, clearing user state");
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
        console.log("[Auth] Checking for existing session");
        const { data: { session: initialSession } } = await supabase.auth.getSession();
        
        if (initialSession?.user && isMounted.current) {
          console.log("[Auth] Found existing session for", initialSession.user.email);
          setSession(initialSession);
          
          // Set temporary user first to allow immediate redirect
          const tempUser = {
            id: initialSession.user.id,
            email: initialSession.user.email || 'unknown',
            name: initialSession.user.email?.split('@')[0] || 'User',
            role: 'customer' as UserRole,
          };
          setUser(tempUser);
          setIsLoading(false);
          
          // Then fetch the actual profile in the background
          setTimeout(async () => {
            try {
              const { data: userData, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', initialSession.user.id)
                .maybeSingle();

              if (error) {
                console.error('[Auth] Error fetching user profile:', error);
                // Keep the temporary user instead of setting to null
              } else if (userData && isMounted.current) {
                console.log("[Auth] Setting user from existing session:", userData.email);
                setUser({
                  id: userData.id,
                  email: userData.email,
                  name: userData.name,
                  role: userData.role,
                  avatar: userData.avatar,
                });
              }
            } catch (error) {
              console.error('[Auth] Initial auth error:', error);
              // Keep the temporary user
            }
          }, 100);
        } else {
          if (isMounted.current) {
            console.log("[Auth] No existing session");
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

    // Initialize auth after a small delay to avoid race conditions
    setTimeout(initializeAuth, 10);

    return () => {
      console.log("[Auth] Cleaning up auth state listener");
      isMounted.current = false;
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    if (!isMounted.current) return;
    
    setIsLoading(true);
    try {
      console.log("[Auth] Attempting login for:", email);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("[Auth] Login error:", error.message, error.code);
        throw error;
      } else {
        console.log("[Auth] Login successful, session:", !!data.session);
        toast({
          title: "Login successful",
          description: "Welcome back to GROOP!",
        });
      }
    } catch (error: any) {
      console.error('[Auth] Login error details:', error);
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
      
      // First, sign up the user with Supabase Auth
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
      
      if (!authData.user) {
        throw new Error("Failed to create user account");
      }
      
      // If role is supplier, create a supplier record
      if (role === 'supplier') {
        const { error: supplierError } = await supabase
          .from('suppliers')
          .insert({
            id: generateUUID(),
            user_id: authData.user.id,
            company_name: name + " Company" // Default company name
          });
          
        if (supplierError) {
          console.error("Error creating supplier record:", supplierError);
          // Note: We don't clean up here as the user record is still valid
        }
      }
      
      // If role is customer, create a customer record
      if (role === 'customer') {
        const { error: customerError } = await supabase
          .from('customers')
          .insert({
            id: generateUUID(),
            user_id: authData.user.id,
            company_name: name + " Company" // Default company name
          });
          
        if (customerError) {
          console.error("Error creating customer record:", customerError);
          // Note: We don't clean up here as the user record is still valid
        }
      }

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
