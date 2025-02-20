import { useState, useEffect } from "react";
import { FaPaperPlane, FaFire } from "react-icons/fa";
import axios from "axios";

// API Endpoints
const SEARCH_URL =
  "https://iiitnayaraipur-hackathon-backend-1.onrender.com/api/v1/trendAnalysis/trendingTopics";
const AI_ANALYSIS_URL =
  "https://iiitnayaraipur-hackathon-backend-1.onrender.com/api/v1/trendAnalysis/fetchAIAnalysis";
const SEO_THUMBNAILS_URL =
  "https://iiitnayaraipur-hackathon-backdrop-1.onrender.com/api/v1/trendAnalysis/fetchSeoThumbnails";

// Custom scrollbar styles
const scrollbarStyles = `
  .custom-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: #475569 transparent;
  }
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: #475569;
    border-radius: 20px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background-color: #64748b;
  }
`;

export default function TrendingPage() {
  const [trendingTopics, setTrendingTopics] = useState([]);
  const [input, setInput] = useState("");
  const [generatedContent, setGeneratedContent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTrendingTopics = async () => {
      try {
        const response = await axios.get(SEARCH_URL);
        const videos = response.data?.ytTopics || [];
        const topics = videos.map((video) => ({
          id: Math.random().toString(36).substring(2, 9),
          title: video.title || "Untitled Topic",
          thumbnails: video.thumbnail ? [video.thumbnail] : [],
        }));
        setTrendingTopics(topics);
      } catch (error) {
        console.error("Error fetching trending topics:", error);
      }
    };
    fetchTrendingTopics();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    try {
      const [aiResponse, seoResponse] = await Promise.all([
        axios.post(AI_ANALYSIS_URL, { topic: input }),
        axios.post(SEO_THUMBNAILS_URL, { topic: input }),
      ]);

      const aiData = aiResponse.data.aIRecommendations.response;
      const jsonMatch = aiData.match(/```json\n([\s\S]*?)\n```/);
      const parsedData = jsonMatch ? JSON.parse(jsonMatch[1]) : {};

      const seoTags = seoResponse.data?.seoTags
        ? seoResponse.data.seoTags
            .flat()
            .filter((tag) => typeof tag === "string")
        : [];

      setGeneratedContent({
        title: parsedData.recommended_title || "Generated Title",
        seoTags,
        thumbnails: Array.isArray(seoResponse.data?.thumbnailLinks)
          ? seoResponse.data.thumbnailLinks.slice(0, 4)
          : [],
        script: parsedData.recommended_script || "No script generated.",
      });
    } catch (error) {
      console.error("Error generating content:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style>{scrollbarStyles}</style>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-900 text-gray-200 flex flex-col">
        {/* Main Content */}
        <div className="flex-1 flex flex-row max-w-[1600px] mx-auto w-full pt-20">
          {/* Left Sidebar - Trending Topics */}
          <div className="w-1/4 bg-gray-800/50 backdrop-blur-md border-r border-indigo-600/20 h-screen sticky top-20">
            <div className="p-6 border-b border-indigo-600/30">
              <h2 className="text-2xl font-bold flex items-center gap-2 bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                <FaFire className="text-orange-400" />
                Trending Now
              </h2>
              <p className="text-sm text-gray-400 mt-1">
                Explore what’s buzzing
              </p>
            </div>
            <div className="h-[calc(100vh-180px)] overflow-y-auto custom-scrollbar p-4 space-y-4">
              {trendingTopics.map((topic) => (
                <div
                  key={topic.id}
                  className="group bg-gray-800/70 rounded-lg border border-indigo-600/30 hover:border-cyan-500/50 transition-all duration-300 cursor-pointer"
                  onClick={() => setInput(topic.title)}
                >
                  <div className="relative aspect-video rounded-t-lg overflow-hidden">
                    <img
                      src={
                        topic.thumbnails[0] ||
                        "https://via.placeholder.com/300x169"
                      }
                      alt={topic.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm font-medium text-gray-200 line-clamp-2 group-hover:text-cyan-300 transition-colors duration-200">
                      {topic.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Section - Content Generator */}
          <div className="flex-1 p-6 flex flex-col">
            {/* Input Section - Moved to Top */}
            <div className="bg-gray-800/70 backdrop-blur-md rounded-xl p-4 mb-6 border border-indigo-600/30 shadow-lg sticky top-20 z-10">
              <form onSubmit={handleSubmit} className="flex gap-3 items-center">
                <input
                  type="text"
                  className="flex-1 p-3 bg-gray-900 border border-indigo-600/50 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-200"
                  placeholder="Enter a topic to analyze..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 disabled:bg-cyan-700/50 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-2 relative overflow-hidden group"
                >
                  <span className="relative z-10">
                    {isLoading ? (
                      <svg
                        className="animate-spin h-5 w-5 text-white"
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
                      <FaPaperPlane />
                    )}
                  </span>
                  <span className="absolute inset-0 bg-cyan-400 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                </button>
              </form>
            </div>

            {/* Generated Content */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              {isLoading ? (
                <div className="flex items-center justify-center min-h-[50vh]">
                  <div className="relative flex flex-col items-center gap-4">
                    <div className="relative">
                      <div className="w-16 h-16 border-4 border-cyan-500/20 rounded-full border-t-cyan-500 animate-spin" />
                      <div className="absolute inset-0 w-12 h-12 border-4 border-cyan-500/10 rounded-full border-t-cyan-500 animate-spin animate-reverse" />
                    </div>
                    <p className="text-cyan-300 text-sm animate-pulse">
                      Crunching the data...
                    </p>
                  </div>
                </div>
              ) : generatedContent ? (
                <div className="space-y-6 pb-6">
                  <div className="bg-gray-800/70 backdrop-blur-md rounded-xl p-6 border border-indigo-600/30 shadow-lg">
                    <h3 className="text-sm font-semibold text-cyan-400 uppercase mb-2">
                      Optimized Title
                    </h3>
                    <h2 className="text-2xl font-bold text-gray-100">
                      {generatedContent.title}
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-800/70 backdrop-blur-md rounded-xl p-6 border border-indigo-600/30 shadow-lg">
                      <h3 className="text-sm font-semibold text-cyan-400 uppercase mb-4">
                        Thumbnails
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        {generatedContent.thumbnails.map((thumb, index) => (
                          <div
                            key={index}
                            className="relative aspect-video rounded-lg overflow-hidden border border-indigo-600/20 group"
                          >
                            <img
                              src={thumb}
                              alt={`Thumbnail ${index + 1}`}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-gray-800/70 backdrop-blur-md rounded-xl p-6 border border-indigo-600/30 shadow-lg">
                      <h3 className="text-sm font-semibold text-cyan-400 uppercase mb-4">
                        SEO Tags
                      </h3>
                      <div className="flex flex-wrap gap-2 max-h-60 overflow-y-auto custom-scrollbar">
                        {generatedContent.seoTags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-cyan-900/50 text-cyan-300 text-sm rounded-full border border-cyan-500/30"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-800/70 backdrop-blur-md rounded-xl p-6 border border-indigo-600/30 shadow-lg">
                    <h3 className="text-sm font-semibold text-cyan-400 uppercase mb-4">
                      Content Script
                    </h3>
                    <p className="text-gray-300 text-sm whitespace-pre-line max-h-96 overflow-y-auto custom-scrollbar">
                      {generatedContent.script}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center min-h-[50vh]">
                  <p className="text-gray-400 text-lg">
                    Pick a topic from the left or type one above to analyze!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
