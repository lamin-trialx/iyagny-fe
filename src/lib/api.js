/**
 * API service for communicating with Django backend
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

class ApiService {
  constructor() {
    this.baseUrl = `${API_URL}/api`;
  }

  /**
   * Make API request with credentials
   */
  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    
    const config = {
      ...options,
      credentials: 'include', // Include cookies for session
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'API request failed');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  /**
   * Check authentication status
   */
  async checkAuthStatus() {
    try {
      return await this.request('/oauth/status/');
    } catch (error) {
      return { authenticated: false };
    }
  }

  /**
   * Initiate OAuth login
   */
  initiateLogin() {
    window.location.href = `${this.baseUrl}/oauth/login/`;
  }

  /**
   * Logout user
   */
  async logout() {
    const data = await this.request('/oauth/logout/', {
      method: 'POST',
    });
    
    if (data.logout_url) {
      window.location.href = data.logout_url;
    }
    
    return data;
  }

  /**
   * Get available classes
   */
  async getClasses() {
    return await this.request('/classes/');
  }

  /**
   * Book a class
   */
  async bookClass(classId) {
    return await this.request('/classes/book/', {
      method: 'POST',
      body: JSON.stringify({ class_id: classId }),
    });
  }

  /**
   * Get user profile
   */
  async getUserProfile() {
    return await this.request('/oauth/success/');
  }
}

export const apiService = new ApiService();
