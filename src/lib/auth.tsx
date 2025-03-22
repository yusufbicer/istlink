
// Simple auth utilities
import { useState, useEffect, createContext, useContext } from 'react';

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
}

// Simulated users for demo
const DEMO_USERS: User[] = [
  {
    id: '1',
    name: 'Customer Demo',
    email: 'customer@example.com',
    role: 'customer',
    avatar: 'https://i.pravatar.cc/150?u=customer',
  },
  {
    id: '2',
    name: 'Supplier Demo',
    email: 'supplier@example.com',
    role: 'supplier',
    avatar: 'https://i.pravatar.cc/150?u=supplier',
  },
  {
    id: '3',
    name: 'Admin Demo',
    email: 'admin@example.com',
    role: 'admin',
    avatar: 'https://i.pravatar.cc/150?u=admin',
  }
];

// Create an authentication context
const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// Auth provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check if the user is already logged in (via localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Simulated login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    return new Promise<void>((resolve, reject) => {
      // Simulate API request
      setTimeout(() => {
        const foundUser = DEMO_USERS.find(u => u.email === email);
        if (foundUser && password === 'password') { // For demo, any password works
          setUser(foundUser);
          localStorage.setItem('user', JSON.stringify(foundUser));
          setIsLoading(false);
          resolve();
        } else {
          setIsLoading(false);
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  };

  // Simulated logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Simulated registration function
  const register = async (name: string, email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    return new Promise<void>((resolve, reject) => {
      // Simulate API request
      setTimeout(() => {
        // Check if email already exists
        const existingUser = DEMO_USERS.find(u => u.email === email);
        if (existingUser) {
          setIsLoading(false);
          reject(new Error('Email already in use'));
          return;
        }

        // Create a new user
        const newUser: User = {
          id: Date.now().toString(),
          name,
          email,
          role,
          avatar: `https://i.pravatar.cc/150?u=${Date.now()}`
        };

        // In a real app, you would send this to your backend
        // For demo purposes, we'll just set it directly
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
        
        setIsLoading(false);
        resolve();
      }, 1000);
    });
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the auth context
export function useAuth() {
  return useContext(AuthContext);
}
