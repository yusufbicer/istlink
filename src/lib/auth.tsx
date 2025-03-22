
import { useState, useEffect, createContext, useContext } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';
import { useToast } from '@/hooks/use-toast';

export type UserRole = 'buyer' | 'supplier' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

// Extend the User type to include profile data
export interface ExtendedUser extends User {
  name: string;
  avatar?: string;
  role: UserRole;
}

interface AuthContextType {
  user: ExtendedUser | null;
  profile: UserProfile | null;
  session: Session | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
}

// Create an authentication context
const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// Auth provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<ExtendedUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();

  // Function to fetch user profile from Supabase
  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return null;
      }

      return data as UserProfile;
    } catch (error) {
      console.error('Error in fetchProfile:', error);
      return null;
    }
  };

  // Process the authenticated user and fetch their profile
  const processUser = async (authSession: Session | null) => {
    if (!authSession || !authSession.user) {
      setUser(null);
      setProfile(null);
      setIsLoading(false);
      return;
    }

    // Add additional user metadata from auth if profile couldn't be fetched
    const fallbackUserData = {
      name: authSession.user.user_metadata?.name || authSession.user.email?.split('@')[0] || 'User',
      role: (authSession.user.user_metadata?.role || 'buyer') as UserRole,
      avatar: authSession.user.user_metadata?.avatar
    };

    try {
      const userProfile = await fetchProfile(authSession.user.id);
      
      if (userProfile) {
        // Create an extended user with profile data
        const extendedUser: ExtendedUser = {
          ...authSession.user,
          name: userProfile.name,
          avatar: userProfile.avatar,
          role: userProfile.role
        };
        setUser(extendedUser);
        setProfile(userProfile);
      } else {
        // Use fallback data from auth metadata if profile couldn't be fetched
        const extendedUser: ExtendedUser = {
          ...authSession.user,
          ...fallbackUserData
        };
        setUser(extendedUser);
        
        // Set a minimal profile using auth data to avoid null checks
        setProfile({
          id: authSession.user.id,
          email: authSession.user.email || '',
          ...fallbackUserData
        });
      }
    } catch (error) {
      console.error('Error processing user:', error);
      
      // Fallback to minimal user data to avoid authentication loops
      const extendedUser: ExtendedUser = {
        ...authSession.user,
        ...fallbackUserData
      };
      setUser(extendedUser);
      
      // Set a minimal profile using auth data
      setProfile({
        id: authSession.user.id,
        email: authSession.user.email || '',
        ...fallbackUserData
      });
    }
    
    setIsLoading(false);
  };

  // Handle auth state changes
  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log('Auth state changed:', event);
        setSession(currentSession);
        await processUser(currentSession);
      }
    );

    // THEN check for existing session
    const initAuth = async () => {
      setIsLoading(true);
      const { data: { session: currentSession } } = await supabase.auth.getSession();
      setSession(currentSession);
      await processUser(currentSession);
    };
    
    initAuth();

    return () => subscription.unsubscribe();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        throw error;
      }
    } catch (error: any) {
      toast({
        title: "Login error",
        description: error.message || 'Failed to login',
        variant: "destructive",
      });
      setIsLoading(false);
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setProfile(null);
      setSession(null);
    } catch (error: any) {
      toast({
        title: "Logout error",
        description: error.message || 'Failed to logout',
        variant: "destructive",
      });
    }
  };

  // Register function
  const register = async (name: string, email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            role,
          }
        }
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Registration successful",
        description: "Please check your email to confirm your account.",
      });
    } catch (error: any) {
      toast({
        title: "Registration error",
        description: error.message || 'Failed to register',
        variant: "destructive",
      });
      setIsLoading(false);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      profile, 
      session, 
      isLoading, 
      login, 
      logout, 
      register 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the auth context
export function useAuth() {
  return useContext(AuthContext);
}
