import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";
import { tagsQuery } from "../utils/helper";
import useAuth from "../hook/useAuth";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { useTheme } from "../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSearch,
  FiX,
  FiCheck,
  FiFilter,
  FiStar,
  FiBookmark,
  FiChevronDown,
} from "react-icons/fi";
import { RiArticleLine, RiHashtag } from "react-icons/ri";

const fetchArticles = async ({ queryKey }) => {
  const [_key, { search, publisher, selectedTags }] = queryKey;
  const tagQuery = selectedTags.join(",");
  const query = `search=${search}&publisher=${publisher}&tags=${tagQuery}`;
  const res = await axios.get(
    `https://chronicle-ink-full-stack-server.vercel.app/web/api/articles/approved?${query}`
  );
  return res.data;
};

const FilterPill = ({ label, onRemove }) => (
  <motion.div
    initial={{ scale: 0.9 }}
    animate={{ scale: 1 }}
    className="flex items-center bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm"
  >
    {label}
    <button
      onClick={onRemove}
      className="ml-2 p-0.5 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800/50"
    >
      <FiX className="w-3 h-3" />
    </button>
  </motion.div>
);

const ArticleCard = ({ article, user, navigate }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`relative rounded-2xl overflow-hidden border transition-all duration-300 shadow-lg ${
        article.isPremium
          ? "border-yellow-400 dark:border-yellow-500 bg-gradient-to-br from-yellow-50 via-white to-yellow-100 dark:from-yellow-900/30 dark:via-gray-800 dark:to-yellow-900/20"
          : "border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800"
      }`}
    >
      {article.isPremium && (
        <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg z-10">
          <FiStar className="w-3 h-3" />
          Premium
        </div>
      )}

      <div className="relative h-48 overflow-hidden group">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h2
            className={`text-lg font-bold ${
              article.isPremium
                ? "text-yellow-700 dark:text-yellow-400"
                : "text-gray-800 dark:text-white"
            }`}
          >
            {article.title}
          </h2>
          <span className="text-xs bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 px-2 py-1 rounded-full">
            {article.publisher}
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {article.tags.map((tag, i) => (
            <span
              key={i}
              className="text-[10px] bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-0.5 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>

        <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3 mb-4">
          {article.description}
        </p>

        <motion.button
          whileHover={{
            scale: article.isPremium && !user?.isPremiumTaken ? 1 : 1.03,
          }}
          whileTap={{
            scale: article.isPremium && !user?.isPremiumTaken ? 1 : 0.98,
          }}
          disabled={article.isPremium && !user?.isPremiumTaken}
          onClick={() => navigate(`/article/${article._id}`)}
          className={`w-full py-2.5 text-sm font-semibold rounded-lg transition-all ${
            article.isPremium && !user?.isPremiumTaken
              ? "bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-md"
          }`}
        >
          {article.isPremium && !user?.isPremiumTaken
            ? "🔒 Premium Required"
            : "Read Article →"}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default function AllArticles() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [search, setSearch] = useState("");
  const [publisher, setPublisher] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [tagSearch, setTagSearch] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: articles = [], isLoading } = useQuery({
    queryKey: ["articles", { search, publisher, selectedTags }],
    queryFn: fetchArticles,
  });

  const { data: publishers = [] } = useQuery({
    queryKey: ["publishers"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/publishers");
      if (data) return data;
      return [];
    },
  });

  const filteredTags = tagsQuery.filter((tag) =>
    tag.toLowerCase().includes(tagSearch.toLowerCase())
  );

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearch("");
    setPublisher("");
    setSelectedTags([]);
  };

  const hasFilters = search || publisher || selectedTags.length > 0;

  return (
    <div
      className={`min-h-screen py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
        isDark ? "bg-gray-900" : "bg-gradient-to-br from-blue-50 to-indigo-50"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1
            className={`text-3xl md:text-4xl font-bold mb-2 bg-clip-text ${
              isDark
                ? "text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
                : "text-transparent bg-gradient-to-r from-blue-600 to-indigo-700"
            }`}
          >
            All Article
          </h1>
          <p
            className={`text-lg ${isDark ? "text-gray-400" : "text-gray-600"}`}
          >
            Discover and explore curated articles
          </p>
        </motion.div>

        {/* Top Filter Bar */}
        <motion.div
          className={`rounded-xl p-6 mb-8 shadow-lg ${
            isDark ? "bg-gray-800" : "bg-white"
          }`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search Input */}
            <div className="relative">
              <label
                className={`block text-sm font-medium mb-1 ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Search Articles
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Enter keywords..."
                  className={`w-full pl-10 pr-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 ${
                    isDark
                      ? "bg-gray-700 border-gray-600 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                      : "border-gray-300 focus:ring-blue-500 focus:border-transparent"
                  }`}
                />
                <FiSearch
                  className={`absolute left-3 top-3 h-4 w-4 ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}
                />
              </div>
            </div>

            {/* Publisher Dropdown */}
            <div className="relative">
              <label
                className={`block text-sm font-medium mb-1 ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Publisher
              </label>
              <div className="relative">
                <select
                  value={publisher}
                  onChange={(e) => setPublisher(e.target.value)}
                  className={`w-full pl-3 pr-8 py-2.5 rounded-lg border appearance-none focus:outline-none focus:ring-2 ${
                    isDark
                      ? "bg-gray-700 border-gray-600 focus:ring-blue-500 focus:border-transparent text-white"
                      : "border-gray-300 focus:ring-blue-500 focus:border-transparent"
                  }`}
                >
                  <option value="">All Publishers</option>
                  {publishers.map((p) => (
                    <option key={p._id} value={p.name}>
                      {p.name}
                    </option>
                  ))}
                </select>
                <FiChevronDown
                  className={`absolute right-3 top-3 h-4 w-4 pointer-events-none ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}
                />
              </div>
            </div>

            {/* Active Filters Display */}
            <div className="flex flex-col">
              <label
                className={`text-sm font-medium mb-1 ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Active Filters
              </label>
              <div className="flex flex-wrap items-center gap-2 min-h-[42px]">
                {hasFilters ? (
                  <>
                    {search && (
                      <FilterPill
                        label={`Search: "${search}"`}
                        onRemove={() => setSearch("")}
                      />
                    )}
                    {publisher && (
                      <FilterPill
                        label={`Publisher: ${publisher}`}
                        onRemove={() => setPublisher("")}
                      />
                    )}
                    {selectedTags.map((tag) => (
                      <FilterPill
                        key={tag}
                        label={`Tag: ${tag}`}
                        onRemove={() => toggleTag(tag)}
                      />
                    ))}
                    <button
                      onClick={clearFilters}
                      className={`text-xs px-2 py-1 rounded ${
                        isDark
                          ? "text-blue-400 hover:text-blue-300"
                          : "text-blue-600 hover:text-blue-800"
                      }`}
                    >
                      Clear all
                    </button>
                  </>
                ) : (
                  <span
                    className={`text-sm ${
                      isDark ? "text-gray-500" : "text-gray-400"
                    }`}
                  >
                    No filters applied
                  </span>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Tags Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              className={`sticky top-6 rounded-xl shadow-lg overflow-hidden ${
                isDark ? "bg-gray-800" : "bg-white"
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div
                className={`p-5 border-b ${
                  isDark ? "border-gray-700" : "border-gray-200"
                }`}
              >
                <h3 className="text-lg font-bold flex items-center">
                  <RiHashtag className="mr-2 text-blue-500" />
                  Filter by Tags
                </h3>
              </div>

              <div className="p-5">
                <div className="relative mb-4">
                  <input
                    type="text"
                    value={tagSearch}
                    onChange={(e) => setTagSearch(e.target.value)}
                    placeholder="Search tags..."
                    className={`w-full pl-10 pr-4 py-2 rounded-lg text-sm ${
                      isDark
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                        : "bg-gray-50 border-gray-200"
                    }`}
                  />
                  <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
                </div>

                <div className="max-h-[400px] overflow-y-auto pr-2">
                  {filteredTags.map((tag) => {
                    const value = tag.toLowerCase();
                    const isSelected = selectedTags.includes(value);
                    return (
                      <motion.div
                        key={value}
                        whileHover={{ x: 5 }}
                        className="flex items-center py-2 px-1 rounded-lg cursor-pointer"
                        onClick={() => toggleTag(value)}
                      >
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center mr-3 transition-colors ${
                            isSelected
                              ? "bg-blue-600 text-white"
                              : isDark
                              ? "bg-gray-600 border border-gray-500"
                              : "bg-gray-200 border border-gray-300"
                          }`}
                        >
                          {isSelected && <FiCheck className="w-3 h-3" />}
                        </div>
                        <span
                          className={`text-sm ${
                            isSelected
                              ? "text-blue-600 dark:text-blue-400 font-medium"
                              : "text-gray-700 dark:text-gray-300"
                          }`}
                        >
                          {tag}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Articles Grid */}
          <div className="lg:col-span-3">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
                ></motion.div>
              </div>
            ) : articles.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6"
              >
                {articles.map((article) => (
                  <ArticleCard
                    key={article._id}
                    article={article}
                    user={user}
                    navigate={navigate}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`text-center py-16 rounded-xl ${
                  isDark ? "bg-gray-800" : "bg-white"
                }`}
              >
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <FiSearch className="w-12 h-12 text-blue-500" />
                </div>
                <h3
                  className={`text-xl font-medium ${
                    isDark ? "text-gray-300" : "text-gray-900"
                  }`}
                >
                  No articles found
                </h3>
                <p
                  className={`mt-2 max-w-md mx-auto ${
                    isDark ? "text-gray-500" : "text-gray-600"
                  }`}
                >
                  Try adjusting your search filters or browse our trending
                  articles
                </p>
                <button
                  onClick={clearFilters}
                  className={`mt-6 px-6 py-2 rounded-lg font-medium ${
                    isDark
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-blue-100 hover:bg-blue-200 text-blue-800"
                  }`}
                >
                  Reset Filters
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
