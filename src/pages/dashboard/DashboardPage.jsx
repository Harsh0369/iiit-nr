import React, { useState } from "react";
import axios from "axios";
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
import { BarChart3, TrendingUp, MessageCircle, Users } from "lucide-react";

const COLORS = ["#4CAF50", "#FFC107", "#F44336"];

export default function DashboardPage() {
  const [ytLink, setYtLink] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState({
    lineData: [],
    pieData: [],
    stats: {},
  });

  const handleAnalyze = async () => {
    if (!ytLink) {
      setError("Please enter a valid YouTube link.");
      return;
    }

    setLoading(true);
    setError(null);
    console.log("Starting analysis for YouTube link:", ytLink);

    try {
      // Checkpoint 1: Sending POST request
      console.log("Sending POST request to backend...");
      const response = await axios.post(
        "https://iiitnayaraipur-hackathon-backend-1.onrender.com/api/v1/analyse/yt",
        { ytVideoLink: ytLink }
      );
      console.log("Backend response received:", response);

      if (response.data.success) {
        // Checkpoint 2: Processing response data
        console.log("Processing response data...");
        const { comments, prespectiveAnalysis } = response.data;

        // Process data for charts and stats
        let cumulativeSum = 0;
        const lineData = prespectiveAnalysis.map((analysis, index) => {
          const maxScore = Math.max(
            analysis.toxicity,
            analysis.profanity,
            analysis.severe_toxicity,
            analysis.insult,
            analysis.threat
          );
          cumulativeSum += maxScore;
          return {
            name: `#${index + 1}`,
            value: cumulativeSum / (index + 1),
          };
        });

        let positive = 0,
          neutral = 0,
          negative = 0;
        prespectiveAnalysis.forEach((analysis) => {
          const score = Math.max(
            analysis.toxicity,
            analysis.profanity,
            analysis.severe_toxicity,
            analysis.insult,
            analysis.threat
          );
          if (score >= 0.5) negative++;
          else if (score >= 0.3) neutral++;
          else positive++;
        });

        const uniqueAuthors = new Set(comments.map((c) => c.author)).size;
        const totalSentiment = prespectiveAnalysis.reduce((acc, analysis) => {
          const maxScore = Math.max(
            analysis.toxicity,
            analysis.profanity,
            analysis.severe_toxicity,
            analysis.insult,
            analysis.threat
          );
          return acc + (1 - maxScore);
        }, 0);

        setData({ comments, prespectiveAnalysis });
        setChartData({
          lineData,
          pieData: [
            { name: "Positive", value: positive },
            { name: "Neutral", value: neutral },
            { name: "Negative", value: negative },
          ],
          stats: {
            totalMentions: comments.length,
            sentimentScore: (
              (totalSentiment / prespectiveAnalysis.length) *
              100
            ).toFixed(1),
            activeUsers: uniqueAuthors,
            engagementRate: (
              (negative / prespectiveAnalysis.length) *
              100
            ).toFixed(1),
          },
        });
        console.log("Data processing complete");
      } else {
        throw new Error("Failed to analyze comments");
      }
    } catch (error) {
      console.error("Analysis error:", error);
      setError(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex mt-2">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-gray-50 to-gray-100 text-zinc-700 shadow-lg mt-14">
        <div className="p-4">
          <h2 className="text-2xl font-semi-bold ml-16 mb-6">MENU</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x- hover:bg-blue-400 rounded-lg py-1 px- cursor-pointer">
              <span className="text-2xl">📊</span>
              <span className="text-lg">Dashboard</span>
            </div>
            <div className="flex items-center space-x- hover:bg-blue-400 rounded-lg py-1 px- cursor-pointer">
              <span className="text-2xl">🔗</span>
              <span className="text-lg">YouTube Link</span>
            </div>
            <div className="flex items-center space-x- hover:bg-blue-400 rounded-lg py-1 px- cursor-pointer">
              <span className="text-2xl">📈</span>
              <span className="text-lg">Analytics</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <h1 className="text-3xl font-bold text-gray-900 mt-8">
              YouTube Comment Analysis
            </h1>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* YouTube Link Input */}
          <div className="mb-8">
            <div className="flex gap-4">
              <input
                type="text"
                value={ytLink}
                onChange={(e) => setYtLink(e.target.value)}
                placeholder="Enter YouTube video link"
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleAnalyze}
                disabled={loading}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 disabled:bg-blue-300 transition-all duration-300"
              >
                {loading ? "Analyzing..." : "Analyze"}
              </button>
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>

          {data && (
            <>
              {/* Emoji-Based Response */}
              <div className="bg-white p-6 rounded-lg shadow mb-8">
                <h2 className="text-2xl font-semibold mb-6">
                  Overall Sentiment
                </h2>
                <div className="flex justify-around">
                  {chartData.pieData.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all duration-300"
                    >
                      <span className="text-4xl">
                        {item.name === "Positive" && "😊"}
                        {item.name === "Neutral" && "😐"}
                        {item.name === "Negative" && "😠"}
                      </span>
                      <span
                        className={`text-lg text-gray-700 mt-2 px-4 rounded-lg ${
                          item.name === "Negative" ? "bg-red-500" : ""
                        } ${item.name === "Positive" ? "bg-green-500" : ""}`}
                      >
                        {item.name}
                      </span>
                      <span className="text-xl font-bold text-gray-900">
                        {item.value} Comments
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                  title="Total Comments"
                  value={chartData.stats.totalMentions}
                  icon={<MessageCircle className="h-8 w-8" />}
                />
                <StatCard
                  title="Tone rating"
                  value={chartData.stats.sentimentScore}
                  icon={<TrendingUp className="h-8 w-8" />}
                />
                <StatCard
                  title="Unique Authors"
                  value={chartData.stats.activeUsers}
                  icon={<Users className="h-8 w-8" />}
                />
                <StatCard
                  title="Toxic Comments"
                  value={`${chartData.stats.engagementRate}%`}
                  icon={<BarChart3 className="h-8 w-8" />}
                />
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-white p-6 rounded-lg shadow">
                  <h2 className="text-2xl font-semibold mb-6">
                    Toxicity Trend
                  </h2>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData.lineData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis
                          tickFormatter={(value) =>
                            `${Math.round(value * 100)}%`
                          }
                        />
                        <Tooltip
                          formatter={(value) => `${(value * 100).toFixed(1)}%`}
                        />
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

                <div className="bg-white p-6 rounded-lg shadow">
                  <h2 className="text-2xl font-semibold mb-6">
                    Sentiment Distribution
                  </h2>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={chartData.pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                          label
                        >
                          {chartData.pieData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `${value} comments`} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Comments Table */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-2xl font-semibold mb-6">
                  Comment Analysis
                </h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                          Author
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                          Comment
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                          Toxicity
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                          Profanity
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                          Severe Toxicity
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                          Insult
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                          Threat
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.comments.map((comment, index) => (
                        <tr
                          key={index}
                          className="border-t hover:bg-gray-50 transition-all duration-300"
                        >
                          <td className="px-6 py-4 text-gray-900">
                            {comment.author}
                          </td>
                          <td className="px-6 py-4 text-gray-700">
                            {comment.comment}
                          </td>
                          <td className="px-6 py-4 text-gray-900">
                            {(
                              data.prespectiveAnalysis[index].toxicity * 100
                            ).toFixed(1)}
                            %
                          </td>
                          <td className="px-6 py-4 text-gray-900">
                            {(
                              data.prespectiveAnalysis[index].profanity * 100
                            ).toFixed(1)}
                            %
                          </td>
                          <td className="px-6 py-4 text-gray-900">
                            {(
                              data.prespectiveAnalysis[index].severe_toxicity *
                              100
                            ).toFixed(1)}
                            %
                          </td>
                          <td className="px-6 py-4 text-gray-900">
                            {(
                              data.prespectiveAnalysis[index].insult * 100
                            ).toFixed(1)}
                            %
                          </td>
                          <td className="px-6 py-4 text-gray-900">
                            {(
                              data.prespectiveAnalysis[index].threat * 100
                            ).toFixed(1)}
                            %
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="bg-blue-100 p-3 rounded-full">{icon}</div>
      </div>
      <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
      <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
    </div>
  );
}