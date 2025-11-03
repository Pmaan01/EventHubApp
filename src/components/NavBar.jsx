import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';
import logo from '../assets/logo.png';
import { auth, db } from '../firebase';

export default function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((u) => {
      setUser(u || null);
    });
    return () => unsub();
  }, []);

  return (
    <header className="bg-white/80 backdrop-blur-lg shadow-md sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/home')}
              className="flex items-center gap-2 group"
              aria-label="Go home"
            >
              <img src={logo} alt="EventHub" className="h-10 w-10 object-contain" />
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                EventHub
              </span>
            </button>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            <Link
              to="/home"
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                isActive('/home') ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              Home
            </Link>
            <Link
              to="/events"
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                isActive('/events') ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              All Events
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => navigate('/create-event')}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 shadow-md hover:shadow-lg transform hover:scale-105 transition-all"
              aria-label="Create Event"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
              </svg>
              Create Event
            </button>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-all"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col gap-2">
              <Link
                to="/home"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-lg font-medium transition-all ${
                  isActive('/home') ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Home
              </Link>
              <Link
                to="/events"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-lg font-medium transition-all ${
                  isActive('/events') ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                All Events
              </Link>
            </nav>

            <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
              <button
                onClick={() => {
                  navigate('/create-event');
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold shadow-md"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                </svg>
                Create Event
              </button>

            </div>
          </div>
        )}
      </div>
    </header>
  );
}