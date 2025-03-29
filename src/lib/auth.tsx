
import React, { createContext, useContext, useState, useEffect } from "react";

// Define the user role type
export type UserRole = "importer" | "supplier" | "admin";

// Define what a user object looks like
export type User = {
  id: string;
  name: string | null;
  email: string;
  role: UserRole;
  avatar?: string | null;
};

// Define what the auth context provides
type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
};

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo users for testing
const demoUsers: User[] = [
  { id: "1", name: "Importer User", email: "importer@example.com", role: "importer" },
  { id: "2", name: "Supplier User", email: "supplier@example.com", role: "supplier" },
  { id: "3", name: "Admin User", email: "admin@example.com", role: "admin" }
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
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
    // In a real app, this would validate credentials with a backend
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

  // Register function
  const register = async (name: string, email: string, password: string, role: UserRole) => {
    // In a real app, this would create a new user in a database
    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      role
    };
    
    // Set the user in state
    setUser(newUser);
    
    // Save to localStorage
    localStorage.setItem("user", JSON.stringify(newUser));
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
    register,
    logout
  };
  
  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};
