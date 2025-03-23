
import React from 'react';
import { UserRole, CrudPermission, hasPermission } from '@/hooks/use-async';
import { useAuth } from '@/lib/auth';

interface PermissionGuardProps {
  resource: string;
  action: CrudPermission;
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

/**
 * Component that conditionally renders content based on user permissions
 */
export function PermissionGuard({ 
  resource, 
  action, 
  fallback = null, 
  children 
}: PermissionGuardProps) {
  const { user } = useAuth();
  
  // If no user or role, deny access
  if (!user || !user.role) {
    return <>{fallback}</>;
  }
  
  // Check if user has permission
  const canAccess = hasPermission(
    user.role as UserRole,  // Cast to UserRole as it's coming from auth context
    resource,
    action
  );
  
  // Render children if user has permission, otherwise render fallback
  return <>{canAccess ? children : fallback}</>;
}

/**
 * Higher-order component that wraps a component with permission guard
 */
export function withPermissionGuard<P extends object>(
  Component: React.ComponentType<P>,
  resource: string,
  action: CrudPermission,
  fallback?: React.ReactNode
): React.FC<P> {
  return (props: P) => (
    <PermissionGuard resource={resource} action={action} fallback={fallback}>
      <Component {...props} />
    </PermissionGuard>
  );
}
