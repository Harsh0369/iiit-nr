import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";
import { BarChart3, TrendingUp, MessageCircle, Users } from "lucide-react";

const API_URL =
  "https://iiitnayaraipur-hackathon-backend-1.onrender.com/api/v1/analyse/yt";

export default function DashboardPage() {
  const [ytLink, setYtLink] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const handleAnalyse = async () => {
    setError("");
    setData(null);
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ytVideoLink: ytLink }),
      });

      if (!response.ok) {
        throw new Error(`Server Error: ${response.statusText}`);
      }

      const result = await response.json();
      console.log("API Response:", result);
      setData(result);
    } catch (err) {
      console.error("Fetch Error:", err.message);
      setError("Failed to fetch data. Please check the link and try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            YouTube Analytics Dashboard
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Input for YouTube Link */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-semibold mb-4">
            Enter YouTube Video Link
          </h2>
          <div className="flex space-x-4">
            <input
              type="text"
              className="border p-2 rounded flex-1"
              placeholder="Paste YouTube video link here..."
              value={ytLink}
              onChange={(e) => setYtLink(e.target.value)}
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handleAnalyse}
            >
              Analyze
            </button>
          </div>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>

        {/* Display Statistics After Fetching Data */}
        {data ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Sentiment Trend */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <TrendingUp className="w-6 h-6 mr-2" /> Sentiment Trend
              </h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data.sentiment_trend || []}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#3B82F6"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Sentiment Distribution */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <MessageCircle className="w-6 h-6 mr-2" /> Sentiment
                Distribution
              </h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data.sentiment_distribution || []}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                      label
                    >
                      {(data.sentiment_distribution || []).map(
                        (entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        )
                      )}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Comment Statistics */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Users className="w-6 h-6 mr-2" /> Comment Statistics
              </h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.comment_statistics || []}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Engagement Score */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <BarChart3 className="w-6 h-6 mr-2" /> Engagement Score
              </h2>
              <p className="text-lg font-bold text-gray-700">
                {data.engagement_score
                  ? data.engagement_score
                  : "No data available"}
              </p>
            </div>

            {/* Total Comments */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <MessageCircle className="w-6 h-6 mr-2" /> Total Comments
              </h2>
              <p className="text-lg font-bold text-gray-700">
                {data.total_comments
                  ? data.total_comments
                  : "No data available"}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-gray-600 text-center">
            Enter a YouTube link to see analytics.
          </p>
        )}
      </main>
    </div>
  );
}

const COLORS = ["#4CAF50", "#FFC107", "#F44336"];
