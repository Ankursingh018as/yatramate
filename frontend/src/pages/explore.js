import { useState } from 'react';
import { MagnifyingGlassIcon, MapPinIcon, StarIcon, CalendarIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

export default function Explore() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const destinations = [
    {
      id: 1,
      name: 'Tokyo, Japan',
      description: 'Modern metropolis with traditional charm',
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400',
      rating: 4.8,
      price: 150,
      category: 'city',
      highlights: ['Cherry Blossoms', 'Shibuya Crossing', 'Traditional Temples']
    },
    {
      id: 2,
      name: 'Bali, Indonesia',
      description: 'Tropical paradise with stunning beaches',
      image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400',
      rating: 4.6,
      price: 80,
      category: 'beach',
      highlights: ['Rice Terraces', 'Ancient Temples', 'Beach Clubs']
    },
    {
      id: 3,
      name: 'Swiss Alps',
      description: 'Breathtaking mountain landscapes',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
      rating: 4.9,
      price: 200,
      category: 'mountain',
      highlights: ['Skiing', 'Hiking Trails', 'Alpine Villages']
    },
    {
      id: 4,
      name: 'Paris, France',
      description: 'The city of love and lights',
      image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=400',
      rating: 4.7,
      price: 120,
      category: 'city',
      highlights: ['Eiffel Tower', 'Louvre Museum', 'Seine River']
    },
    {
      id: 5,
      name: 'Santorini, Greece',
      description: 'Iconic blue and white island paradise',
      image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=400',
      rating: 4.8,
      price: 100,
      category: 'beach',
      highlights: ['Sunset Views', 'White-washed Buildings', 'Wine Tasting']
    },
    {
      id: 6,
      name: 'Patagonia',
      description: 'Wild landscapes at the end of the world',
      image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=400',
      rating: 4.9,
      price: 90,
      category: 'adventure',
      highlights: ['Glaciers', 'Hiking', 'Wildlife']
    }
  ];

  const categories = [
    { key: 'all', label: 'All Destinations' },
    { key: 'city', label: 'Cities' },
    { key: 'beach', label: 'Beaches' },
    { key: 'mountain', label: 'Mountains' },
    { key: 'adventure', label: 'Adventure' }
  ];

  const filteredDestinations = destinations.filter(dest => {
    const matchesSearch = dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dest.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || dest.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handlePlanTrip = (destination) => {
    const prompt = `Plan a trip to ${destination.name}. ${destination.description}. Include ${destination.highlights.join(', ')}.`;
    // Redirect to home page with the prompt
    window.location.href = `/?prompt=${encodeURIComponent(prompt)}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Explore Destinations
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover amazing places around the world and let AI plan your perfect trip
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search destinations..."
                className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map(category => (
              <button
                key={category.key}
                onClick={() => setSelectedCategory(category.key)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  selectedCategory === category.key
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white/70 text-gray-600 hover:bg-white/90'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Destinations Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map(destination => (
            <div key={destination.id} className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-white/20 group">
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={destination.image} 
                  alt={destination.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-sm font-medium text-gray-700 capitalize">
                    {destination.category}
                  </span>
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1">
                  <StarIcon className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">{destination.rating}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-800">{destination.name}</h3>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">${destination.price}</div>
                    <div className="text-sm text-gray-500">per day</div>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">{destination.description}</p>

                {/* Highlights */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Highlights:</h4>
                  <div className="flex flex-wrap gap-2">
                    {destination.highlights.map((highlight, index) => (
                      <span key={index} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button 
                    onClick={() => handlePlanTrip(destination)}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl hover:shadow-lg transition-all duration-300 font-semibold"
                  >
                    Plan Trip
                  </button>
                  <button className="px-4 py-3 border-2 border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors">
                    <MapPinIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredDestinations.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-white/70 backdrop-blur-md rounded-2xl p-12 max-w-md mx-auto">
              <MagnifyingGlassIcon className="h-24 w-24 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">No destinations found</h3>
              <p className="text-gray-500 mb-6">Try adjusting your search or filters</p>
              <button 
                onClick={() => {setSearchTerm(''); setSelectedCategory('all');}}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Can't find what you're looking for?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Let our AI create a custom trip for any destination in the world
          </p>
          <button 
            onClick={() => window.location.href = '/'}
            className="bg-white text-blue-600 px-8 py-4 rounded-xl hover:shadow-lg transition-all duration-300 font-semibold"
          >
            Create Custom Trip
          </button>
        </div>
      </div>
    </div>
  );
}
