import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart3, MessageCircle, Users, Brain, ArrowRight, Mic, MessageSquare, Github, Linkedin, Twitter } from 'lucide-react';
import { Button } from '../../components/ui/button';
import Footer from '../../components/ui/Footer';
import arjun from '../../assets/arjun.jpg';
import harsh from '../../assets/harsh.jpg';
import divyanshu from '../../assets/divyanshu.jpg';
import bharat from '../../assets/bharat.jpg';

const features = [
  {
    icon: <BarChart3 className="h-6 w-6 text-blue-600" />,
    title: 'Real-time Analytics',
    description: 'Get instant insights from your social media data with advanced sentiment analysis.'
  },
  {
    icon: <MessageCircle className="h-6 w-6 text-blue-600" />,
    title: 'Multi-platform Support',
    description: 'Analyze sentiments across multiple social media platforms simultaneously.'
  },
  {
    icon: <Brain className="h-6 w-6 text-blue-600" />,
    title: 'AI-Powered Insights',
    description: 'Leverage advanced AI algorithms for accurate sentiment classification.'
  },
  {
    icon: <Users className="h-6 w-6 text-blue-600" />,
    title: 'Team Collaboration',
    description: 'Work together with your team to analyze and respond to sentiment trends.'
  }
];

const teamMembers = [
  {
    name: "Harsh Agarwal",
    role: "Web Developer",
    image:harsh,
    bio: "Leading the vision for next-generation sentiment analysis.",
  },
  {
    name: "Arjun Verma",
    role: "Web Developer",
    image: arjun,
    bio: "Architecting innovative solutions in AI and machine learning.",
  },
  {
    name: "Divyanshu Mishra",
    role: "AI-ML Engineer",
    image: divyanshu,
    bio: "Crafting intuitive user experiences for complex data analysis.",
  },
  {
    name: "Bharat Kushwaha",
    role: "App Developer",
    image: bharat,
    bio: "Crafting intuitive user experiences for complex data analysis.",
  },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 z-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="py-20 md:py-28">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Understand Your Social Media Impact
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Transform your social media data into actionable insights with
                our advanced sentiment analysis platform.
              </p>
              <div className="flex justify-center gap-4">
                <Button
                  size="lg"
                  onClick={() => navigate("/dashboard")}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate("/chatbot")}
                >
                  Try Demo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Powerful Features for Deep Insights
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to understand and act on social sentiment
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600">
              The experts behind our sentiment analysis platform
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                  <div className="flex mt-4 space-x-3">
                    <a href="#" className="text-gray-400 hover:text-gray-500">
                      <Twitter className="h-5 w-5" />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-gray-500">
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-gray-500">
                      <Github className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chatbot Preview Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Intelligent Chatbot Assistant
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Get instant answers about your social media sentiment analysis
                with our AI-powered chatbot. Support for both text and voice
                interactions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  onClick={() => navigate("/chatbot")}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Start Chat
                </Button>
                <Button size="lg" variant="outline">
                  <Mic className="mr-2 h-5 w-5" />
                  Try Voice
                </Button>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 shadow-lg">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Brain className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      AI Assistant
                    </p>
                    <p className="text-xs text-gray-500">Online</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-end">
                    <div className="bg-blue-50 rounded-lg p-3 max-w-xs">
                      <p className="text-sm text-gray-900">
                        Hello! How can I help you analyze your social media
                        sentiment today?
                      </p>
                    </div>
                  </div>
                  <div className="flex items-end justify-end">
                    <div className="bg-blue-600 rounded-lg p-3 max-w-xs">
                      <p className="text-sm text-white">
                        I need to analyze Twitter sentiment for my brand.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}