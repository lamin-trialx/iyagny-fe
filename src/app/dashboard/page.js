'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardPage() {
  const { user, authenticated, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !authenticated) {
      router.push('/');
    }
  }, [authenticated, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!authenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">IYAGNY Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                {user?.first_name} {user?.last_name}
              </span>
              <button
                onClick={logout}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome Back!</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Email</h3>
              <p className="text-lg text-gray-900">{user?.email || 'N/A'}</p>
            </div>
            
            <div className="border rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Mindbody Client ID</h3>
              <p className="text-lg text-gray-900">{user?.mindbody_client_id || 'Not Linked'}</p>
            </div>
            
            <div className="border rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-500 mb-2">OAuth ID</h3>
              <p className="text-lg text-gray-900 truncate">{user?.client_id || 'N/A'}</p>
            </div>
            
            <div className="border rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Status</h3>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                Active
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center justify-center px-6 py-4 border-2 border-purple-600 rounded-lg text-purple-600 hover:bg-purple-50 transition">
              <span className="font-medium">View Classes</span>
            </button>
            <button className="flex items-center justify-center px-6 py-4 border-2 border-purple-600 rounded-lg text-purple-600 hover:bg-purple-50 transition">
              <span className="font-medium">My Bookings</span>
            </button>
            <button className="flex items-center justify-center px-6 py-4 border-2 border-purple-600 rounded-lg text-purple-600 hover:bg-purple-50 transition">
              <span className="font-medium">Account Settings</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
