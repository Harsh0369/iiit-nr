import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl flex flex-col md:flex-row w-full max-w-4xl">
        {/* Left Side - Branding */}
        <div className="p-8 md:w-1/2 bg-gradient-to-br from-blue-600 to-purple-700 text-white rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <BarChart3 size={48} />
            </div>
            <h2 className="text-3xl font-bold mb-4">Sentiment Analyzer</h2>
            <p className="mb-8 opacity-80">
              Unlock powerful insights from your social media data with advanced
              sentiment analysis
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 opacity-80">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <BarChart3 size={24} />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold">Real-time Analysis</h3>
                  <p className="text-sm">
                    Get instant insights from your social media data
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Auth Form */}
        {isLogin ? (
          <Login setIsLogin={setIsLogin} />
        ) : (
          <Signup setIsLogin={setIsLogin} />
        )}
      </div>
    </div>
  );
}