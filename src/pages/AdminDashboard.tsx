
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { PlusCircle, Edit, Trash2, Eye, ArrowLeft, LogOut } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/components/ui/use-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';

type EarlyAccessRequest = {
  id: string;
  name: string;
  email: string;
  company: string | null;
  reason: string | null;
  created_at: string;
};

const AdminDashboard = () => {
  const [earlyAccessRequests, setEarlyAccessRequests] = useState<EarlyAccessRequest[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user, logout } = useAuth();
  const { toast } = useToast();
  
  // Handle logout
  const handleLogout = () => {
    logout();
  };

  return (
    <div className="container mx-auto p-6 min-h-screen">
      {/* Back link */}
      <div className="mb-8 flex justify-between items-center">
        <Link to="/" className="flex items-center text-gray-600 hover:text-metallic-blue transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to home
        </Link>
        
        <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome, {user?.name || user?.email}</p>
          </div>
        </div>
      
        <div className="text-center p-12 border border-dashed border-gray-300 rounded-lg">
          <p className="text-gray-600">Admin dashboard will be available after Supabase integration.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
