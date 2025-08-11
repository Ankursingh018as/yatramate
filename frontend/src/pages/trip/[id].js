import { useState, useEffect } from 'react';
import { CalendarIcon, MapPinIcon, CurrencyDollarIcon, ShareIcon, PencilIcon, ClockIcon, UserGroupIcon } from '@heroicons/react/24/outline';

export default function TripDetails() {
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('itinerary');

  useEffect(() => {
    // Mock trip data - replace with API call
    setTimeout(() => {
      setTrip({
        id: 1,
        title: 'Southeast Asia Adventure',
        description: 'An incredible journey through the cultural wonders of Thailand, Vietnam, and Cambodia',
        start_date: '2025-09-15',
        end_date: '2025-09-29',
        budget_estimate: 2800,
        currency: 'USD',
        status: 'planned',
        image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800',
        destinations: ['Bangkok', 'Ho Chi Minh City', 'Siem Reap'],
        stops: [
          {
            id: 1,
            city_name: 'Bangkok',
            country: 'Thailand',
            arrival_date: '2025-09-15',
            departure_date: '2025-09-20',
            activities: [
              { name: 'Grand Palace Visit', duration: '3 hours', cost: 15, time: '09:00' },
              { name: 'Floating Market Tour', duration: '4 hours', cost: 25, time: '14:00' },
              { name: 'Thai Cooking Class', duration: '3 hours', cost: 35, time: '18:00' }
            ]
          },
          {
            id: 2,
            city_name: 'Ho Chi Minh City',
            country: 'Vietnam',
            arrival_date: '2025-09-20',
            departure_date: '2025-09-25',
            activities: [
              { name: 'Cu Chi Tunnels', duration: '5 hours', cost: 20, time: '08:00' },
              { name: 'Street Food Tour', duration: '3 hours', cost: 15, time: '19:00' },
              { name: 'War Museum Visit', duration: '2 hours', cost: 5, time: '10:00' }
            ]
          },
          {
            id: 3,
            city_name: 'Siem Reap',
            country: 'Cambodia',
            arrival_date: '2025-09-25',
            departure_date: '2025-09-29',
            activities: [
              { name: 'Angkor Wat Sunrise', duration: '6 hours', cost: 37, time: '05:00' },
              { name: 'Bayon Temple', duration: '2 hours', cost: 0, time: '14:00' },
              { name: 'Traditional Dance Show', duration: '2 hours', cost: 25, time: '19:00' }
            ]
          }
        ],
        budget_breakdown: {
          accommodation: 800,
          transportation: 600,
          food: 700,
          activities: 500,
          miscellaneous: 200
        }
      });
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const totalDays = Math.ceil((new Date(trip.end_date) - new Date(trip.start_date)) / (1000 * 60 * 60 * 24));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-blue-600 to-purple-600">
        {trip.image && (
          <img 
            src={trip.image} 
            alt={trip.title}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="text-white">
              <h1 className="text-5xl font-bold mb-4">{trip.title}</h1>
              <p className="text-xl opacity-90 mb-6 max-w-3xl">{trip.description}</p>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center">
                  <CalendarIcon className="h-6 w-6 mr-2" />
                  <span>{totalDays} days</span>
                </div>
                <div className="flex items-center">
                  <CurrencyDollarIcon className="h-6 w-6 mr-2" />
                  <span>{trip.currency} {trip.budget_estimate}</span>
                </div>
                <div className="flex items-center">
                  <MapPinIcon className="h-6 w-6 mr-2" />
                  <span>{trip.destinations.join(' → ')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white/80 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { key: 'itinerary', label: 'Itinerary' },
              { key: 'budget', label: 'Budget' },
              { key: 'activities', label: 'Activities' },
              { key: 'sharing', label: 'Sharing' }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`py-4 px-2 border-b-2 font-medium transition-colors ${
                  activeTab === tab.key
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'itinerary' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">Your Journey</h2>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
                <PencilIcon className="h-4 w-4" />
                Edit Itinerary
              </button>
            </div>

            {trip.stops.map((stop, index) => (
              <div key={stop.id} className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-800">{stop.city_name}, {stop.country}</h3>
                    <p className="text-gray-600">
                      {new Date(stop.arrival_date).toLocaleDateString()} - {new Date(stop.departure_date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">
                      {Math.ceil((new Date(stop.departure_date) - new Date(stop.arrival_date)) / (1000 * 60 * 60 * 24))} days
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {stop.activities.map((activity, actIndex) => (
                    <div key={actIndex} className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800">{activity.name}</h4>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                          <span className="flex items-center">
                            <ClockIcon className="h-4 w-4 mr-1" />
                            {activity.time}
                          </span>
                          <span>{activity.duration}</span>
                          <span className="text-green-600 font-medium">${activity.cost}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'budget' && (
          <div className="space-y-8">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Budget Breakdown</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  {Object.entries(trip.budget_breakdown).map(([category, amount]) => (
                    <div key={category} className="flex justify-between items-center py-3 border-b border-gray-200">
                      <span className="capitalize text-gray-700">{category}</span>
                      <span className="font-semibold text-gray-800">${amount}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center py-3 font-bold text-lg">
                    <span>Total</span>
                    <span className="text-blue-600">${trip.budget_estimate}</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-800">Budget Tips</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>• Book flights 2-3 months in advance for better prices</p>
                    <p>• Consider staying in hostels or guesthouses</p>
                    <p>• Try local street food for authentic and cheap meals</p>
                    <p>• Use public transportation when possible</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'activities' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">All Activities</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trip.stops.flatMap(stop => 
                stop.activities.map((activity, index) => (
                  <div key={`${stop.id}-${index}`} className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20">
                    <h3 className="font-semibold text-gray-800 mb-2">{activity.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{stop.city_name}, {stop.country}</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Duration:</span>
                        <span className="font-medium">{activity.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Cost:</span>
                        <span className="font-medium text-green-600">${activity.cost}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Time:</span>
                        <span className="font-medium">{activity.time}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === 'sharing' && (
          <div className="space-y-8">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Share Your Trip</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Public Link</h3>
                  <div className="flex gap-3">
                    <input 
                      type="text" 
                      value="https://yatramate.com/trip/abc123"
                      readOnly
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                    />
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                      Copy
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Collaborate</h3>
                  <div className="flex gap-3">
                    <input 
                      type="email" 
                      placeholder="Enter email to invite"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                    />
                    <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2">
                      <UserGroupIcon className="h-4 w-4" />
                      Invite
                    </button>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <button className="flex items-center justify-center gap-2 p-4 border-2 border-blue-200 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                    <ShareIcon className="h-5 w-5" />
                    Share on Social
                  </button>
                  <button className="flex items-center justify-center gap-2 p-4 border-2 border-green-200 text-green-600 rounded-lg hover:bg-green-50 transition-colors">
                    Export PDF
                  </button>
                  <button className="flex items-center justify-center gap-2 p-4 border-2 border-purple-200 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors">
                    Print Itinerary
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
