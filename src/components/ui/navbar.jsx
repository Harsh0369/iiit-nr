import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { BarChart3, User, LogOut } from 'lucide-react';
import { Button } from './button';

export function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = true; // TODO: Replace with actual auth state

  const handleLogout = () => {
    // TODO: Implement logout logic
    navigate('/auth');
  };

  if (location.pathname === '/') return null;

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 fixed top-0 z-10 bg-white w-full"> 
        <div className="flex justify-between h-16">
          <div className="flex justify-between">
            <Link to="/" className="flex items-center">
              <BarChart3 className="h-6 w-6 text-blue-600" />
              <span className="ml-2 text-xl font-semibold">SentiMent</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/dashboard"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  location.pathname === "/dashboard"
                    ? "border-blue-500 text-gray-900"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`}
              >
                Dashboard
              </Link>

              <Link
                to="/channels"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  location.pathname === "/channels"
                    ? "border-blue-500 text-gray-900"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`}
              >
                Channels
              </Link>
              <Link
                to="/trending"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  location.pathname === "/trending"
                    ? "border-blue-500 text-gray-900"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`}
              >
                Trending
              </Link>
              <Link
                to="/chatbot"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  location.pathname === "/chatbot"
                    ? "border-blue-500 text-gray-900"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`}
              >
                Chat
              </Link>
              <Link
                to="/profile"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  location.pathname === "/profile"
                    ? "border-blue-500 text-gray-900"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`}
              >
                Profile
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/profile")}
              className="mr-2"
            >
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
