import React, { useState, useEffect } from "react";
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
  AreaChart,
  Area,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState("Dashboard");
  const [channelName, setChannelName] = useState("");
  const [videoData, setVideoData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch video data from the API
  const fetchChannelData = async () => {
    if (!channelName) {
      setError("Please enter a channel name.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://iiitnayaraipur-hackathon-backend-1.onrender.com/api/v1/analyse/channelAnalysis",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: channelName }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.text(); // Get the response as text
      console.log("Raw Response:", result);

      // Parse the JSON string into an object
      const parsedData = JSON.parse(result);
      console.log("Parsed Data:", parsedData);

      if (parsedData.data) {
        // Transform the fetched data into the required format
        const transformedData = parsedData.data.videos.map((video) => ({
          id: video.video_id,
          title: `Video ${video.video_id}`,
          thumbnail: video.thumbnails.high.url,
          comments: parseInt(video.comments_count),
          sentiment: "Neutral", // Default sentiment (can be updated based on your logic)
          likes: parseInt(video.likes),
          views: parseInt(video.views),
          videoUrl: `https://www.youtube.com/watch?v=${video.video_id}`,
        }));
        setVideoData(transformedData);
      } else {
        setError("No data found for this channel.");
      }
    } catch (error) {
      console.error("Error fetching channel data:", error);
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Filter videos based on sentiment
  const filteredVideos =
    filter === "All"
      ? videoData
      : videoData.filter((video) => video.sentiment === filter);

  // Data for new graphs
  const barData = videoData.map((video) => ({
    name: video.title,
    views: video.views,
    likes: video.likes,
    comments: video.comments,
  }));

  const areaData = videoData.map((video) => ({
    name: video.title,
    likes: video.likes,
    comments: video.comments,
  }));

  const radarData = [
    { subject: "Likes", A: videoData.reduce((acc, video) => acc + video.likes, 0), fullMark: 1000 },
    { subject: "Comments", A: videoData.reduce((acc, video) => acc + video.comments, 0), fullMark: 1000 },
    { subject: "Views", A: videoData.reduce((acc, video) => acc + video.views, 0), fullMark: 10000 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 mt-16 left-0 w-64 bg-gray-100 shadow-lg transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } transition-transform duration-200 ease-in-out z-50`}
      >
        <div className="p-6">
          <h2 className="text-xl font-semibold">Menu</h2>
          <ul className="mt-6 space-y-2">
            {["Dashboard", "Analytics", "Settings"].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className={`block px-4 py-2 rounded-md text-sm font-medium ${
                    selectedMenuItem === item
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-blue-100"
                  }`}
                  onClick={() => setSelectedMenuItem(item)}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-0 md:ml-64 transition-all duration-200 ease-in-out">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center mt-16">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="md:hidden text-gray-700 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
            <h1 className="text-3xl font-bold">Channels</h1>
            <div className="flex items-center space-x-4">
              <input
                type="text"
                placeholder="Enter Channel Name"
                value={channelName}
                onChange={(e) => setChannelName(e.target.value)}
                className="border rounded-md px-4 py-2"
              />
              <button
                onClick={fetchChannelData}
                className="bg-blue-600 text-white px-4 py-2 rounded-md"
                disabled={loading}
              >
                {loading ? "Searching..." : "Search"}
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Error Message */}
          {error && <p className="text-red-500">{error}</p>}

          {/* Story-style Video Thumbnails */}
          <div className="overflow-x-auto scrollbar-custom py-4 flex space-x-4 mb-4 mt-2">
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
          <div className="overflow-x-auto scrollbar-custom py-6 mb-4">
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
                  <p className="text-sm text-gray-600">Likes: {video.likes}</p>
                  <p className="text-sm text-gray-600">Views: {video.views}</p>
                  <a
                    href={video.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Watch on YouTube
                  </a>
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

            {/* New Graphs */}
            <ChartCard title="Views Distribution">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="views" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Likes vs Comments">
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={areaData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="likes"
                    stroke="#10B981"
                    fill="#10B981"
                    fillOpacity={0.3}
                  />
                  <Area
                    type="monotone"
                    dataKey="comments"
                    stroke="#F59E0B"
                    fill="#F59E0B"
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Engagement Radar">
              <ResponsiveContainer width="100%" height={250}>
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis />
                  <Radar
                    dataKey="A"
                    stroke="#3B82F6"
                    fill="#3B82F6"
                    fillOpacity={0.6}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        </main>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .scrollbar-custom::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        .scrollbar-custom::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }

        .scrollbar-custom::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 10px;
        }

        .scrollbar-custom::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </div>
  );
}

const ChartCard = ({ title, children }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h3 className="text-xl font-semibold mb-4">{title}</h3>
    {children}
  </div>
);