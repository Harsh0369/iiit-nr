import { useState, useEffect } from "react";
import { FaPaperPlane, FaFire } from "react-icons/fa";
import axios from "axios";
import "react-multi-carousel/lib/styles.css";

// API Endpoints
const SEARCH_URL =
  "https://iiitnayaraipur-hackathon-backend-1.onrender.com/api/v1/trendAnalysis/trendingTopics";
const AI_ANALYSIS_URL =
  "https://iiitnayaraipur-hackathon-backend-1.onrender.com/api/v1/trendAnalysis/fetchAIAnalysis";
const SEO_THUMBNAILS_URL =
  "https://iiitnayaraipur-hackathon-backend-1.onrender.com/api/v1/trendAnalysis/fetchSeoThumbnails";

// Custom scrollbar styles
const scrollbarStyles = `
  .custom-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: #CBD5E1 transparent;
  }
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: #CBD5E1;
    border-radius: 20px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background-color: #94A3B8;
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
        //const response = await axios.get(SEARCH_URL);
        console.log("API Response:", response.data);

        const videos = response.data?.ytTopics || [];
        const topics = videos.map((video) => ({
          id: Math.random().toString(36).substring(2, 9),
          title: video.title || "No Title",
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
      const response = await axios.post(AI_ANALYSIS_URL, { topic: input });
      const seoResponse = await axios.post(SEO_THUMBNAILS_URL, {
        topic: input,
      });

      console.log("AI Analysis Response:", response.data);
      console.log("SEO Thumbnails Response:", seoResponse.data);

      // Parsing AI response safely
      const aiData = response.data.aIRecommendations.response;
      const jsonMatch = aiData.match(/```json\n([\s\S]*?)\n```/);
      const parsedData = jsonMatch ? JSON.parse(jsonMatch[1]) : {};

      setGeneratedContent({
        title: parsedData.recommended_title || "Generated Title",
        seoTags: Array.isArray(parsedData.tags) ? parsedData.tags : [],
        thumbnails: Array.isArray(seoResponse.data.thumbnails)
          ? seoResponse.data.thumbnails
          : [],
        script: parsedData.script || "No script generated.",
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
      <div className="flex flex-row min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 text-gray-900">
        {/* Left Section - Trending Topics */}
        <div className="w-1/3 bg-white shadow-lg border-r border-gray-200 h-screen sticky top-0 left-0">
          <div className="p-6 border-b border-gray-100 bg-white sticky top-0 z-9">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3 mt-10">
              <FaFire className="text-orange-500 text-3xl" />
              Trending Topics
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Get inspired by what's trending
            </p>
          </div>

          <div className="h-[calc(100vh-100px)] overflow-y-auto custom-scrollbar p-4">
            {trendingTopics.map((topic) => (
              <div
                key={topic.id}
                className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-all duration-300"
              >
                <div className="relative aspect-video mb-3 rounded-lg overflow-hidden">
                  <img
                    src={topic.thumbnails[0]}
                    alt={topic.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-medium text-gray-800 line-clamp-2">
                  {topic.title}
                </h3>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section - Content Generator */}
        <div className="flex-1 min-h-screen relative">
          <div className="p-6 pb-24 custom-scrollbar">
            {generatedContent ? (
              <div className="space-y-6">
                {/* Title */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {generatedContent.title}
                  </h2>
                </div>

                {/* SEO Tags and Thumbnails */}
                <div className="grid grid-cols-2 gap-6">
                  {/* SEO Tags */}
                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h3 className="text-sm font-semibold text-gray-600 uppercase mb-4">
                      SEO Tags
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {generatedContent.seoTags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1.5 bg-blue-50 text-blue-700 text-sm rounded-full border border-blue-100"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Thumbnails */}
                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h3 className="text-sm font-semibold text-gray-600 uppercase mb-4">
                      Suggested Thumbnails
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      {generatedContent.thumbnails.map((thumb, index) => (
                        <div
                          key={index}
                          className="relative aspect-video rounded-lg overflow-hidden"
                        >
                          <img
                            src={thumb}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-[calc(100vh-120px)] mt-10">
                <p className="text-gray-500">
                  Enter a topic to generate content!
                </p>
              </div>
            )}
          </div>

          {/* Input Section */}
          <div className="fixed bottom-0 right-0 w-2/3 bg-white border-t border-gray-200 p-6 shadow-lg">
            <form onSubmit={handleSubmit} className="flex gap-3">
              <input
                type="text"
                className="flex-1 p-4 border border-gray-300 rounded-xl"
                placeholder="Enter your topic..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-4 bg-blue-500 text-white rounded-xl"
              >
                {isLoading ? "Loading..." : <FaPaperPlane />}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
