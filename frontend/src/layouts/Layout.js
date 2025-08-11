import Navbar from '../components/Navbar';
import { useAuth } from '../hooks/useAuth';

export default function Layout({ children }) {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center mb-4 mx-auto animate-bounce-gentle">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-text-secondary font-medium">Loading YatraMate...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-primary">
      <Navbar />
      <main className="transition-all duration-300">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-primary-100 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span className="text-xl font-bold text-gradient">YatraMate</span>
              </div>
              <p className="text-text-secondary mb-4 max-w-md">
                AI-powered travel planning platform that transforms your dreams into perfect adventures. 
                Plan smarter, travel better.
              </p>
              <div className="flex space-x-4">
                {['twitter', 'facebook', 'instagram', 'youtube'].map((social) => (
                  <a
                    key={social}
                    href={`#${social}`}
                    className="w-10 h-10 bg-primary-100 hover:bg-primary-500 rounded-lg flex items-center justify-center transition-colors duration-300 group"
                  >
                    <span className="text-primary-600 group-hover:text-white text-sm font-semibold">
                      {social[0].toUpperCase()}
                    </span>
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-text-primary mb-4">Product</h4>
              <ul className="space-y-2">
                {['Features', 'Pricing', 'API', 'Mobile App'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-text-secondary hover:text-primary-600 transition-colors duration-300">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-text-primary mb-4">Company</h4>
              <ul className="space-y-2">
                {['About', 'Blog', 'Careers', 'Contact'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-text-secondary hover:text-primary-600 transition-colors duration-300">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="border-t border-primary-100 pt-6 mt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-text-secondary text-sm">
              © 2025 YatraMate. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-text-secondary hover:text-primary-600 text-sm transition-colors duration-300"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
