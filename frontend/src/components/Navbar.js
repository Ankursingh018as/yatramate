import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { 
  HomeIcon, 
  MapIcon, 
  UserIcon, 
  GlobeAltIcon,
  Bars3Icon,
  XMarkIcon,
  ArrowRightOnRectangleIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    setIsMenuOpen(false);
  };

  const navItems = [
    { name: 'Home', href: '/', icon: HomeIcon },
    { name: 'Explore', href: '/explore', icon: GlobeAltIcon },
    ...(isAuthenticated ? [
      { name: 'Dashboard', href: '/dashboard', icon: ChartBarIcon },
    ] : []),
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/90 backdrop-blur-md shadow-lg border-b border-primary-100' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
              <MapIcon className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gradient hidden sm:block">
              YatraMate
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg text-text-secondary hover:text-primary-600 hover:bg-primary-50 transition-all duration-300 group"
              >
                <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 px-3 py-2 bg-primary-50 rounded-lg">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </span>
                  </div>
                  <span className="text-text-primary font-medium text-sm">
                    {user?.name || 'User'}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2 text-text-secondary hover:text-accent-600 hover:bg-accent-50 rounded-lg transition-all duration-300 group"
                >
                  <ArrowRightOnRectangleIcon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  href="/auth"
                  className="px-4 py-2 text-primary-600 hover:text-primary-700 font-medium rounded-lg hover:bg-primary-50 transition-all duration-300"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth"
                  className="btn-primary text-sm"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-text-secondary hover:text-primary-600 hover:bg-primary-50 transition-all duration-300"
          >
            {isMenuOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-96 pb-4' : 'max-h-0'
        }`}>
          <div className="bg-white/95 backdrop-blur-md rounded-xl border border-primary-100 shadow-xl mt-2 overflow-hidden">
            <div className="px-4 py-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg text-text-secondary hover:text-primary-600 hover:bg-primary-50 transition-all duration-300 group"
                >
                  <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              ))}
              
              <div className="border-t border-primary-100 pt-3 mt-3">
                {isAuthenticated ? (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3 px-4 py-2 bg-primary-50 rounded-lg">
                      <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                        </span>
                      </div>
                      <span className="text-text-primary font-medium">
                        {user?.name || 'User'}
                      </span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-3 px-4 py-3 text-accent-600 hover:text-accent-700 hover:bg-accent-50 rounded-lg transition-all duration-300 group"
                    >
                      <ArrowRightOnRectangleIcon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                      <span className="font-medium">Logout</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link
                      href="/auth"
                      onClick={() => setIsMenuOpen(false)}
                      className="block w-full px-4 py-3 text-center text-primary-600 hover:text-primary-700 font-medium rounded-lg hover:bg-primary-50 transition-all duration-300"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/auth"
                      onClick={() => setIsMenuOpen(false)}
                      className="block w-full btn-primary text-center"
                    >
                      Get Started
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
