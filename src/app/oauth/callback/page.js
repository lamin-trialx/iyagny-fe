'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function OAuthCallbackPage() {
  const router = useRouter();
  const [status, setStatus] = useState('Processing your login... Please wait.');
  const [error, setError] = useState('');

  useEffect(() => {
    /**
     * Extract parameters from URL fragment (after #)
     * Mindbody returns OAuth params in the fragment, not query string
     */
    function getFragmentParams() {
      const hash = window.location.hash.substring(1);
      const params = {};

      if (hash) {
        hash.split('&').forEach((param) => {
          const [key, value] = param.split('=');
          if (key && value) {
            params[key] = decodeURIComponent(value);
          }
        });
      }

      return params;
    }

    /**
     * POST fragment parameters to backend for processing
     */
    async function processCallback() {
      const params = getFragmentParams();

      console.log('Fragment params:', Object.keys(params));

      // Validate required parameters
      if (!params.code || !params.id_token) {
        const errorMsg = params.error
          ? `Error: ${params.error} - ${params.error_description || 'Unknown error'}`
          : 'Error: Missing code or id_token from OAuth callback';

        setError(errorMsg);
        setStatus('Authentication failed');
        return;
      }

      try {
        // POST to backend
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/oauth/callback/process/`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include', // Include cookies for session
            body: JSON.stringify(params),
          }
        );

        const result = await response.json();

        if (response.ok && result.success) {
          // Redirect to success page
          router.push('/oauth/success');
        } else {
          setError(result.error || 'Authentication failed. Please try again.');
          setStatus('Authentication failed');
        }
      } catch (err) {
        console.error('Error processing callback:', err);
        setError('Network error. Please check your connection and try again.');
        setStatus('Connection failed');
      }
    }

    processCallback();
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-purple-500 to-pink-600">
      <div className="text-center p-8 bg-white/10 rounded-lg backdrop-blur-sm">
        {!error && (
          <>
            <div className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
            <div className="text-white text-lg">{status}</div>
          </>
        )}

        {error && (
          <div className="bg-white rounded-lg p-6">
            <div className="text-red-600 text-lg font-semibold mb-4">{error}</div>
            <button
              onClick={() => window.location.href = '/'}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
            >
              Back to Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
