import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/auth';
    }
    return Promise.reject(error);
  }
);

export const authService = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  signup: (name, email, password) => api.post('/auth/signup', { name, email, password }),
  logout: () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  },
};

export const tripService = {
  getTrips: () => api.get('/trips'),
  createTrip: (tripData) => api.post('/trips', tripData),
  getTripById: (id) => api.get(`/trips/${id}`),
  updateTrip: (id, tripData) => api.put(`/trips/${id}`, tripData),
  deleteTrip: (id) => api.delete(`/trips/${id}`),
  shareTrip: (id) => api.post(`/trips/${id}/share`),
};

export const aiService = {
  generateDreamTrip: (prompt) => api.post('/ai/dream-trip', { prompt }),
  suggestActivities: (cityName, preferences) => 
    api.post('/ai/suggest-activities', { cityName, preferences }),
};

export default api;
