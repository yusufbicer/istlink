
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
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
  const [isLoading, setIsLoading] = useState(true);
  const { user, logout } = useAuth();
  const { toast } = useToast();
  
  // Fetch all early access requests
  const fetchEarlyAccessRequests = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('early_access_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setEarlyAccessRequests(data || []);
    } catch (error: any) {
      console.error('Error fetching early access requests:', error);
      toast({
        title: "Error",
        description: "Failed to load early access requests.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEarlyAccessRequests();
  }, []);

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Success",
        description: "You have been logged out successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to logout. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Delete a request
  const deleteRequest = async (id: string) => {
    if (!confirm('Are you sure you want to delete this request?')) return;
    
    try {
      console.log('Attempting to delete request with ID:', id);
      
      const { error } = await supabase
        .from('early_access_requests')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Delete error:', error);
        throw error;
      }
      
      console.log('Delete successful, refreshing data...');
      
      // Refresh the data after deletion
      await fetchEarlyAccessRequests();
      
      toast({
        title: "Success",
        description: "Request deleted successfully.",
      });
    } catch (error: any) {
      console.error('Error deleting request:', error);
      toast({
        title: "Error",
        description: "Failed to delete request.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto p-6 min-h-screen">
      {/* Header with back link and logout */}
      <div className="mb-8 flex justify-between items-center">
        <Link to="/" className="flex items-center text-gray-600 hover:text-metallic-blue transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to home
        </Link>
        
        <div className="flex items-center gap-4">
          <Link to="/blog" className="text-gray-600 hover:text-blue-600 transition-colors">
            View Blog
          </Link>
          <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </div>
    
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome, {user?.name || user?.email}</p>
            <p className="text-sm text-blue-600 mt-1">Role: {user?.role}</p>
          </div>
        </div>
      
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <p>Loading requests...</p>
          </div>
        ) : earlyAccessRequests.length === 0 ? (
          <div className="text-center p-12 border border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-600">No early access requests yet.</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg border shadow-sm">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="w-[160px] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {earlyAccessRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">{request.name}</TableCell>
                    <TableCell>{request.email}</TableCell>
                    <TableCell>{request.company || '-'}</TableCell>
                    <TableCell className="max-w-xs">
                      {request.reason ? (
                        <div className="truncate" title={request.reason}>
                          {request.reason}
                        </div>
                      ) : (
                        '-'
                      )}
                    </TableCell>
                    <TableCell>{format(new Date(request.created_at), 'MMM d, yyyy')}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => {
                            console.log('Delete button clicked for ID:', request.id);
                            deleteRequest(request.id);
                          }}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
