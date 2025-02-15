import { useState, useEffect } from "react";
import { FaPaperPlane, FaFire, FaChevronRight } from "react-icons/fa";
import Carousel from "react-multi-carousel";
import axios from "axios";
import "react-multi-carousel/lib/styles.css";

const API_KEY = "AIzaSyCHUfKUWyvMckHryTVj8lx6xRsoBog0M-Y";
const SEARCH_URL = "https://www.googleapis.com/youtube/v3/search";
const VIDEO_DETAILS_URL = "https://www.googleapis.com/youtube/v3/videos";

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
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [aiGeneratedData, setAiGeneratedData] = useState(null);
  const [input, setInput] = useState("");
  const [generatedContent, setGeneratedContent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTrendingTopics = async () => {
      try {
        const searchParams = {
          part: "snippet",
          q: "technology",
          key: API_KEY,
          maxResults: 5,
          type: "video",
        };

        const searchResponse = await axios.get(SEARCH_URL, {
          params: searchParams,
        });
        const videos = searchResponse.data.items;

        if (!videos.length) {
          console.log("No results found.");
          return;
        }

        let topics = [];

        for (let video of videos) {
          const videoId = video.id.videoId;
          const thumbnailUrl = video.snippet.thumbnails.high.url;
          const title = video.snippet.title;
          const tags = await fetchVideoTags(videoId);

          topics.push({
            id: videoId,
            title,
            analysis: "",
            reach: "Unknown",
            thumbnails: [thumbnailUrl],
            tags,
          });
        }

        setTrendingTopics(topics);
      } catch (error) {
        console.error(
          "Error fetching videos:",
          error.response?.data || error.message
        );
      }
    };

    const fetchVideoTags = async (videoId) => {
      try {
        const videoParams = {
          part: "snippet",
          id: videoId,
          key: API_KEY,
        };

        const response = await axios.get(VIDEO_DETAILS_URL, {
          params: videoParams,
        });
        const videoData = response.data.items[0];

        return videoData?.snippet?.tags || ["No tags found"];
      } catch (error) {
        console.error(
          `Error fetching tags for video ${videoId}:`,
          error.response?.data || error.message
        );
        return ["No tags found"];
      }
    };

    fetchTrendingTopics();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    try {
      // Simulate API call - Replace with your actual API call
      const mockResponse = {
        title: `AI Suggested: ${input}`,
        seoTags: ["technology", "trending", "innovation", input.toLowerCase()],
        thumbnails: [
          "https://picsum.photos/seed/1/800/400",
          "https://picsum.photos/seed/2/800/400",
        ],
        script: `Content Strategy for "${input}"\n\nTarget Audience Analysis:\n- Primary demographic: Tech enthusiasts aged 18-34\n- Interest in emerging technologies\n\nRecommended Approach:\n- Focus on practical demonstrations\n- Include market analysis\n- Highlight key innovations\n- Compare with existing solutions`
      };

      setGeneratedContent(mockResponse);
    } catch (error) {
      console.error("Error generating content:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const responsiveCarousel = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  return (
    <>
      <style>{scrollbarStyles}</style>
      <div className="flex flex-row min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 text-gray-900">
        {/* Left Section - Trending Topics */}
        <div className="w-1/3 bg-white shadow-lg border-r border-gray-200 h-screen sticky top-0 left-0">
          <div className="p-6 pb-4 border-b border-gray-100 bg-white sticky top-0 z-10">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
              <FaFire className="text-orange-500 text-3xl" />
              Trending Topics
            </h2>
            <p className="text-sm text-gray-500 mt-2">Get inspired by what's trending</p>
          </div>
          
          <div className="h-[calc(100vh-100px)] overflow-y-auto custom-scrollbar">
            <div className="space-y-4 p-4">
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
                  <h3 className="font-medium text-gray-800 line-clamp-2">{topic.title}</h3>
                </div>
              ))}
            </div>
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

                {/* SEO Tags and Thumbnails Grid */}
                <div className="grid grid-cols-2 gap-6">
                  {/* SEO Tags */}
                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h3 className="text-sm font-semibold text-gray-600 uppercase mb-4 flex items-center gap-2">
                      <span className="w-8 h-[2px] bg-blue-500"></span>
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
                    <h3 className="text-sm font-semibold text-gray-600 uppercase mb-4 flex items-center gap-2">
                      <span className="w-8 h-[2px] bg-blue-500"></span>
                      Suggested Thumbnails
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      {generatedContent.thumbnails.map((thumb, index) => (
                        <div key={index} className="relative aspect-video rounded-lg overflow-hidden">
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

                {/* Content Strategy */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <h3 className="text-sm font-semibold text-gray-600 uppercase mb-4 flex items-center gap-2">
                    <span className="w-8 h-[2px] bg-blue-500"></span>
                    Content Strategy
                  </h3>
                  <div className="prose max-w-none p-6 bg-gray-50 rounded-xl border border-gray-200 whitespace-pre-wrap">
                    {generatedContent.script}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-[calc(100vh-120px)]">
                <div className="text-center max-w-md">
                  <FaFire className="text-6xl text-orange-400 mx-auto mb-6 animate-pulse" />
                  <h3 className="text-2xl font-bold text-gray-700 mb-4">
                    Generate Your Content
                  </h3>
                  <p className="text-gray-500 leading-relaxed">
                    Enter your topic below to get AI-generated content suggestions, SEO tags, and thumbnails
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Input Section - Fixed at Bottom */}
          <div className="fixed bottom-0 right-0 w-2/3 bg-white border-t border-gray-200 p-6 shadow-lg backdrop-blur-sm backdrop-filter">
            <form onSubmit={handleSubmit} className="flex gap-3">
              <input
                type="text"
                className="flex-1 p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 transition-all duration-200"
                placeholder="Enter your topic (e.g., 'AI in Healthcare', 'Web3 Development')"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button 
                type="submit"
                disabled={isLoading}
                className="px-6 py-4 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 flex items-center gap-2"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span className="hidden sm:inline">Generate</span>
                    <FaPaperPlane className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
