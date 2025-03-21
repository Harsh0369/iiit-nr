import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/ui/navbar";
import LandingPage from "./pages/landing/LandingPage";
import Login from "./pages/auth/Login"; // Import Login component
import Signup from "./pages/auth/Signup"; // Import Signup component
import DashboardPage from "./pages/dashboard/DashboardPage";
import ProfilePage from "./pages/profile/ProfilePage";
import ChatbotPage from "./pages/chatbot/ChatbotPage";
import ChannelsPage from "./pages/channel/ChannelsPage";
import TwitterSentimentPage from "./pages/twitter/TwitterSentimentPage";
import TrendingPage from "./pages/trending/TrendingPages";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} /> {/* Route for Login */}
          <Route path="/signup" element={<Signup />} /> {/* Route for Signup */}
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/chatbot" element={<ChatbotPage />} />
          <Route path="/channels" element={<ChannelsPage />} />
          <Route path="/twitter" element={<TwitterSentimentPage />} />
          <Route path="/trending" element={<TrendingPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;