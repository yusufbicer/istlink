
import { useState, useEffect, createContext, useContext } from 'react';
import { User as SupabaseUser, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from "@/components/ui/use-toast";

export type UserRole = 'buyer' | 'supplier' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  session: Session | null;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

// Create an authentication context
const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// Auth provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Function to transform Supabase user to our User type
  const transformUser = async (supabaseUser: SupabaseUser | null, session: Session | null): Promise<User | null> => {
    if (!supabaseUser) return null;

    try {
      // Fetch the user profile from our profiles table
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('name, role, avatar_url')
        .eq('id', supabaseUser.id)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        return null;
      }

      return {
        id: supabaseUser.id,
        name: profile?.name || supabaseUser.email?.split('@')[0] || 'User',
        email: supabaseUser.email || '',
        role: (profile?.role as UserRole) || 'buyer',
        avatar: profile?.avatar_url,
        session: session
      };
    } catch (error) {
      console.error('Error transforming user:', error);
      return null;
    }
  };

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      setIsLoading(true);
      
      // Set up auth state listener FIRST
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          console.log('Auth state changed:', event);
          
          if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
            const user = await transformUser(session?.user || null, session);
            setUser(user);
          } else if (event === 'SIGNED_OUT') {
            setUser(null);
          }
        }
      );

      // THEN check for existing session
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const user = await transformUser(session.user, session);
        setUser(user);
      }

      setIsLoading(false);
      
      return () => {
        subscription.unsubscribe();
      };
    };

    initializeAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    // Special case for admin login with hardcoded credentials
    if (email === 'admin@example.com' && password === 'admin123') {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({ 
          email, 
          password 
        });

        if (error) {
          // If the admin user doesn't exist yet, create it
          if (error.message.includes('Invalid login credentials')) {
            console.log('Admin user does not exist, creating...');
            return register('Admin User', 'admin@example.com', 'admin123', 'admin');
          }
          throw error;
        }

        const user = await transformUser(data.user, data.session);
        setUser(user);
        
        toast({
          title: "Admin login successful",
          description: "Welcome to the admin dashboard!",
        });
        
        return;
      } catch (error: any) {
        console.error('Admin login error:', error);
        throw error;
      }
    }

    // Regular login process
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ 
        email, 
        password 
      });

      if (error) {
        throw error;
      }

      const user = await transformUser(data.user, data.session);
      setUser(user);
      
      toast({
        title: "Login successful",
        description: `Welcome back${user?.name ? ', ' + user.name : ''}!`,
      });
    } catch (error: any) {
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

  // Logout function
  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
    } catch (error: any) {
      toast({
        title: "Logout failed",
        description: error.message || "An error occurred during logout",
        variant: "destructive",
      });
      throw error;
    }
  };

  // Registration function
  const register = async (name: string, email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    try {
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

      if (error) {
        throw error;
      }

      // The profile will be created automatically by the database trigger
      // we set up in our SQL migration

      const user = await transformUser(data.user, data.session);
      setUser(user);
      
      toast({
        title: "Registration successful",
        description: "Your account has been created successfully.",
      });
    } catch (error: any) {
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

  // Update profile function
  const updateProfile = async (data: Partial<User>) => {
    if (!user) throw new Error("No user is logged in");
    
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          name: data.name,
          avatar_url: data.avatar
        })
        .eq('id', user.id);

      if (error) throw error;

      // Update the user state with new values
      setUser(prev => prev ? { ...prev, ...data } : null);
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Profile update failed",
        description: error.message || "An error occurred updating your profile",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, register, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the auth context
export function useAuth() {
  return useContext(AuthContext);
}
