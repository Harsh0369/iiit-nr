import { useState, useEffect } from "react";
import { FaPaperPlane, FaFire, FaChevronRight } from "react-icons/fa";
import Carousel from "react-multi-carousel";
import axios from "axios";
import "react-multi-carousel/lib/styles.css";

const API_KEY = "AIzaSyCHUfKUWyvMckHryTVj8lx6xRsoBog0M-Y";
const SEARCH_URL = "https://www.googleapis.com/youtube/v3/search";
const VIDEO_DETAILS_URL = "https://www.googleapis.com/youtube/v3/videos";

export default function TrendingPage() {
  const [trendingTopics, setTrendingTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [aiGeneratedData, setAiGeneratedData] = useState(null);
  const [input, setInput] = useState("");

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

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
    setAiGeneratedData({
      title: `Optimized: ${topic.title}`,
      seoTags: topic.tags,
      script:
        "AI-generated insights about the topic...\n\nHere's a detailed analysis of current trends in the selected category. The target audience appears to be primarily tech enthusiasts aged 18-34. Recommended content strategy:\n- Focus on practical demonstrations\n- Include comparison with competitors\n- Use trending hashtags: #TechUpdate #Innovation\n- Optimal video length: 8-12 minutes",
      thumbnails: topic.thumbnails,
    });
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
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 text-gray-900 p-4 gap-4">
      {/* Left Section - Trending Topics */}
      <div className="w-full md:w-1/3 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 pb-4">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <FaFire className="text-orange-500" />
            Trending Topics
          </h2>
          <p className="text-sm text-gray-500 mt-1">Latest tech trends</p>
        </div>
        <ul className="space-y-2 p-4">
          {trendingTopics.map((topic) => (
            <li
              key={topic.id}
              className={`group p-4 rounded-lg transition-all duration-200 cursor-pointer ${
                selectedTopic?.id === topic.id
                  ? "bg-blue-50 border-2 border-blue-200"
                  : "hover:bg-gray-50 border-2 border-transparent"
              }`}
              onClick={() => handleTopicSelect(topic)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0">
                      <img
                        src={topic.thumbnails[0]}
                        alt="Thumbnail"
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base font-semibold text-gray-800 truncate">
                        {topic.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="inline-flex items-center px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">
                          <FaFire className="mr-1" />
                          Trending
                        </span>
                        <span className="text-xs text-gray-500">
                          {topic.reach}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <FaChevronRight
                  className={`ml-2 flex-shrink-0 text-gray-400 group-hover:text-blue-500 ${
                    selectedTopic?.id === topic.id ? "text-blue-500" : ""
                  }`}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Right Section - AI Output */}
      <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col">
        {!selectedTopic ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8">
            <div className="text-center max-w-md">
              <FaFire className="text-4xl text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-500 mb-2">
                Select a Trending Topic
              </h3>
              <p className="text-gray-400">
                Choose from the trending topics on the left to view AI-generated
                content strategies and optimization tips.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800">
                {aiGeneratedData.title}
              </h2>
            </div>

            <div className="flex-1 overflow-auto p-6 space-y-6">
              {/* SEO Tags Section */}
              <div>
                <h3 className="text-sm font-semibold text-gray-600 uppercase mb-3">
                  SEO Tags & Keywords
                </h3>
                <div className="flex flex-wrap gap-2">
                  {aiGeneratedData.seoTags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Content Script Section */}
              <div>
                <h3 className="text-sm font-semibold text-gray-600 uppercase mb-3">
                  Content Strategy
                </h3>
                <div className="prose max-w-none p-4 bg-gray-50 rounded-lg border border-gray-200 whitespace-pre-wrap">
                  {aiGeneratedData.script}
                </div>
              </div>

              {/* Thumbnail Carousel */}
              <div>
                <h3 className="text-sm font-semibold text-gray-600 uppercase mb-3">
                  Recommended Thumbnails
                </h3>
                <Carousel
                  responsive={responsiveCarousel}
                  infinite
                  autoPlaySpeed={3000}
                  customTransition="transform 300ms ease-in-out"
                  containerClass="gap-2"
                  itemClass="p-1"
                  className="py-2"
                >
                  {aiGeneratedData.thumbnails.map((thumb, index) => (
                    <div
                      key={index}
                      className="relative aspect-video overflow-hidden rounded-xl border border-gray-200 hover:border-blue-200 transition-all"
                    >
                      <img
                        src={thumb}
                        alt="Thumbnail"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <span className="absolute bottom-2 left-2 text-white text-xs font-medium">
                        Preview {index + 1}
                      </span>
                    </div>
                  ))}
                </Carousel>
              </div>
            </div>

            {/* AI Chat Input */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ask AI to modify content (e.g., 'Make it more engaging for beginners...')"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <button className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                  <FaPaperPlane className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
