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
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900 mt-10 ">
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
              className="flex-1 p-2 border rounded-lg"
            />
            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:bg-blue-300"
            >
              {loading ? "Analyzing..." : "Analyze"}
            </button>
          </div>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>

        {data && (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                title="Total Comments"
                value={chartData.stats.totalMentions}
                icon={<MessageCircle className="h-6 w-6" />}
              />
              <StatCard
                title="Sentiment Score"
                value={chartData.stats.sentimentScore}
                icon={<TrendingUp className="h-6 w-6" />}
              />
              <StatCard
                title="Unique Authors"
                value={chartData.stats.activeUsers}
                icon={<Users className="h-6 w-6" />}
              />
              <StatCard
                title="Toxic Comments"
                value={`${chartData.stats.engagementRate}%`}
                icon={<BarChart3 className="h-6 w-6" />}
              />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Toxicity Trend</h2>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData.lineData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis
                        tickFormatter={(value) => `${Math.round(value * 100)}%`}
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
                <h2 className="text-xl font-semibold mb-4">
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
              <h2 className="text-xl font-semibold mb-4">Comment Analysis</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left">Author</th>
                      <th className="px-4 py-2 text-left">Comment</th>
                      <th className="px-4 py-2 text-left">Toxicity</th>
                      <th className="px-4 py-2 text-left">Profanity</th>
                      <th className="px-4 py-2 text-left">Severe Toxicity</th>
                      <th className="px-4 py-2 text-left">Insult</th>
                      <th className="px-4 py-2 text-left">Threat</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.comments.map((comment, index) => (
                      <tr key={index} className="border-t">
                        <td className="px-4 py-2">{comment.author}</td>
                        <td className="px-4 py-2">{comment.comment}</td>
                        <td className="px-4 py-2">
                          {(
                            data.prespectiveAnalysis[index].toxicity * 100
                          ).toFixed(1)}
                          %
                        </td>
                        <td className="px-4 py-2">
                          {(
                            data.prespectiveAnalysis[index].profanity * 100
                          ).toFixed(1)}
                          %
                        </td>
                        <td className="px-4 py-2">
                          {(
                            data.prespectiveAnalysis[index].severe_toxicity *
                            100
                          ).toFixed(1)}
                          %
                        </td>
                        <td className="px-4 py-2">
                          {(
                            data.prespectiveAnalysis[index].insult * 100
                          ).toFixed(1)}
                          %
                        </td>
                        <td className="px-4 py-2">
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
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="bg-blue-100 p-3 rounded-full">{icon}</div>
      </div>
      <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
      <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
    </div>
  );
}
