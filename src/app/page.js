'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const { authenticated, loading, login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && authenticated) {
      router.push('/dashboard');
    }
  }, [authenticated, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-500 to-indigo-600">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Welcome to IYAGNY
          </h1>
          <p className="text-xl md:text-2xl mb-4 text-purple-100">
            Iyengar Yoga Association of Greater New York
          </p>
          <p className="text-lg mb-12 text-purple-100 max-w-2xl mx-auto">
            Experience the transformative power of Iyengar Yoga. Book your classes,
            manage your schedule, and connect with our community.
          </p>

          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-gray-900">
            <div className="mb-8">
              <svg
                className="mx-auto h-20 w-20 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>

            <h2 className="text-3xl font-bold mb-4">Get Started</h2>
            <p className="text-gray-600 mb-8">
              Sign in with your Mindbody account to access classes and manage your bookings
            </p>

            <button
              onClick={login}
              className="inline-flex items-center px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-full hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-purple-300 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <svg
                className="w-6 h-6 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
              Sign in with Mindbody
            </button>

            <p className="mt-6 text-sm text-gray-500">
              Secure authentication powered by Mindbody OAuth
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Browse Classes</h3>
              <p className="text-purple-100">
                View available yoga classes and schedules
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Booking</h3>
              <p className="text-purple-100">
                Book your spot in classes with one click
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Manage Profile</h3>
              <p className="text-purple-100">
                Track your bookings and manage your account
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
