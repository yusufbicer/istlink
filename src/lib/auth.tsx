
import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User as SupabaseUser } from "@supabase/supabase-js";

// Define what a user object looks like
export type User = {
  id: string;
  name: string | null;
  email: string;
  role?: 'admin' | 'user';
};

// Define what the auth context provides
type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<User>;
  logout: () => void;
  signUp: (email: string, password: string, name?: string) => Promise<User>;
};

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook for components to access the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Provider component that wraps the app and makes auth object available
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Check for existing session on mount
  useEffect(() => {
    getSession();
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          await setUserFromSession(session.user);
        } else {
          setUser(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const getSession = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        await setUserFromSession(session.user);
      }
    } catch (error) {
      console.error("Error getting session:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const setUserFromSession = async (supabaseUser: SupabaseUser) => {
    try {
      // Check if user is admin
      const { data: adminData } = await supabase
        .from('admin_users')
        .select('role')
        .eq('user_id', supabaseUser.id)
        .single();

      const userData: User = {
        id: supabaseUser.id,
        name: supabaseUser.user_metadata?.name || null,
        email: supabaseUser.email!,
        role: adminData ? 'admin' : 'user',
      };

      setUser(userData);
    } catch (error) {
      console.error("Error setting user from session:", error);
    }
  };

  // Sign up function
  const signUp = async (email: string, password: string, name?: string): Promise<User> => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name,
        },
      },
    });

    if (error) throw error;
    if (!data.user) throw new Error("Failed to create user");

    const userData: User = {
      id: data.user.id,
      name: name || null,
      email: data.user.email!,
      role: 'user',
    };

    return userData;
  };

  // Login function
  const login = async (email: string, password: string): Promise<User> => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    if (!data.user) throw new Error("Failed to login");

    // Check if user is admin
    const { data: adminData } = await supabase
      .from('admin_users')
      .select('role')
      .eq('user_id', data.user.id)
      .single();

    const userData: User = {
      id: data.user.id,
      name: data.user.user_metadata?.name || null,
      email: data.user.email!,
      role: adminData ? 'admin' : 'user',
    };

    setUser(userData);
    return userData;
  };

  // Logout function
  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  // Value provided to consuming components
  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    signUp
  };
  
  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};
