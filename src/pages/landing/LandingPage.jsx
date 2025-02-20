import React from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart3,
  MessageCircle,
  Users,
  Brain,
  ArrowRight,
  Mic,
  MessageSquare,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import Footer from "../../components/ui/Footer";
import arjun from "../../assets/arjun.jpg";
import harsh from "../../assets/harsh.jpg";
import divyanshu from "../../assets/divyanshu.jpg";
import bharat from "../../assets/bharat.jpg";

const features = [
  {
    icon: <BarChart3 className="h-6 w-6" />,
    title: "Real-time Analytics",
    description:
      "Instant insights from social media with cutting-edge sentiment analysis.",
  },
  {
    icon: <MessageCircle className="h-6 w-6" />,
    title: "Multi-platform Support",
    description:
      "Analyze sentiments across platforms in one seamless dashboard.",
  },
  {
    icon: <Brain className="h-6 w-6" />,
    title: "AI-Powered Insights",
    description: "Precision sentiment classification with advanced AI models.",
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Team Collaboration",
    description: "Unite your team to act on sentiment trends effectively.",
  },
];

const teamMembers = [
  {
    name: "Harsh Agarwal",
    role: "Web Developer",
    image: harsh,
    bio: "Visionary leader in sentiment analysis innovation.",
  },
  {
    name: "Arjun Verma",
    role: "Web Developer",
    image: arjun,
    bio: "AI and machine learning solution architect.",
  },
  {
    name: "Divyanshu Mishra",
    role: "AI-ML Engineer",
    image: divyanshu,
    bio: "Mastermind of intuitive data experiences.",
  },
  {
    name: "Bharat Kushwaha",
    role: "App Developer",
    image: bharat,
    bio: "Creator of seamless mobile analytics tools.",
  },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-900 text-gray-200">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-screen flex items-center pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-900 z-0" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left space-y-8">
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent leading-tight">
                Decode Your Social Sentiment
              </h1>
              <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto lg:mx-0">
                Turn chaotic social media data into clear, actionable insights
                with our next-gen sentiment analysis platform.
              </p>
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                <Button
                  size="lg"
                  onClick={() => navigate("/trending")}
                  className="bg-cyan-500 hover:bg-cyan-600 text-white relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center">
                    Get Started <ArrowRight className="ml-2 h-5 w-5" />
                  </span>
                  <span className="absolute inset-0 bg-cyan-400 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate("/chatbot")}
                  className="border-cyan-500 text-cyan-300 hover:text-cyan-200 hover:border-cyan-400"
                >
                  Try Demo
                </Button>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 rounded-full blur-3xl transform -rotate-12" />
              <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 shadow-2xl border border-indigo-600/30">
                <div className="space-y-4">
                  <p className="text-cyan-300 text-sm">
                    Live Sentiment Snapshot
                  </p>
                  <div className="h-48 bg-gradient-to-br from-cyan-900 to-indigo-900 rounded-lg flex items-center justify-center">
                    <BarChart3 className="h-16 w-16 text-cyan-400 animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-100">
              Unmatched Capabilities
            </h2>
            <p className="text-lg text-gray-400 mt-2">
              Tools to master your social media narrative
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-indigo-600/20 hover:border-cyan-500/50 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300" />
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-cyan-900/50 rounded-lg flex items-center justify-center mb-4 text-cyan-400 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-100 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chatbot Section */}
      <section className="py-24 bg-gradient-to-b from-gray-900 to-indigo-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="bg-gray-800/70 backdrop-blur-md rounded-xl p-6 shadow-xl border border-indigo-600/30">
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-cyan-900 rounded-full flex items-center justify-center">
                    <Brain className="h-4 w-4 text-cyan-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-100">
                      AI Assistant
                    </p>
                    <p className="text-xs text-gray-500">Active</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="bg-cyan-900/50 rounded-lg p-3 max-w-xs">
                    <p className="text-sm text-gray-200">
                      Hey there! Ready to dive into your social sentiment?
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-indigo-600 rounded-lg p-3 max-w-xs">
                      <p className="text-sm text-white">
                        Can you analyze my brand’s Twitter sentiment?
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-100">
                Your AI Sentiment Sidekick
              </h2>
              <p className="text-lg text-gray-400">
                Chat or speak with our intelligent assistant to uncover deep
                insights from your social data in real-time.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  onClick={() => navigate("/chatbot")}
                  className="bg-cyan-500 hover:bg-cyan-600 text-white"
                >
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Launch Chat
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-cyan-500 text-cyan-300 hover:text-cyan-200 hover:border-cyan-400"
                >
                  <Mic className="mr-2 h-5 w-5" />
                  Voice Mode
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-100">
              The Minds Behind SentiMent
            </h2>
            <p className="text-lg text-gray-400 mt-2">
              Meet the innovators shaping your analytics future
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="group bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-indigo-600/20 hover:border-cyan-500/40 transition-all duration-300"
              >
                <div className="relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-75" />
                </div>
                <div className="p-5 relative">
                  <h3 className="text-xl font-semibold text-gray-100">
                    {member.name}
                  </h3>
                  <p className="text-cyan-400 text-sm mt-1">{member.role}</p>
                  <p className="text-gray-400 text-sm mt-2">{member.bio}</p>
                  <div className="flex mt-4 space-x-3">
                    {[Twitter, Linkedin, Github].map((Icon, idx) => (
                      <a
                        key={idx}
                        href="#"
                        className="text-gray-500 hover:text-cyan-300 transition-colors duration-200 relative group/icon"
                      >
                        <Icon className="h-5 w-5" />
                        <span className="absolute -inset-1 bg-cyan-500/20 rounded-full blur-sm opacity-0 group-hover/icon:opacity-100 transition-opacity duration-200" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
