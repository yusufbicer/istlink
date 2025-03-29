import React from 'react';
import { useAuth } from '@/lib/auth';

const Notes = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard Notes</h1>
      
      {user?.role === "importer" && (
        <div>
          <p>Welcome, Importer! Here are some important notes:</p>
          <ul>
            <li>Remember to update your supplier list regularly.</li>
            <li>Check the latest shipping regulations for Turkey.</li>
          </ul>
        </div>
      )}
      
      {user?.role === "supplier" && (
        <div>
          <p>Welcome, Supplier! Here are some important notes:</p>
          <ul>
            <li>Ensure all product details are accurate.</li>
            <li>Update your inventory levels frequently.</li>
          </ul>
        </div>
      )}
      
      {user?.role === "admin" && (
        <div>
          <p>Welcome, Admin! Here are some important notes:</p>
          <ul>
            <li>Monitor user activity for any suspicious behavior.</li>
            <li>Backup the database weekly.</li>
          </ul>
        </div>
      )}
      
      <p className="mt-4">
        This section provides a space for important updates and reminders.
      </p>
    </div>
  );
};

export default Notes;
