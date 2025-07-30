import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";
import Spinner from "../Spinner";
import { useTheme } from "../../context/ThemeContext";
import { useState, useRef } from "react";

const TrendingSlider = () => {
  const { theme } = useTheme();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hoveredSlide, setHoveredSlide] = useState(null);
  const sliderRef = useRef(null);

  const { data: tendingArticles = [], isLoading } = useQuery({
    queryKey: ["trending articles"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/top-articles");
      if (data) return data;
      return [];
    },
  });

  const formatViews = (views) => {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return views?.toString() || "0";
  };

  const CustomArrow = ({ className, style, onClick, direction }) => (
    <div
      className={`absolute top-1/2 transform -translate-y-1/2 z-20 cursor-pointer transition-all duration-500 hover:scale-110 ${
        direction === "next" ? "right-6" : "left-6"
      }`}
      onClick={onClick}
    >
      <div
        className={`w-16 h-16 rounded-full backdrop-blur-xl border-2 flex items-center justify-center transition-all duration-500 hover:shadow-2xl ${
          theme === "dark"
            ? "bg-slate-900/80 border-slate-600/50 hover:bg-slate-800/90 hover:border-blue-400/70"
            : "bg-white/90 border-slate-200/50 hover:bg-white hover:border-blue-500/70"
        } shadow-xl hover:shadow-blue-500/25`}
      >
        <svg
          className={`w-6 h-6 transition-colors duration-300 ${
            theme === "dark"
              ? "text-slate-300 hover:text-blue-400"
              : "text-slate-600 hover:text-blue-600"
          }`}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d={
              direction === "next"
                ? "M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"
                : "M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"
            }
          />
        </svg>
      </div>
    </div>
  );

  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000, // Auto-advance every 4 seconds
    pauseOnHover: true,
    pauseOnFocus: true,
    pauseOnDotsHover: false,
    fade: false,
    cssEase: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    nextArrow: <CustomArrow direction="next" />,
    prevArrow: <CustomArrow direction="prev" />,
    beforeChange: (current, next) => setCurrentSlide(next),
    swipe: true,
    swipeToSlide: true,
    touchMove: true,
    draggable: true,
    accessibility: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          autoplay: true,
          autoplaySpeed: 4000,
        },
      },
    ],
  };

  if (isLoading) return <Spinner />;

  return (
    <section
      className={`relative overflow-hidden transition-all duration-700 ${
        theme === "dark"
          ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
          : "bg-gradient-to-br from-slate-50 via-white to-slate-100"
      }`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, ${
              theme === "dark" ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.1)"
            } 1px, transparent 0)`,
            backgroundSize: "24px 24px",
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto py-16 px-4 relative">
        {/* Premium Header */}
        <div className="text-center mb-16 relative">
          <div className="inline-flex items-center gap-4 mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-2xl blur-lg opacity-75 animate-pulse"></div>
              <div className="relative bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-4 shadow-2xl">
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.28 2.74-.46 3.61-.85.9-2.11 1.35-3.25 1.35z" />
                </svg>
              </div>
            </div>
            <div className="text-left">
              <h2
                className={`text-5xl font-black tracking-tight bg-gradient-to-r ${
                  theme === "dark"
                    ? "from-white via-slate-200 to-slate-400"
                    : "from-slate-900 via-slate-700 to-slate-500"
                } bg-clip-text text-transparent`}
              >
                TRENDING
              </h2>
              <p
                className={`text-lg font-medium mt-1 ${
                  theme === "dark" ? "text-slate-400" : "text-slate-600"
                }`}
              >
                Most Popular Articles Right Now
              </p>
            </div>
          </div>

          {/* Progress Indicators with Auto-play Animation */}
          <div className="flex justify-center gap-2 mb-8">
            {tendingArticles.map((_, index) => (
              <button
                key={index}
                onClick={() => sliderRef.current?.slickGoTo(index)}
                className={`h-1 rounded-full transition-all duration-500 relative overflow-hidden ${
                  currentSlide === index
                    ? "w-16 bg-gradient-to-r from-blue-500 to-purple-500"
                    : `w-6 ${
                        theme === "dark" ? "bg-slate-700" : "bg-slate-300"
                      }`
                } hover:scale-110`}
              >
                {/* Auto-play progress animation */}
                {currentSlide === index && (
                  <div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-300 to-purple-300 opacity-70"
                    style={{
                      animation: "progressFill 4s linear infinite",
                      width: "0%",
                    }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Advanced Slider */}
        <div className="relative">
          <Slider {...settings} ref={sliderRef}>
            {tendingArticles.map((article, index) => (
              <div key={article.id} className="px-6">
                <div
                  className={`relative overflow-hidden transition-all duration-700 ${
                    theme === "dark"
                      ? "bg-gradient-to-br from-slate-800/90 to-slate-900/90"
                      : "bg-gradient-to-br from-white to-slate-50/80"
                  } backdrop-blur-xl border ${
                    theme === "dark"
                      ? "border-slate-700/50"
                      : "border-slate-200/50"
                  } shadow-2xl hover:shadow-3xl rounded-3xl group`}
                  style={{
                    minHeight: "600px",
                    boxShadow:
                      theme === "dark"
                        ? "0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.05)"
                        : "0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05)",
                  }}
                  onMouseEnter={() => setHoveredSlide(index)}
                  onMouseLeave={() => setHoveredSlide(null)}
                >
                  {/* Main Content Grid */}
                  <div className="grid lg:grid-cols-2 gap-0 h-full">
                    {/* Image Section */}
                    <div className="relative overflow-hidden lg:order-1">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        style={{ minHeight: "400px" }}
                      />

                      {/* Gradient Overlays */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent lg:from-transparent lg:to-black/60"></div>

                      {/* Floating Elements */}
                      <div className="absolute top-6 left-6 flex flex-wrap gap-3">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg backdrop-blur-sm animate-pulse">
                          <span className="w-2 h-2 bg-white rounded-full animate-ping"></span>
                          TRENDING NOW
                        </span>
                      </div>

                      <div className="absolute top-6 right-6">
                        <div
                          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold backdrop-blur-md ${
                            theme === "dark"
                              ? "bg-slate-900/80 text-slate-200 border border-slate-600/50"
                              : "bg-white/80 text-slate-700 border border-white/50"
                          } shadow-xl`}
                        >
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path
                              fillRule="evenodd"
                              d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {formatViews(article.views)} views
                        </div>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="flex flex-col justify-center p-8 lg:p-12 lg:order-2 relative">
                      {/* Publisher Info */}
                      <div className="flex items-center gap-4 mb-6">
                        <div className="relative">
                          <div
                            className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-black shadow-lg ${
                              theme === "dark"
                                ? "bg-gradient-to-br from-blue-600 to-purple-600 text-white"
                                : "bg-gradient-to-br from-blue-500 to-purple-500 text-white"
                            }`}
                          >
                            {article.publisher?.charAt(0)?.toUpperCase() || "A"}
                          </div>
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
                        </div>
                        <div>
                          <p
                            className={`text-lg font-bold ${
                              theme === "dark"
                                ? "text-slate-200"
                                : "text-slate-800"
                            }`}
                          >
                            {article.publisher}
                          </p>
                          <p
                            className={`text-sm ${
                              theme === "dark"
                                ? "text-slate-400"
                                : "text-slate-500"
                            }`}
                          >
                            Verified Publisher
                          </p>
                        </div>
                      </div>

                      {/* Title */}
                      <h3
                        className={`text-3xl lg:text-4xl font-black leading-tight mb-6 transition-all duration-500 ${
                          theme === "dark"
                            ? "text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text"
                            : "text-slate-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text"
                        }`}
                      >
                        {article.title}
                      </h3>

                      {/* Description */}
                      <p
                        className={`text-lg leading-relaxed mb-8 ${
                          theme === "dark" ? "text-slate-300" : "text-slate-600"
                        }`}
                      >
                        Discover the latest insights and trends that are shaping
                        our world. This comprehensive article delivers expert
                        analysis and breaking news.
                      </p>

                      {/* Action Button */}
                      <Link
                        to={`/article/${article._id}`}
                        className={`group/btn inline-flex items-center gap-4 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 ${
                          theme === "dark"
                            ? "bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 hover:from-blue-500 hover:via-purple-500 hover:to-blue-600 text-white shadow-2xl hover:shadow-blue-500/50"
                            : "bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 hover:from-blue-500 hover:via-purple-500 hover:to-blue-600 text-white shadow-2xl hover:shadow-blue-500/30"
                        } shadow-2xl hover:shadow-3xl relative overflow-hidden`}
                      >
                        <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></span>
                        <span className="relative z-10">Read Full Article</span>
                        <svg
                          className="w-6 h-6 transition-transform duration-500 group-hover/btn:translate-x-2 group-hover/btn:scale-110 relative z-10"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z" />
                        </svg>
                      </Link>

                      {/* Decorative Elements */}
                      <div className="absolute top-4 right-4 opacity-10">
                        <svg
                          className="w-32 h-32"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Hover Effect Border */}
                  <div
                    className={`absolute inset-0 rounded-3xl transition-all duration-700 pointer-events-none ${
                      hoveredSlide === index
                        ? "ring-4 ring-blue-500/50 ring-opacity-75"
                        : ""
                    }`}
                  ></div>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* Bottom Navigation */}
        <div className="flex justify-center mt-12">
          <div className="flex items-center gap-6">
            <button
              onClick={() => sliderRef.current?.slickPrev()}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                theme === "dark"
                  ? "bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-600"
                  : "bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border border-slate-200 shadow-lg"
              } hover:scale-105 hover:shadow-xl`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" />
              </svg>
              Previous
            </button>

            <div
              className={`px-4 py-2 rounded-lg font-medium ${
                theme === "dark" ? "text-slate-400" : "text-slate-600"
              }`}
            >
              {currentSlide + 1} of {tendingArticles.length}
            </div>

            <button
              onClick={() => sliderRef.current?.slickNext()}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                theme === "dark"
                  ? "bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-600"
                  : "bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border border-slate-200 shadow-lg"
              } hover:scale-105 hover:shadow-xl`}
            >
              Next
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Custom CSS for enhanced effects */}
      <style jsx>{`
        .slick-track {
          display: flex;
          align-items: stretch;
        }
        .slick-slide {
          transition: all 0.3s ease;
        }
        .slick-current .slick-slide > div {
          transform: scale(1);
        }
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        @keyframes progressFill {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }
        .hover\\:shadow-3xl:hover {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25),
            0 0 0 1px rgba(255, 255, 255, 0.05);
        }
        /* Ensure autoplay works by preventing interference */
        .slick-slider {
          position: relative;
        }
        .slick-list {
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default TrendingSlider;
