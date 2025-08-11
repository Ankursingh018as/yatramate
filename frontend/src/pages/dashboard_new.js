import { useState, useEffect } from 'react';
import Layout from '../layouts/Layout';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';
import Link from 'next/link';
import {
  PlusIcon,
  MapPinIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  ShareIcon,
  ChartBarIcon,
  ClockIcon,
  SparklesIcon,
  GlobeAltIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [stats, setStats] = useState({
    total: 0,
    planned: 0,
    completed: 0,
    totalBudget: 0
  });

  useEffect(() => {
    if (isAuthenticated) {
      fetchTrips();
    }
  }, [isAuthenticated]);

  const fetchTrips = async () => {
    try {
      const response = await api.get('/trips');
      setTrips(response.data.trips || []);
      calculateStats(response.data.trips || []);
    } catch (error) {
      console.error('Error fetching trips:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (tripsData) => {
    const total = tripsData.length;
    const planned = tripsData.filter(trip => trip.status === 'planned').length;
    const completed = tripsData.filter(trip => trip.status === 'completed').length;
    const totalBudget = tripsData.reduce((sum, trip) => sum + (trip.budget_estimate || 0), 0);
    
    setStats({ total, planned, completed, totalBudget });
  };

  const filterTrips = (status) => {
    if (status === 'all') return trips;
    return trips.filter(trip => trip.status === status);
  };

  const deleteTrip = async (tripId) => {
    if (window.confirm('Are you sure you want to delete this trip?')) {
      try {
        await api.delete(`/trips/${tripId}`);
        fetchTrips();
      } catch (error) {
        console.error('Error deleting trip:', error);
        alert('Failed to delete trip');
      }
    }
  };

  const shareTrip = async (tripId) => {
    try {
      const response = await api.post(`/trips/${tripId}/share`);
      const shareUrl = `${window.location.origin}/public/${response.data.shareToken}`;
      navigator.clipboard.writeText(shareUrl);
      alert('Share link copied to clipboard!');
    } catch (error) {
      console.error('Error sharing trip:', error);
      alert('Failed to generate share link');
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon className="w-5 h-5 text-secondary-500" />;
      case 'planned':
        return <ClockIcon className="w-5 h-5 text-primary-500" />;
      default:
        return <ExclamationTriangleIcon className="w-5 h-5 text-accent-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-secondary-100 text-secondary-800 border-secondary-200';
      case 'planned':
        return 'bg-primary-100 text-primary-800 border-primary-200';
      default:
        return 'bg-accent-100 text-accent-800 border-accent-200';
    }
  };

  const filteredTrips = filterTrips(activeFilter);

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-background-primary">
          <div className="text-center">
            <GlobeAltIcon className="w-16 h-16 text-primary-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-text-primary mb-2">Please Sign In</h2>
            <p className="text-text-secondary mb-6">You need to be signed in to view your dashboard</p>
            <Link href="/auth" className="btn-primary">
              Sign In
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-background-primary py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h1 className="heading-secondary mb-2">
                  Welcome back, <span className="text-gradient">{user?.name || 'Traveler'}</span>!
                </h1>
                <p className="text-text-secondary">
                  Manage your trips and plan your next adventure
                </p>
              </div>
              <Link
                href="/"
                className="btn-primary mt-4 md:mt-0 flex items-center space-x-2"
              >
                <PlusIcon className="w-5 h-5" />
                <span>Plan New Trip</span>
              </Link>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="glass p-6 rounded-2xl card-hover">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mr-4">
                  <MapPinIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-text-secondary text-sm">Total Trips</p>
                  <p className="text-2xl font-bold text-text-primary">{stats.total}</p>
                </div>
              </div>
            </div>

            <div className="glass p-6 rounded-2xl card-hover">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-xl flex items-center justify-center mr-4">
                  <ClockIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-text-secondary text-sm">Planned</p>
                  <p className="text-2xl font-bold text-text-primary">{stats.planned}</p>
                </div>
              </div>
            </div>

            <div className="glass p-6 rounded-2xl card-hover">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-accent-500 to-accent-600 rounded-xl flex items-center justify-center mr-4">
                  <CheckCircleIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-text-secondary text-sm">Completed</p>
                  <p className="text-2xl font-bold text-text-primary">{stats.completed}</p>
                </div>
              </div>
            </div>

            <div className="glass p-6 rounded-2xl card-hover">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-accent-500 rounded-xl flex items-center justify-center mr-4">
                  <CurrencyDollarIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-text-secondary text-sm">Total Budget</p>
                  <p className="text-2xl font-bold text-text-primary">${stats.totalBudget.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2 sm:gap-4">
              {[
                { key: 'all', label: 'All Trips', icon: ChartBarIcon },
                { key: 'draft', label: 'Draft', icon: PencilIcon },
                { key: 'planned', label: 'Planned', icon: ClockIcon },
                { key: 'completed', label: 'Completed', icon: CheckCircleIcon }
              ].map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setActiveFilter(filter.key)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    activeFilter === filter.key
                      ? 'bg-primary-500 text-white shadow-lg'
                      : 'bg-white/60 text-text-secondary hover:bg-white/80 hover:text-primary-600'
                  }`}
                >
                  <filter.icon className="w-4 h-4" />
                  <span>{filter.label}</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    activeFilter === filter.key
                      ? 'bg-white/20 text-white'
                      : 'bg-primary-100 text-primary-600'
                  }`}>
                    {filter.key === 'all' ? stats.total : 
                     filter.key === 'planned' ? stats.planned :
                     filter.key === 'completed' ? stats.completed :
                     trips.filter(trip => trip.status === filter.key).length}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Trips Grid */}
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="spinner mx-auto mb-4"></div>
                <p className="text-text-secondary">Loading your trips...</p>
              </div>
            </div>
          ) : filteredTrips.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTrips.map((trip) => (
                <div key={trip.id} className="glass rounded-2xl overflow-hidden card-hover">
                  {/* Trip Image/Header */}
                  <div className="h-48 bg-gradient-to-br from-primary-400 via-secondary-400 to-accent-400 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                      <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(trip.status)}`}>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(trip.status)}
                          <span className="capitalize">{trip.status}</span>
                        </div>
                      </div>
                      <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                        <span className="text-white font-semibold text-sm">
                          ${trip.budget_estimate || 0}
                        </span>
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white font-bold text-xl mb-2 line-clamp-2">
                        {trip.title || 'Untitled Trip'}
                      </h3>
                      <div className="flex items-center text-white/90 text-sm space-x-4">
                        <div className="flex items-center">
                          <CalendarIcon className="w-4 h-4 mr-1" />
                          <span>
                            {trip.start_date ? new Date(trip.start_date).toLocaleDateString() : 'No date'}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <MapPinIcon className="w-4 h-4 mr-1" />
                          <span>{trip.destinations?.length || 0} cities</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Trip Content */}
                  <div className="p-6">
                    <p className="text-text-secondary text-sm mb-4 line-clamp-2">
                      {trip.description || 'No description available'}
                    </p>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-xs text-text-secondary mb-1">
                        <span>Planning Progress</span>
                        <span>{trip.progress || 0}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${trip.progress || 0}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-2">
                      <Link
                        href={`/trip/${trip.id}`}
                        className="flex-1 btn-primary text-sm py-2 flex items-center justify-center space-x-1"
                      >
                        <EyeIcon className="w-4 h-4" />
                        <span>View</span>
                      </Link>
                      <button
                        onClick={() => shareTrip(trip.id)}
                        className="px-3 py-2 bg-secondary-500 hover:bg-secondary-600 text-white rounded-lg transition-colors duration-300"
                        title="Share Trip"
                      >
                        <ShareIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteTrip(trip.id)}
                        className="px-3 py-2 bg-accent-500 hover:bg-accent-600 text-white rounded-lg transition-colors duration-300"
                        title="Delete Trip"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="glass p-8 rounded-2xl max-w-md mx-auto">
                <SparklesIcon className="w-16 h-16 text-primary-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-text-primary mb-2">
                  {activeFilter === 'all' ? 'No trips yet!' : `No ${activeFilter} trips`}
                </h3>
                <p className="text-text-secondary mb-6">
                  {activeFilter === 'all' 
                    ? 'Start planning your first adventure with our AI-powered trip planner'
                    : `You don't have any ${activeFilter} trips at the moment`}
                </p>
                <Link href="/" className="btn-primary">
                  Plan Your First Trip
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
