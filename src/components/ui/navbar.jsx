import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { BarChart3, User, LogOut, LogIn } from "lucide-react";
import { Button } from "./button";

export function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = false; // TODO: Replace with actual auth state

  const handleLogout = () => {
    // TODO: Implement logout logic
    navigate("/auth");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-900 shadow-xl border-b border-indigo-600/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <Link to="/" className="group flex items-center space-x-2 relative">
            <div className="relative">
              <BarChart3 className="h-7 w-7 text-cyan-400 transition-all duration-300 group-hover:scale-110" />
              <span className="absolute inset-0 bg-cyan-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 group-active:opacity-0 transition-all duration-200"></span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent tracking-tight">
              SentiMent
            </span>
            {/* Click ripple effect */}
            <span className="absolute inset-0 pointer-events-none overflow-hidden">
              <span className="absolute inset-0 scale-0 group-active:scale-150 bg-cyan-500/10 rounded-full transition-transform duration-300 ease-out"></span>
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden sm:flex sm:items-center sm:space-x-2">
            {[
              { path: "/trending", label: "Trending" },
              { path: "/channels", label: "Channels" },
              { path: "/dashboard", label: "Dashboard" },
              { path: "/chatbot", label: "Chat" },
              { path: "/profile", label: "Profile" },
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-4 py-2 text-sm font-medium text-gray-200 overflow-hidden group
                  ${location.pathname === item.path ? "text-cyan-300" : ""}`}
              >
                {/* Text content */}
                <span className="relative z-10 transition-colors duration-200 group-hover:text-cyan-200">
                  {item.label}
                </span>

                {/* Hover particle effect */}
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <span className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-particle top-0 left-1/4" />
                  <span className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-particle top-1/2 right-1/4 delay-100" />
                </span>

                {/* Click ripple effect */}
                <span className="absolute inset-0 pointer-events-none">
                  <span className="absolute inset-0 scale-0 group-active:scale-125 bg-cyan-500/20 rounded transition-transform duration-300 ease-out" />
                </span>

                {/* Active state glow */}
                {location.pathname === item.path && (
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)] animate-pulse" />
                )}
              </Link>
            ))}
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-2">
            {isAuthenticated ? (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigate("/profile")}
                  className="relative text-gray-200 group overflow-hidden"
                >
                  <User className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
                  <span className="absolute inset-0 bg-cyan-500/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  <span className="absolute inset-0 border border-cyan-400 rounded-full scale-75 group-active:scale-125 opacity-0 group-active:opacity-100 transition-all duration-200 ease-out" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleLogout}
                  className="relative text-gray-200 group overflow-hidden"
                >
                  <LogOut className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
                  <span className="absolute inset-0 bg-cyan-500/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  <span className="absolute inset-0 border border-cyan-400 rounded-full scale-75 group-active:scale-125 opacity-0 group-active:opacity-100 transition-all duration-200 ease-out" />
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  onClick={() => navigate("/login")}
                  className="relative text-gray-200 group overflow-hidden px-4 py-2"
                >
                  <span className="relative z-10 flex items-center space-x-1">
                    <LogIn className="h-4 w-4" />
                    <span>Login</span>
                  </span>
                  {/* Hover sweep effect */}
                  <span className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-transparent translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
                  {/* Click pulse */}
                  <span className="absolute inset-0 bg-cyan-400/30 scale-0 group-active:scale-100 rounded transition-transform duration-150 ease-out" />
                </Button>

                <Button
                  variant="ghost"
                  onClick={() => navigate("/signup")}
                  className="relative text-gray-200 group overflow-hidden px-4 py-2 border border-cyan-500/30"
                >
                  <span className="relative z-10">Sign Up</span>
                  {/* Hover border glow */}
                  <span className="absolute inset-0 border border-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                  {/* Click burst */}
                  <span className="absolute inset-0 pointer-events-none">
                    <span className="absolute w-2 h-2 bg-cyan-400 rounded-full top-1/2 left-1/2 scale-0 group-active:scale-150 opacity-0 group-active:opacity-100 transition-all duration-200 ease-out" />
                  </span>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
