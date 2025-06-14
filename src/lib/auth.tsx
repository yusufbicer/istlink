
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
      (event, session) => {
        if (session?.user) {
          setUserFromSession(session.user);
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
        setUserFromSession(session.user);
      }
    } catch (error) {
      // Silent error handling for production  
    } finally {
      setIsLoading(false);
    }
  };

  const setUserFromSession = (supabaseUser: SupabaseUser) => {
    // Check if user is admin by email - simplified check for known admin emails
    const adminEmails = ['admin@istlink.com', 'yusufbicer@gmail.com'];
    const isAdmin = adminEmails.includes(supabaseUser.email || '');

    const userData: User = {
      id: supabaseUser.id,
      name: supabaseUser.user_metadata?.name || null,
      email: supabaseUser.email!,
      role: isAdmin ? 'admin' : 'user',
    };

    setUser(userData);
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

    // Check if user is admin by email
    const adminEmails = ['admin@istlink.com', 'yusufbicer@gmail.com'];
    const isAdmin = adminEmails.includes(data.user.email || '');

    const userData: User = {
      id: data.user.id,
      name: data.user.user_metadata?.name || null,
      email: data.user.email!,
      role: isAdmin ? 'admin' : 'user',
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
  
  // Don't render children until we've checked for existing session
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
