import { useState, useEffect } from 'react';
import Layout from '../layouts/Layout';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';
import { 
  SparklesIcon, 
  GlobeAltIcon, 
  CurrencyDollarIcon, 
  UserGroupIcon,
  MapPinIcon,
  ClockIcon,
  CalendarDaysIcon,
  ArrowRightIcon,
  PlayIcon,
  CheckCircleIcon,
  StarIcon
} from '@heroicons/react/24/outline';

export default function Home() {
  const { isAuthenticated } = useAuth();
  const [dreamPrompt, setDreamPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedTrip, setGeneratedTrip] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const samplePrompts = [
    "2-week adventure tour of Southeast Asia under $3000",
    "Romantic honeymoon in Europe for 10 days",
    "Family-friendly trip to Japan with kids",
    "Solo backpacking through South America",
    "Cultural heritage tour of India for 3 weeks",
    "Beach hopping in the Caribbean islands"
  ];

  const features = [
    {
      icon: SparklesIcon,
      title: "AI-Powered Planning",
      description: "Transform your travel dreams into detailed itineraries with our advanced AI that understands your preferences and budget.",
      color: "from-primary-500 to-primary-600"
    },
    {
      icon: GlobeAltIcon,
      title: "Multi-City Adventures",
      description: "Seamlessly plan complex multi-destination trips with optimized routes and perfect timing for each location.",
      color: "from-secondary-500 to-secondary-600"
    },
    {
      icon: CurrencyDollarIcon,
      title: "Smart Budget Tracking",
      description: "Keep your spending on track with real-time budget monitoring and intelligent cost predictions.",
      color: "from-accent-500 to-accent-600"
    },
    {
      icon: UserGroupIcon,
      title: "Collaborative Planning",
      description: "Plan with friends and family through shared itineraries, voting systems, and group coordination tools.",
      color: "from-primary-500 to-accent-500"
    }
  ];

  const stats = [
    { label: "Trips Planned", value: "10,000+", icon: MapPinIcon },
    { label: "Happy Travelers", value: "25,000+", icon: UserGroupIcon },
    { label: "Countries Covered", value: "150+", icon: GlobeAltIcon },
    { label: "AI Accuracy", value: "95%", icon: SparklesIcon }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Adventure Traveler",
      content: "YatraMate planned my perfect Southeast Asia trip in minutes! The AI understood exactly what I wanted.",
      rating: 5,
      avatar: "SJ"
    },
    {
      name: "Michael Chen",
      role: "Family Traveler",
      content: "The collaborative features made planning our family reunion so easy. Everyone could contribute ideas!",
      rating: 5,
      avatar: "MC"
    },
    {
      name: "Emma Rodriguez",
      role: "Solo Explorer",
      content: "Budget tracking saved me from overspending. The real-time updates are incredibly helpful.",
      rating: 5,
      avatar: "ER"
    }
  ];

  const generateDreamTrip = async () => {
    if (!dreamPrompt.trim()) return;
    
    setIsGenerating(true);
    setIsLoading(true);
    
    try {
      const response = await api.post('/ai/dream-trip', {
        prompt: dreamPrompt
      });
      
      setGeneratedTrip(response.data.trip);
    } catch (error) {
      console.error('Error generating trip:', error);
      alert('Failed to generate trip. Please try again.');
    } finally {
      setIsGenerating(false);
      setIsLoading(false);
    }
  };

  const useSamplePrompt = (prompt) => {
    setDreamPrompt(prompt);
  };

  return (
    <Layout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-20 pb-16 sm:pt-24 sm:pb-20">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary-200 to-transparent rounded-full blur-3xl opacity-30 animate-float"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-secondary-200 to-transparent rounded-full blur-3xl opacity-30 animate-float" style={{animationDelay: '1s'}}></div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-primary-200 mb-8">
                <SparklesIcon className="w-5 h-5 text-primary-600 mr-2" />
                <span className="text-primary-700 font-medium">AI-Powered Travel Planning</span>
              </div>
              
              <h1 className="heading-primary mb-6">
                Turn Your Travel Dreams Into
                <span className="block text-gradient">Perfect Adventures</span>
              </h1>
              
              <p className="text-xl text-text-secondary max-w-3xl mx-auto mb-12 leading-relaxed">
                Experience the future of travel planning with our AI-powered platform. 
                Simply describe your dream trip and watch as we create detailed, 
                personalized itineraries in seconds.
              </p>

              {/* AI Trip Generator */}
              <div className="max-w-4xl mx-auto mb-16">
                <div className="glass p-8 rounded-2xl">
                  <h3 className="heading-secondary mb-6">🌟 Dream Trip Generator</h3>
                  
                  <div className="space-y-6">
                    <div className="relative">
                      <textarea
                        value={dreamPrompt}
                        onChange={(e) => setDreamPrompt(e.target.value)}
                        placeholder="Describe your dream trip... (e.g., '2-week adventure tour of Southeast Asia under $3000')"
                        className="w-full h-32 input-field resize-none text-lg"
                        disabled={isGenerating}
                      />
                      
                      <button
                        onClick={generateDreamTrip}
                        disabled={!dreamPrompt.trim() || isGenerating}
                        className="absolute bottom-4 right-4 btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                      >
                        {isGenerating ? (
                          <>
                            <div className="spinner"></div>
                            <span>Generating...</span>
                          </>
                        ) : (
                          <>
                            <SparklesIcon className="w-5 h-5" />
                            <span>Generate Trip</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Sample Prompts */}
                    <div>
                      <p className="text-text-secondary mb-3">✨ Try these sample prompts:</p>
                      <div className="flex flex-wrap gap-2">
                        {samplePrompts.map((prompt, index) => (
                          <button
                            key={index}
                            onClick={() => useSamplePrompt(prompt)}
                            className="px-4 py-2 bg-white/60 hover:bg-white/80 border border-primary-200 rounded-lg text-sm text-text-primary hover:text-primary-600 transition-all duration-300 hover:scale-105"
                          >
                            {prompt}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Generated Trip Display */}
              {generatedTrip && (
                <div className="max-w-4xl mx-auto mb-16 animate-slide-up">
                  <div className="glass-dark p-8 rounded-2xl">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-bold text-white flex items-center">
                        <CheckCircleIcon className="w-8 h-8 text-secondary-400 mr-3" />
                        Your AI-Generated Trip
                      </h3>
                      <span className="px-4 py-2 bg-secondary-500 text-text-primary rounded-lg font-semibold">
                        ${generatedTrip.budget_estimate}
                      </span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                        <h4 className="text-xl font-semibold text-white mb-2">{generatedTrip.title}</h4>
                        <div className="flex items-center text-secondary-300 space-x-4">
                          <div className="flex items-center">
                            <CalendarDaysIcon className="w-5 h-5 mr-1" />
                            <span>{generatedTrip.duration_days} days</span>
                          </div>
                          <div className="flex items-center">
                            <MapPinIcon className="w-5 h-5 mr-1" />
                            <span>{generatedTrip.destinations?.length || 0} cities</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                        <h5 className="font-semibold text-white mb-2">Destinations:</h5>
                        <div className="space-y-1">
                          {generatedTrip.destinations?.slice(0, 3).map((dest, index) => (
                            <div key={index} className="text-secondary-300 text-sm">
                              📍 {dest.city}, {dest.country} ({dest.days} days)
                            </div>
                          ))}
                          {generatedTrip.destinations?.length > 3 && (
                            <div className="text-secondary-300 text-sm">
                              ...and {generatedTrip.destinations.length - 3} more
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {isAuthenticated ? (
                      <button className="w-full btn-secondary text-lg py-4">
                        Save & Customize This Trip
                      </button>
                    ) : (
                      <div className="text-center">
                        <p className="text-white mb-4">Sign up to save and customize your trip!</p>
                        <button className="btn-secondary text-lg px-8 py-4">
                          Get Started Free
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="btn-primary text-lg px-8 py-4 flex items-center space-x-2 group">
                  <PlayIcon className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                  <span>Start Planning Now</span>
                </button>
                <button className="btn-secondary text-lg px-8 py-4 flex items-center space-x-2">
                  <span>Explore Destinations</span>
                  <ArrowRightIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="heading-secondary mb-4">
                Why Choose <span className="text-gradient">YatraMate</span>?
              </h2>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                Discover the features that make travel planning effortless and enjoyable
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 card-hover border border-gray-100"
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-text-primary mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gradient-to-r from-primary-500 to-accent-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-white/90 text-sm font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-background-primary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="heading-secondary mb-4">
                What Our <span className="text-gradient">Travelers Say</span>
              </h2>
              <p className="text-xl text-text-secondary">
                Real experiences from real travelers
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="glass p-8 rounded-2xl card-hover"
                >
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <StarIcon key={i} className="w-5 h-5 text-secondary-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-text-secondary mb-6 italic">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center mr-4">
                      <span className="text-white font-semibold">
                        {testimonial.avatar}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-text-primary">
                        {testimonial.name}
                      </div>
                      <div className="text-text-secondary text-sm">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-primary-600 via-primary-500 to-accent-500">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Start Your Adventure?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of travelers who have discovered the joy of AI-powered trip planning. 
              Your perfect adventure is just one click away.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-secondary text-lg px-8 py-4 flex items-center justify-center space-x-2">
                <SparklesIcon className="w-6 h-6" />
                <span>Start Planning Free</span>
              </button>
              <button className="text-white border-2 border-white/30 hover:border-white/60 px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:bg-white/10">
                Watch Demo
              </button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
