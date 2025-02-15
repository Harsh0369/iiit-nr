import React from 'react';
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
} from 'recharts';
import { BarChart3, TrendingUp, MessageCircle, Users } from 'lucide-react';

const lineData = [
  { name: 'Jan', value: 65 },
  { name: 'Feb', value: 72 },
  { name: 'Mar', value: 68 },
  { name: 'Apr', value: 85 },
  { name: 'May', value: 78 },
  { name: 'Jun', value: 90 },
];

const pieData = [
  { name: 'Positive', value: 45 },
  { name: 'Neutral', value: 30 },
  { name: 'Negative', value: 25 },
];

const COLORS = ['#4CAF50', '#FFC107', '#F44336'];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Mentions"
            value="1,234"
            icon={<MessageCircle className="h-6 w-6" />}
            trend="+12.5%"
          />
          <StatCard
            title="Sentiment Score"
            value="78.5"
            icon={<TrendingUp className="h-6 w-6" />}
            trend="+5.2%"
          />
          <StatCard
            title="Active Users"
            value="892"
            icon={<Users className="h-6 w-6" />}
            trend="+8.1%"
          />
          <StatCard
            title="Engagement Rate"
            value="24.3%"
            icon={<BarChart3 className="h-6 w-6" />}
            trend="+3.7%"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sentiment Trend */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Sentiment Trend</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
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
            </div>
          </div>

          {/* Sentiment Distribution */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Sentiment Distribution</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={5}
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
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ title, value, icon, trend }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="bg-blue-100 p-3 rounded-full">{icon}</div>
        <span className="text-green-500 text-sm font-semibold">{trend}</span>
      </div>
      <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
      <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
    </div>
  );
}