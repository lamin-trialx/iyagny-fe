'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function OAuthSuccessPage() {
  const router = useRouter();
  const { checkAuth } = useAuth();

  useEffect(() => {
    // Re-check authentication status after OAuth callback
    checkAuth().then(() => {
      // Redirect to home or dashboard
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    });
  }, [checkAuth, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-500">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
        <div className="mb-4">
          <svg
            className="mx-auto h-16 w-16 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Login Successful!
        </h1>
        <p className="text-gray-600 mb-4">
          You have successfully authenticated with Mindbody.
        </p>
        <p className="text-sm text-gray-500">
          Redirecting to your dashboard...
        </p>
      </div>
    </div>
  );
}
