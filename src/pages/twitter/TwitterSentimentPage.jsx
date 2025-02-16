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

const tweetData = [
  {
    id: 1,
    text: "Just had the best coffee ever! ☕ #coffee #morningvibes",
    user: "coffee_lover123",
    likes: 120,
    retweets: 45,
    replies: 10,
    sentiment: "Positive",
  },
  {
    id: 2,
    text: "Traffic is terrible today. Why is everyone in such a rush? #traffic #frustrated",
    user: "city_driver",
    likes: 85,
    retweets: 20,
    replies: 15,
    sentiment: "Negative",
  },
  {
    id: 3,
    text: "Excited for the weekend! Time to relax and unwind. #weekendvibes",
    user: "weekend_warrior",
    likes: 200,
    retweets: 60,
    replies: 25,
    sentiment: "Positive",
  },
];

const trendingHashtags = [
  { hashtag: "#coffee", sentiment: "Positive", tweets: 1200 },
  { hashtag: "#traffic", sentiment: "Negative", tweets: 850 },
  { hashtag: "#weekendvibes", sentiment: "Positive", tweets: 2000 },
];

const sentimentData = [
  { name: "Positive", value: 60 },
  { name: "Neutral", value: 25 },
  { name: "Negative", value: 15 },
];

const engagementData = [
  { name: "Jan", likes: 65, retweets: 30, replies: 10 },
  { name: "Feb", likes: 72, retweets: 35, replies: 15 },
  { name: "Mar", likes: 68, retweets: 40, replies: 20 },
  { name: "Apr", likes: 85, retweets: 50, replies: 25 },
  { name: "May", likes: 78, retweets: 45, replies: 30 },
  { name: "Jun", likes: 90, retweets: 60, replies: 35 },
];

const activeTweetHours = [
  { hour: "6AM", tweets: 5 },
  { hour: "9AM", tweets: 20 },
  { hour: "12PM", tweets: 35 },
  { hour: "3PM", tweets: 25 },
  { hour: "6PM", tweets: 50 },
  { hour: "9PM", tweets: 30 },
];

const COLORS = ["#4CAF50", "#FFC107", "#F44336"];

export default function TwitterSentimentPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("dashboard");

  const handleSearch = () => {
    console.log("Analyzing tweets for:", searchQuery);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6 mt-16">Dashboard</h2>
        <nav className="space-y-4">
          {[
            { name: "Dashboard", id: "dashboard" },
            { name: "Trending Hashtags", id: "trending" },
            { name: "Engagement", id: "engagement" },
          ].map((item) => (
            <div
              key={item.id}
              className={`p-3 rounded-md cursor-pointer ${
                selectedTab === item.id
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100"
              }`}
              onClick={() => setSelectedTab(item.id)}
            >
              {item.name}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Search Bar */}
        <div className="mb-6 bg-white p-6 rounded-lg shadow-md">
          <input
            type="text"
            placeholder="Search tweets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md w-full"
          />
          <button
            onClick={handleSearch}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Analyze
          </button>
        </div>

        {/* Charts and Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ChartCard title="Sentiment Distribution">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={sentimentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  dataKey="value"
                >
                  {sentimentData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
          <ChartCard title="Active Tweet Hours">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={activeTweetHours}>
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="tweets" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </main>
    </div>
  );
}

function ChartCard({ title, children }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
      {children}
    </div>
  );
}
