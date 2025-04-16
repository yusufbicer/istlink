
import React, { createContext, useContext, useState, useEffect } from "react";

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
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo users for testing - now with an admin user
const demoUsers: User[] = [
  { 
    id: "1", 
    name: "Demo User", 
    email: "demo@example.com",
    role: 'user' 
  },
  { 
    id: "2", 
    name: "Admin User", 
    email: "admin@groop.ai", 
    role: 'admin' 
  }
];

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
  
  // Check for saved user on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    // For early access mode, use a simple hardcoded credential check
    if (password !== "password") {
      throw new Error("Invalid credentials");
    }

    const foundUser = demoUsers.find(u => u.email === email);
    if (!foundUser) {
      throw new Error("User not found");
    }
    
    // Set the user in state
    setUser(foundUser);
    
    // Save to localStorage
    localStorage.setItem("user", JSON.stringify(foundUser));
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // Value provided to consuming components
  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout
  };
  
  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};
