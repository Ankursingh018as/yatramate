import { useState, useEffect } from 'react';
import { PlusIcon, CalendarIcon, MapPinIcon, CurrencyDollarIcon, ShareIcon, PencilIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline';

export default function Dashboard() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // TODO: Fetch user trips from API
    setTimeout(() => {
      setTrips([
        {
          id: 1,
          title: 'Southeast Asia Adventure',
          description: 'Cultural tour through Thailand, Vietnam, and Cambodia',
          start_date: '2025-09-15',
          end_date: '2025-09-29',
          budget_estimate: 2800,
          currency: 'USD',
          status: 'planned',
          image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=400',
          destinations: ['Bangkok', 'Ho Chi Minh City', 'Siem Reap'],
          progress: 85
        },
        {
          id: 2,
          title: 'European Christmas Markets',
          description: 'Winter wonderland tour of Germany and Austria',
          start_date: '2025-12-10',
          end_date: '2025-12-20',
          budget_estimate: 3200,
          currency: 'USD',
          status: 'draft',
          image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
          destinations: ['Berlin', 'Munich', 'Vienna'],
          progress: 45
        },
        {
          id: 3,
          title: 'Japan Cherry Blossom',
          description: 'Spring adventure in Tokyo, Kyoto, and Osaka',
          start_date: '2025-04-01',
          end_date: '2025-04-15',
          budget_estimate: 4500,
          currency: 'USD',
          status: 'completed',
          image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400',
          destinations: ['Tokyo', 'Kyoto', 'Osaka'],
          progress: 100
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredTrips = trips.filter(trip => 
    filter === 'all' || trip.status === filter
  );

  const getStatusColor = (status) => {
    switch(status) {
      case 'planned': return 'bg-green-100 text-green-800 border-green-200';
      case 'draft': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your trips...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">My Trips</h1>
              <p className="text-gray-600 mt-1">Manage and explore your travel adventures</p>
            </div>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center gap-2">
              <PlusIcon className="h-5 w-5" />
              Create New Trip
            </button>
          </div>
        </div>
      </header>

      {/* Filters and Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {/* Stats Cards */}
          <div className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/20">
            <div className="text-2xl font-bold text-blue-600">{trips.length}</div>
            <div className="text-sm text-gray-600">Total Trips</div>
          </div>
          <div className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/20">
            <div className="text-2xl font-bold text-green-600">{trips.filter(t => t.status === 'planned').length}</div>
            <div className="text-sm text-gray-600">Planned</div>
          </div>
          <div className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/20">
            <div className="text-2xl font-bold text-yellow-600">{trips.filter(t => t.status === 'draft').length}</div>
            <div className="text-sm text-gray-600">In Progress</div>
          </div>
          <div className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/20">
            <div className="text-2xl font-bold text-purple-600">{trips.filter(t => t.status === 'completed').length}</div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-4 mb-8">
          {[
            { key: 'all', label: 'All Trips' },
            { key: 'planned', label: 'Planned' },
            { key: 'draft', label: 'Drafts' },
            { key: 'completed', label: 'Completed' }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                filter === tab.key
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white/70 text-gray-600 hover:bg-white/90'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Trips Grid */}
        {filteredTrips.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white/70 backdrop-blur-md rounded-2xl p-12 max-w-md mx-auto">
              <MapPinIcon className="h-24 w-24 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">No trips yet</h3>
              <p className="text-gray-500 mb-6">Start planning your next adventure!</p>
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all duration-300">
                Plan Your First Trip
              </button>
            </div>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredTrips.map((trip) => (
              <div key={trip.id} className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-white/20">
                {/* Trip Image */}
                <div className="relative h-48 bg-gradient-to-r from-blue-400 to-purple-400">
                  {trip.image && (
                    <img 
                      src={trip.image} 
                      alt={trip.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(trip.status)}`}>
                      {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold drop-shadow-lg">{trip.title}</h3>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-gray-600 mb-4 line-clamp-2">{trip.description}</p>
                  
                  {/* Trip Details */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm text-gray-600">
                      <CalendarIcon className="h-4 w-4 mr-2 text-blue-500" />
                      {new Date(trip.start_date).toLocaleDateString()} - {new Date(trip.end_date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <CurrencyDollarIcon className="h-4 w-4 mr-2 text-green-500" />
                      {trip.currency} {trip.budget_estimate.toLocaleString()}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPinIcon className="h-4 w-4 mr-2 text-purple-500" />
                      {trip.destinations.join(' → ')}
                    </div>
                  </div>

                  {/* Progress Bar */}
                  {trip.progress && (
                    <div className="mb-6">
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Planning Progress</span>
                        <span>{trip.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${trip.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                  
                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 text-sm font-medium transition-colors flex items-center justify-center gap-1">
                      <EyeIcon className="h-4 w-4" />
                      View
                    </button>
                    <button className="flex-1 border-2 border-gray-200 text-gray-700 py-2 px-4 rounded-xl hover:bg-gray-50 text-sm font-medium transition-colors flex items-center justify-center gap-1">
                      <PencilIcon className="h-4 w-4" />
                      Edit
                    </button>
                    <button className="px-4 py-2 border-2 border-gray-200 text-gray-500 rounded-xl hover:bg-gray-50 transition-colors">
                      <ShareIcon className="h-4 w-4" />
                    </button>
                    <button className="px-4 py-2 border-2 border-red-200 text-red-500 rounded-xl hover:bg-red-50 transition-colors">
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
