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
} from "recharts";

const videoData = [
  {
    id: 1,
    title: "Video 1",
    thumbnail: "https://via.placeholder.com/150",
    comments: 120,
    sentiment: "Positive",
  },
  {
    id: 2,
    title: "Video 2",
    thumbnail: "https://via.placeholder.com/150",
    comments: 95,
    sentiment: "Neutral",
  },
  {
    id: 3,
    title: "Video 3",
    thumbnail: "https://via.placeholder.com/150",
    comments: 140,
    sentiment: "Negative",
  },
  {
    id: 4,
    title: "Video 4",
    thumbnail: "https://via.placeholder.com/150",
    comments: 80,
    sentiment: "Positive",
  },
  {
    id: 5,
    title: "Video 5",
    thumbnail: "https://via.placeholder.com/150",
    comments: 110,
    sentiment: "Neutral",
  },
  {
    id: 6,
    title: "Video 6",
    thumbnail: "https://via.placeholder.com/150",
    comments: 100,
    sentiment: "Negative",
  },
  {
    id: 7,
    title: "Video 7",
    thumbnail: "https://via.placeholder.com/150",
    comments: 90,
    sentiment: "Positive",
  },
  {
    id: 8,
    title: "Video 8",
    thumbnail: "https://via.placeholder.com/150",
    comments: 130,
    sentiment: "Neutral",
  },
];

const lineData = [
  { name: "Jan", value: 65 },
  { name: "Feb", value: 72 },
  { name: "Mar", value: 68 },
  { name: "Apr", value: 85 },
  { name: "May", value: 78 },
  { name: "Jun", value: 90 },
];

const pieData = [
  { name: "Positive", value: 45 },
  { name: "Neutral", value: 30 },
  { name: "Negative", value: 25 },
];

const COLORS = ["#4CAF50", "#FFC107", "#F44336"];

export default function ChannelsPage() {
  const [filter, setFilter] = useState("All");

  const filteredVideos =
    filter === "All"
      ? videoData
      : videoData.filter((video) => video.sentiment === filter);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold">Channels</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Story-style Video Thumbnails */}
        <div className="overflow-x-auto scrollbar-custom py-4 flex space-x-4">
          {videoData.map((video) => (
            <div
              key={video.id}
              className="flex-shrink-0 w-24 h-24 rounded-full overflow-hidden border-4 border-blue-500"
            >
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Video Filtering */}
        <div className="mb-6 flex items-center space-x-4">
          {["All", "Positive", "Neutral", "Negative"].map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                filter === category
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Video-wise Analysis */}
        <div className="overflow-x-auto scrollbar-custom py-6">
          <div className="flex space-x-6">
            {filteredVideos.map((video) => (
              <div
                key={video.id}
                className="bg-white p-4 rounded-lg shadow-md w-60 flex-shrink-0"
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-32 object-cover rounded-md"
                />
                <h3 className="text-lg font-semibold mt-2">{video.title}</h3>
                <p className="text-sm text-gray-600">
                  Comments: {video.comments}
                </p>
                <p
                  className={`text-xs font-bold mt-1 ${
                    video.sentiment === "Positive"
                      ? "text-green-600"
                      : video.sentiment === "Neutral"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {video.sentiment}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Graphs Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ChartCard title="Toxicity Level">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={lineData}>
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
          </ChartCard>

          <ChartCard title="Likes Growth">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#10B981"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Comments Growth">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#F59E0B"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Engagement Rate">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  dataKey="value"
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </main>
    </div>
  );
}

function ChartCard({ title, children }) {
  return (
    <div className="bg-gray-200 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="h-60">{children}</div>
    </div>
  );
}
