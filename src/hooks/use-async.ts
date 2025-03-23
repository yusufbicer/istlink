
import { useState, useEffect, useCallback } from 'react';

interface AsyncState<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

export function useAsync<T, P extends any[]>(
  asyncFunction: (...args: P) => Promise<T>,
  immediate = false,
  initialArgs?: P
) {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    isLoading: immediate,
    error: null,
  });

  const execute = useCallback(
    async (...args: P) => {
      setState({ data: null, isLoading: true, error: null });
      try {
        const data = await asyncFunction(...args);
        setState({ data, isLoading: false, error: null });
        return { data, error: null };
      } catch (error) {
        setState({ data: null, isLoading: false, error: error as Error });
        return { data: null, error: error as Error };
      }
    },
    [asyncFunction]
  );

  // Execute the function if immediate is true
  useEffect(() => {
    if (immediate && initialArgs) {
      execute(...initialArgs);
    }
  }, [execute, immediate, initialArgs?.toString()]);

  return { ...state, execute };
}

// Role-based permission helper
export type CrudPermission = 'create' | 'read' | 'update' | 'delete';
export type UserRole = 'admin' | 'customer' | 'supplier';

export interface PermissionConfig {
  [key: string]: {
    [role in UserRole]?: CrudPermission[];
  };
}

// Example permissions object following your specified workflow
export const CONSOLIDATION_PERMISSIONS: PermissionConfig = {
  users: {
    admin: ['create', 'read', 'update', 'delete'],
    customer: ['create', 'read', 'update'],
    supplier: ['read', 'update'],
  },
  documents: {
    admin: ['read'],
    customer: ['read'],
    supplier: ['create', 'read', 'update'],
  },
  orders: {
    admin: ['create', 'read', 'update', 'delete'],
    customer: ['create', 'read', 'update'],
    supplier: ['read', 'update'],
  },
  invoices: {
    admin: ['create', 'read', 'update', 'delete'],
    customer: ['read', 'update'],
    supplier: ['create', 'read', 'update'],
  },
  payments: {
    admin: ['create', 'read', 'update'],
    customer: ['create', 'read'],
    supplier: ['read', 'update'],
  },
  shipping: {
    admin: ['read', 'update'],
    customer: ['read'],
    supplier: ['create', 'read', 'update'],
  },
  warehouse: {
    admin: ['create', 'read', 'update', 'delete'],
    supplier: ['read'],
    customer: ['read'],
  },
  consolidation: {
    admin: ['create', 'read', 'update', 'delete'],
    customer: ['read', 'update'],
  },
  delivery: {
    admin: ['create', 'read', 'update'],
    customer: ['create', 'read', 'update'],
    supplier: ['read'],
  },
};

// Function to check if a user has permission for a specific action
export function hasPermission(
  userRole: UserRole | null,
  resource: string,
  action: CrudPermission,
  permissions: PermissionConfig = CONSOLIDATION_PERMISSIONS
): boolean {
  if (!userRole) return false;
  
  const resourcePermissions = permissions[resource];
  if (!resourcePermissions) return false;
  
  const rolePermissions = resourcePermissions[userRole];
  if (!rolePermissions) return false;
  
  return rolePermissions.includes(action);
}
