
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth, UserRole } from '@/lib/auth';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { User, UserPlus, Loader2 } from 'lucide-react';

interface AuthFormProps {
  type: 'login' | 'register';
}

const AuthForm = ({ type }: AuthFormProps) => {
  const { login, register } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('customer');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (type === 'login') {
        await login(email, password);
        toast({
          title: "Login successful",
          description: "Welcome back to GROOP!",
        });
      } else {
        await register(name, email, password, role);
        toast({
          title: "Registration successful",
          description: "Your account has been created.",
        });
      }
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      toast({
        title: "Error",
        description: err.message || 'An error occurred',
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            {type === 'login' ? (
              <User className="h-8 w-8 text-blue-600" />
            ) : (
              <UserPlus className="h-8 w-8 text-blue-600" />
            )}
          </div>
          <h1 className="text-2xl font-bold">
            {type === 'login' ? 'Welcome back' : 'Create an account'}
          </h1>
          <p className="text-gray-600 mt-2">
            {type === 'login' 
              ? 'Sign in to access your dashboard' 
              : 'Complete the form below to get started'}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {type === 'register' && (
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={isLoading}
                className="h-12"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
              className="h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
              className="h-12"
            />
          </div>

          {type === 'register' && (
            <div className="space-y-2">
              <Label>Account Type</Label>
              <RadioGroup value={role} onValueChange={(value) => setRole(value as UserRole)} className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="customer" id="customer" />
                  <Label htmlFor="customer" className="cursor-pointer">Customer</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="supplier" id="supplier" />
                  <Label htmlFor="supplier" className="cursor-pointer">Supplier</Label>
                </div>
              </RadioGroup>
            </div>
          )}

          <Button type="submit" className="w-full h-12 mt-6" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {type === 'login' ? 'Signing in...' : 'Creating account...'}
              </>
            ) : (
              type === 'login' ? 'Sign In' : 'Create Account'
            )}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm">
          {type === 'login' ? (
            <p className="text-gray-600">
              Don't have an account?{' '}
              <a href="/register" className="text-blue-600 hover:text-blue-800 font-medium">
                Sign up
              </a>
            </p>
          ) : (
            <p className="text-gray-600">
              Already have an account?{' '}
              <a href="/login" className="text-blue-600 hover:text-blue-800 font-medium">
                Sign in
              </a>
            </p>
          )}
        </div>

        {type === 'login' && (
          <div className="mt-8 pt-6 border-t border-gray-100">
            <p className="text-xs text-gray-500 mb-2 text-center">For demo purposes, you can create a new account or use these credentials:</p>
            <div className="grid grid-cols-1 gap-2 text-xs">
              <div className="p-2 bg-gray-50 rounded text-center">
                <div className="font-medium">Create a new account with any email and password</div>
                <div className="text-gray-500">Registration is enabled for testing</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AuthForm;
