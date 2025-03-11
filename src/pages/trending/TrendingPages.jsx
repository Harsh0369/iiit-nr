import { useState, useEffect } from "react";
import {
  FaPaperPlane,
  FaFire,
  FaYoutube,
  FaTwitter,
  FaReddit,
} from "react-icons/fa";
import { HiChartBar, HiLightBulb, HiTag, HiSearch } from "react-icons/hi";
import axios from "axios";

// API Endpoints
const SEARCH_URL = import.meta.env.VITE_SEARCH_URL;
const AI_ANALYSIS_URL = import.meta.env.VITE_AI_ANALYSIS_URL;
const SEO_THUMBNAILS_URL = import.meta.env.VITE_SEO_THUMBNAILS_URL;

// Enhanced scrollbar styles
const scrollbarStyles = `
  .custom-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: rgba(99, 102, 241, 0.4) rgba(30, 41, 59, 0.2);
  }
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: rgba(30, 41, 59, 0.2);
    border-radius: 8px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: rgba(99, 102, 241, 0.4);
    border-radius: 8px;
    transition: all 0.2s ease;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background-color: rgba(99, 102, 241, 0.6);
  }
`;

export default function TrendingPage() {
  const [trendingTopics, setTrendingTopics] = useState([]);
  const [input, setInput] = useState("");
  const [generatedContent, setGeneratedContent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("youtube");
  const [error, setError] = useState("");
  const [showSidebar, setShowSidebar] = useState(true);

  useEffect(() => {
    const fetchTrendingTopics = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(SEARCH_URL);
        const videos = response.data?.ytTopics || [];
        const topics = videos.map((video) => ({
          id: Math.random().toString(36).substring(2, 9),
          title: video.title || "Untitled Topic",
          thumbnails: video.thumbnail ? [video.thumbnail] : [],
          platform: "youtube",
          views: Math.floor(Math.random() * 1000000) + 10000,
        }));
        setTrendingTopics(topics);
        setError("");
      } catch (error) {
        console.error("Error fetching trending topics:", error);
        setError("Failed to fetch trending topics. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchTrendingTopics();

    // Add responsive handler
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setShowSidebar(false);
      } else {
        setShowSidebar(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    setError("");

    try {
      const [aiResponse, seoResponse] = await Promise.all([
        axios.post(AI_ANALYSIS_URL, { topic: input }),
        axios.post(SEO_THUMBNAILS_URL, { topic: input }),
      ]);

      const aiData = aiResponse.data.aIRecommendations.response;
      const jsonMatch =
        aiData.match(/```json\n([\s\S]*?)\n```/) ||
        aiData.match(/\{[\s\S]*?\}/);

      let parsedData = {};
      try {
        parsedData = jsonMatch ? JSON.parse(jsonMatch[1] || jsonMatch[0]) : {};
      } catch (parseError) {
        console.error("Error parsing AI response:", parseError);
        parsedData = {
          recommended_title: input,
          recommended_script:
            "Failed to parse AI response properly. Here's the raw data:\n\n" +
            aiData,
        };
      }

      const seoTags = seoResponse.data?.seoTags
        ? seoResponse.data.seoTags
            .flat()
            .filter((tag) => typeof tag === "string")
        : [];

      setGeneratedContent({
        title: parsedData.recommended_title || "Generated Title for " + input,
        seoTags: seoTags.length
          ? seoTags
          : ["content", "creation", "trending", "viral", input],
        thumbnails: Array.isArray(seoResponse.data?.thumbnailLinks)
          ? seoResponse.data.thumbnailLinks.slice(0, 4)
          : [],
        script: parsedData.recommended_script || "No script generated.",
        sentiment: {
          positive: Math.random() * 60 + 20,
          neutral: Math.random() * 40 + 10,
          negative: Math.random() * 30,
        },
        query: input,
      });

      // On mobile, auto-hide sidebar after search
      if (window.innerWidth < 768) {
        setShowSidebar(false);
      }
    } catch (error) {
      console.error("Error generating content:", error);
      setError(
        "An error occurred while analyzing your topic. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Format large numbers with commas and abbreviate if over 1 million
  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  return (
    <>
      <style>{scrollbarStyles}</style>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-900 text-gray-200">
        {/* Mobile Sidebar Toggle */}
        <button
          className="md:hidden fixed top-20 left-4 z-50 p-2 bg-indigo-600 rounded-full shadow-lg"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          {showSidebar ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <FaFire />
          )}
        </button>

        <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row h-screen overflow-hidden pt-16">
          {/* Left Sidebar - Trending Topics */}
          <div
            className={`${
              showSidebar ? "block" : "hidden"
            } md:block w-full md:w-1/3 lg:w-1/4 bg-gray-800/30 backdrop-blur-md border-r border-indigo-600/20 h-screen fixed md:sticky top-0 left-0 pt-16 md:pt-0 z-40 md:z-0`}
          >
            <div className="p-4 md:p-6 border-b border-indigo-600/30">
              <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2">
                <FaFire className="text-orange-400" />
                <span className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
                  Trending Topics
                </span>
              </h2>
              <p className="text-sm text-gray-400 mt-1">
                Discover what's generating buzz across platforms
              </p>
            </div>

            {/* Platform Tabs */}
            <div className="flex border-b border-indigo-600/30">
              {[
                {
                  id: "youtube",
                  label: "YouTube",
                  icon: <FaYoutube className="mr-2" />,
                },
                {
                  id: "twitter",
                  label: "Twitter",
                  icon: <FaTwitter className="mr-2" />,
                },
                {
                  id: "reddit",
                  label: "Reddit",
                  icon: <FaReddit className="mr-2" />,
                },
              ].map((platform) => (
                <button
                  key={platform.id}
                  className={`flex-1 py-3 px-2 md:px-4 flex items-center justify-center text-xs md:text-sm font-medium ${
                    activeTab === platform.id
                      ? "text-indigo-400 border-b-2 border-indigo-500"
                      : "text-gray-400 hover:text-gray-300"
                  }`}
                  onClick={() => setActiveTab(platform.id)}
                >
                  {platform.icon}{" "}
                  <span className="hidden sm:inline">{platform.label}</span>
                </button>
              ))}
            </div>

            {/* Trending Topics List */}
            <div className="h-[calc(100vh-200px)] overflow-y-auto custom-scrollbar">
              {isLoading && trendingTopics.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <div className="relative flex flex-col items-center gap-2">
                    <div className="w-10 h-10 border-3 border-t-indigo-500 border-indigo-500/30 rounded-full animate-spin"></div>
                    <p className="text-xs text-indigo-400 animate-pulse">
                      Loading trending topics
                    </p>
                  </div>
                </div>
              ) : error && trendingTopics.length === 0 ? (
                <div className="flex items-center justify-center h-full p-6">
                  <div className="text-center space-y-3">
                    <p className="text-red-400">{error}</p>
                    <button
                      onClick={() => window.location.reload()}
                      className="px-4 py-2 bg-indigo-600/50 hover:bg-indigo-600 rounded-md text-sm transition-colors"
                    >
                      Retry
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4">
                  {trendingTopics
                    .filter((topic) => activeTab === "youtube")
                    .map((topic) => (
                      <div
                        key={topic.id}
                        className="group bg-gray-800/50 rounded-lg border border-indigo-600/20 hover:border-indigo-400/50 transition-all duration-300 cursor-pointer overflow-hidden"
                        onClick={() => {
                          setInput(topic.title);
                          if (window.innerWidth < 768) {
                            setShowSidebar(false);
                          }
                        }}
                      >
                        <div className="relative aspect-video rounded-t-lg overflow-hidden">
                          <img
                            src={
                              topic.thumbnails[0] ||
                              "https://via.placeholder.com/300x169"
                            }
                            alt={topic.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-transparent"></div>
                          <div className="absolute bottom-2 left-2 bg-black/60 text-xs text-white px-2 py-1 rounded-md flex items-center">
                            {topic.platform === "youtube" && (
                              <FaYoutube className="mr-1 text-red-500" />
                            )}
                            {formatNumber(topic.views)} views
                          </div>
                        </div>
                        <div className="p-3">
                          <h3 className="text-sm font-medium text-gray-200 line-clamp-2 group-hover:text-indigo-300 transition-colors duration-200">
                            {topic.title}
                          </h3>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Section - Analysis Area */}
          <div
            className={`w-full ${
              showSidebar ? "md:w-2/3 lg:w-3/4" : "w-full"
            } flex flex-col h-screen overflow-y-auto`}
          >
            {/* Introduction Banner - Only shown when no content is generated */}
            {!isLoading && !generatedContent && !error && (
              <div className="bg-gradient-to-r from-indigo-900/60 to-purple-900/60 p-6 mb-6">
                <div className="max-w-4xl mx-auto">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    AI Content Generation
                  </h2>
                  <p className="text-gray-300 mb-4">
                    Create high-performing content based on trending topics
                    across YouTube, Twitter, and Reddit.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="bg-indigo-800/30 p-4 rounded-lg border border-indigo-500/30">
                      <div className="text-indigo-400 mb-2 flex items-center">
                        <HiLightBulb className="mr-2" /> Content Ideas
                      </div>
                      <p className="text-sm text-gray-300">
                        Generate optimized content titles, scripts, and
                        strategies based on any topic
                      </p>
                    </div>

                    <div className="bg-indigo-800/30 p-4 rounded-lg border border-indigo-500/30">
                      <div className="text-indigo-400 mb-2 flex items-center">
                        <HiTag className="mr-2" /> SEO Optimization
                      </div>
                      <p className="text-sm text-gray-300">
                        Get recommended tags and keywords to maximize your
                        content's reach
                      </p>
                    </div>

                    <div className="bg-indigo-800/30 p-4 rounded-lg border border-indigo-500/30">
                      <div className="text-indigo-400 mb-2 flex items-center">
                        <HiChartBar className="mr-2" /> Trending Analytics
                      </div>
                      <p className="text-sm text-gray-300">
                        Browse trending topics and get AI-powered content
                        suggestions for maximum engagement
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Content Area */}
            <div className="flex-1 p-4 md:p-6 pb-32">
              {/* Shows generated content results */}
              {isLoading ? (
                <div className="flex items-center justify-center h-64 md:h-96">
                  <div className="relative flex flex-col items-center gap-4 text-center">
                    <div className="relative">
                      <div className="w-16 h-16 border-4 border-indigo-600/20 border-t-indigo-600 rounded-full animate-spin"></div>
                      <div className="absolute inset-0 w-10 h-10 m-auto border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin animate-delay-150"></div>
                    </div>
                    <div>
                      <p className="text-indigo-400 font-medium">
                        Generating content
                      </p>
                      <p className="text-gray-400 text-sm mt-1">
                        Creating optimized content for your topic...
                      </p>
                    </div>
                  </div>
                </div>
              ) : error && !generatedContent ? (
                <div className="flex items-center justify-center h-64 md:h-96">
                  <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-8 border border-red-500/30 max-w-md text-center">
                    <div className="text-red-400 text-5xl mb-4">⚠️</div>
                    <h3 className="text-xl font-bold text-gray-200 mb-2">
                      Generation Failed
                    </h3>
                    <p className="text-gray-400 mb-4">{error}</p>
                    <button
                      onClick={() => window.location.reload()}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors"
                    >
                      Try Again
                    </button>
                  </div>
                </div>
              ) : generatedContent ? (
                <div className="space-y-6 pb-4 max-w-4xl mx-auto">
                  {/* Title Section */}
                  <div className="bg-gradient-to-r from-indigo-900/60 to-purple-900/60 backdrop-blur-md rounded-xl p-6 border border-indigo-500/30 shadow-lg">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <h3 className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
                        Content Title
                      </h3>
                      <span className="text-xs text-gray-400">
                        Topic: "{generatedContent.query}"
                      </span>
                    </div>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-100 mt-2 leading-tight">
                      {generatedContent.title}
                    </h2>

                    {/* Sentiment Meter */}
                    <div className="mt-4 pt-4 border-t border-indigo-600/30">
                      <h4 className="text-xs font-semibold text-indigo-400 uppercase tracking-wider flex items-center mb-2">
                        <HiChartBar className="mr-1" /> Engagement Prediction
                      </h4>
                      <div className="flex h-4 rounded-full overflow-hidden">
                        <div
                          className="bg-green-500/80"
                          style={{
                            width: `${generatedContent.sentiment.positive}%`,
                          }}
                          title={`Positive: ${Math.round(
                            generatedContent.sentiment.positive
                          )}%`}
                        ></div>
                        <div
                          className="bg-blue-400/80"
                          style={{
                            width: `${generatedContent.sentiment.neutral}%`,
                          }}
                          title={`Neutral: ${Math.round(
                            generatedContent.sentiment.neutral
                          )}%`}
                        ></div>
                        <div
                          className="bg-red-500/80"
                          style={{
                            width: `${generatedContent.sentiment.negative}%`,
                          }}
                          title={`Negative: ${Math.round(
                            generatedContent.sentiment.negative
                          )}%`}
                        ></div>
                      </div>
                      <div className="flex justify-between mt-1 text-xs text-gray-400">
                        <span>
                          Positive:{" "}
                          {Math.round(generatedContent.sentiment.positive)}%
                        </span>
                        <span>
                          Neutral:{" "}
                          {Math.round(generatedContent.sentiment.neutral)}%
                        </span>
                        <span>
                          Negative:{" "}
                          {Math.round(generatedContent.sentiment.negative)}%
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* SEO Tags Section */}
                    <div className="bg-gray-800/60 backdrop-blur-md rounded-xl p-6 border border-indigo-600/30 shadow-lg">
                      <h3 className="text-sm font-semibold text-indigo-400 uppercase tracking-wider flex items-center mb-4">
                        <HiTag className="mr-1" /> Recommended Tags
                      </h3>
                      <div className="flex flex-wrap gap-2 max-h-60 overflow-y-auto custom-scrollbar">
                        {generatedContent.seoTags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-indigo-900/50 text-indigo-300 text-sm rounded-full border border-indigo-500/30 hover:border-indigo-400 transition-colors cursor-default"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Thumbnails Section */}
                    <div className="bg-gray-800/60 backdrop-blur-md rounded-xl p-6 border border-indigo-600/30 shadow-lg">
                      <h3 className="text-sm font-semibold text-indigo-400 uppercase tracking-wider mb-4">
                        Visual Recommendations
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        {generatedContent.thumbnails &&
                        generatedContent.thumbnails.length > 0 ? (
                          generatedContent.thumbnails.map((thumb, index) => (
                            <div
                              key={index}
                              className="relative aspect-video rounded-lg overflow-hidden border border-indigo-600/30 group"
                            >
                              <img
                                src={thumb}
                                alt={`Thumbnail ${index + 1}`}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                loading="lazy"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="absolute bottom-2 left-2 text-xs bg-black/70 px-2 py-1 rounded">
                                  Option {index + 1}
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="col-span-2 flex items-center justify-center h-32 border border-dashed border-indigo-600/30 rounded-lg">
                            <p className="text-gray-500 text-sm">
                              No thumbnails available
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Content Script */}
                  <div className="bg-gray-800/60 backdrop-blur-md rounded-xl p-6 border border-indigo-600/30 shadow-lg">
                    <h3 className="text-sm font-semibold text-indigo-400 uppercase tracking-wider flex items-center mb-4">
                      <HiLightBulb className="mr-1" /> Content Script
                    </h3>
                    <div className="bg-gray-900/50 rounded-lg p-4 border border-indigo-600/20">
                      <p className="text-gray-300 text-sm whitespace-pre-line max-h-96 overflow-y-auto custom-scrollbar leading-relaxed">
                        {generatedContent.script}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-64 md:h-96">
                  <div className="max-w-md text-center space-y-4">
                    <div className="text-5xl mb-4">🔍</div>
                    <h3 className="text-xl font-bold text-gray-200">
                      Ready to create amazing content?
                    </h3>
                    <p className="text-gray-400">
                      Select a trending topic from the left or enter your own
                      topic below.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Search Input - Fixed at Bottom with margin */}
            <div className="sticky bottom-0 z-30 bg-gray-800/90 backdrop-blur-md border-t border-indigo-600/30 p-4 mb-6 md:mb-8">
              <form
                onSubmit={handleSubmit}
                className="flex items-center gap-3 max-w-4xl mx-auto"
              >
                <div className="relative flex-1">
                  <input
                    type="text"
                    className="w-full p-3 pl-10 pr-12 bg-gray-900/80 border border-indigo-600/50 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all duration-200"
                    placeholder="Enter a topic to generate content..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  />
                  <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  {input && (
                    <button
                      type="button"
                      className="absolute right-12 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                      onClick={() => setInput("")}
                    >
                      ✕
                    </button>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-indigo-700/50 disabled:text-gray-300 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-2 flex-shrink-0"
                >
                  {isLoading ? (
                    <svg
                      className="animate-spin h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                  ) : (
                    <>
                      <span className="hidden sm:inline">Generate</span>
                      <FaPaperPlane />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
