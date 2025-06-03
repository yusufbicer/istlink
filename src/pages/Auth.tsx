
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import IstLinqLogo from '@/components/common/IstLinqLogo';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login, signUp, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/admin/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
        toast({
          title: "Success",
          description: "Successfully logged in!"
        });
        navigate('/admin/dashboard');
      } else {
        await signUp(email, password);
        toast({
          title: "Success",
          description: "Account created successfully! Please check your email to verify your account."
        });
        setIsLogin(true);
      }
    } catch (error: any) {
      toast({
        title: isLogin ? "Login Failed" : "Sign Up Failed",
        description: error.message || "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Back to home link */}
        <div className="mb-8">
          <Link to="/" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to home
          </Link>
        </div>

        {/* Auth Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-emerald-600 p-8 text-center text-white">
            <div className="flex justify-center mb-4">
              <IstLinqLogo size="lg" />
            </div>
            <div className="flex items-baseline justify-center mb-2">
              <span className="font-bold text-2xl">ist</span>
              <span className="font-bold text-2xl">Linq</span>
            </div>
            <p className="text-blue-100 text-sm">Admin Portal</p>
          </div>

          {/* Form */}
          <div className="p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className="text-gray-600 text-sm">
                {isLogin ? 'Sign in to your admin account' : 'Sign up for a new admin account'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@istlinq.com"
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </Label>
                <div className="relative mt-1">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-medium py-2.5 rounded-lg transition-all duration-200"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {isLogin ? 'Signing in...' : 'Creating account...'}
                  </div>
                ) : (
                  isLogin ? 'Sign In' : 'Create Account'
                )}
              </Button>
            </form>

            {/* Toggle Auth Mode */}
            <div className="mt-6 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
              >
                {isLogin ? (
                  <>Don't have an account? <span className="font-medium">Sign up</span></>
                ) : (
                  <>Already have an account? <span className="font-medium">Sign in</span></>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Demo Credentials */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="text-sm font-medium text-blue-900 mb-2">Demo Admin Credentials:</h3>
          <div className="text-xs text-blue-700 space-y-1">
            <p><strong>Email:</strong> admin@istlinq.com</p>
            <p><strong>Password:</strong> admin123456</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
