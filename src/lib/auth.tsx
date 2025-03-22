
// Simple auth utilities with Supabase integration
import { useState, useEffect, createContext, useContext } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';

export type UserRole = 'admin' | 'customer' | 'supplier';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface ProfileData {
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

// Create an authentication context
const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// Auth provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check if the user is already logged in via Supabase
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setIsLoading(true);
        
        if (event === 'SIGNED_IN' && session) {
          try {
            // Fetch user profile from profiles table
            const { data: profileData, error: profileError } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();

            if (profileError) {
              console.error('Error fetching profile:', profileError);
              // Fallback to using auth data
              const userData: User = {
                id: session.user.id,
                name: session.user.user_metadata.name || session.user.email?.split('@')[0] || 'User',
                email: session.user.email || '',
                role: (session.user.user_metadata.role as UserRole) || 'customer',
                avatar: session.user.user_metadata.avatar
              };
              setUser(userData);
            } else {
              // Map profile data to user object
              const userData: User = {
                id: profileData.id,
                name: profileData.name,
                email: profileData.email,
                role: profileData.role as UserRole,
                avatar: profileData.avatar
              };
              setUser(userData);
            }
          } catch (err) {
            console.error('Error in auth state change:', err);
            // Fallback if profile fetching fails
            if (session.user) {
              const userData: User = {
                id: session.user.id,
                name: session.user.user_metadata.name || session.user.email?.split('@')[0] || 'User',
                email: session.user.email || '',
                role: (session.user.user_metadata.role as UserRole) || 'customer',
                avatar: session.user.user_metadata.avatar
              };
              setUser(userData);
            }
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
        }
        
        setIsLoading(false);
      }
    );

    // Initial session check
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        try {
          // Fetch user profile from profiles table
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (profileError) {
            console.error('Error fetching profile:', profileError);
            // Fallback to using auth data
            const userData: User = {
              id: session.user.id,
              name: session.user.user_metadata.name || session.user.email?.split('@')[0] || 'User',
              email: session.user.email || '',
              role: (session.user.user_metadata.role as UserRole) || 'customer',
              avatar: session.user.user_metadata.avatar
            };
            setUser(userData);
          } else {
            // Map profile data to user object
            const userData: User = {
              id: profileData.id,
              name: profileData.name,
              email: profileData.email,
              role: profileData.role as UserRole,
              avatar: profileData.avatar
            };
            setUser(userData);
          }
        } catch (err) {
          console.error('Error checking user:', err);
          // Fallback if profile fetching fails
          if (session.user) {
            const userData: User = {
              id: session.user.id,
              name: session.user.user_metadata.name || session.user.email?.split('@')[0] || 'User',
              email: session.user.email || '',
              role: (session.user.user_metadata.role as UserRole) || 'customer',
              avatar: session.user.user_metadata.avatar
            };
            setUser(userData);
          }
        }
      }
      
      setIsLoading(false);
    };

    checkUser();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Login function using Supabase auth
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        throw error;
      }

      // Successfully logged in - the onAuthStateChange listener will handle setting the user
      toast({
        title: "Login successful",
        description: "Welcome back to GROOP!",
      });
    } catch (err: any) {
      setIsLoading(false);
      throw new Error(err.message || 'Error logging in');
    }
  };

  // Logout function using Supabase auth
  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
    } catch (err) {
      console.error('Error logging out:', err);
    }
  };

  // Register function using Supabase auth
  const register = async (name: string, email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    try {
      // Register user with Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            role,
            avatar: `https://i.pravatar.cc/150?u=${Date.now()}`
          }
        }
      });

      if (error) {
        throw error;
      }

      // The automatic trigger will create the profile
      // The onAuthStateChange listener will handle setting the user

      toast({
        title: "Registration successful",
        description: "Your account has been created.",
      });
    } catch (err: any) {
      setIsLoading(false);
      throw new Error(err.message || 'Error registering');
    }
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
