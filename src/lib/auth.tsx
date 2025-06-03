
import React, { createContext, useContext, useState } from "react";

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
  
  // Sign up function
  const signUp = async (email: string, password: string, name?: string): Promise<User> => {
    // TODO: Implement signup when Supabase is integrated
    const userData: User = {
      id: '1',
      name: name || null,
      email: email,
      role: 'user',
    };
    setUser(userData);
    return userData;
  };

  // Login function
  const login = async (email: string, password: string): Promise<User> => {
    // TODO: Implement login when Supabase is integrated
    const userData: User = {
      id: '1',
      name: null,
      email: email,
      role: 'user',
    };
    setUser(userData);
    return userData;
  };

  // Logout function
  const logout = () => {
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
      {children}
    </AuthContext.Provider>
  );
};
