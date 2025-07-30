import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axiosInstance from "../../utils/axiosInstance";
import Spinner from "../Spinner";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import {
  FaEllipsisV,
  FaCheck,
  FaTimes,
  FaTrash,
  FaCrown,
} from "react-icons/fa";

export default function AllArticlesPage() {
  const [declineArticle, setDeclineArticle] = useState(null);
  const [declineReason, setDeclineReason] = useState("");
  const [page, setPage] = useState(1);
  const [expandedRow, setExpandedRow] = useState(null);
  const limit = 10;
  const { theme } = useTheme();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["all-articles", page],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/articles?page=${page}&limit=${limit}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  const articles = data?.articles || [];
  const totalPages = data?.totalPages || 1;

  const themeStyles = {
    light: {
      bg: "bg-gray-50",
      card: "bg-white",
      text: "text-gray-800",
      border: "border-gray-200",
      hover: "hover:bg-gray-100",
      button: {
        approve: "bg-green-500 hover:bg-green-600",
        decline: "bg-red-500 hover:bg-red-600",
        delete: "bg-gray-500 hover:bg-gray-600",
        premium: "bg-blue-500 hover:bg-yellow-600",
      },
    },
    dark: {
      bg: "bg-gray-900",
      card: "bg-gray-800",
      text: "text-gray-100",
      border: "border-gray-700",
      hover: "hover:bg-gray-700",
      button: {
        approve: "bg-green-600 hover:bg-green-700",
        decline: "bg-red-600 hover:bg-red-700",
        delete: "bg-gray-600 hover:bg-gray-700",
        premium: "bg-blue-600 hover:bg-yellow-700",
      },
    },
  };

  const currentTheme = themeStyles[theme] || themeStyles.light;

  const handleApprove = async (id) => {
    try {
      await axiosInstance.patch(`/articles/approve/${id}`);
      toast.success("Article Approved");
      refetch();
    } catch (error) {
      toast.error("Failed to approve article");
      console.error(error);
    }
  };

  const handleDecline = async (id, reason) => {
    try {
      await axiosInstance.patch(`/articles/decline/${id}`, { reason });
      toast.success("Article Declined");
      refetch();
      setDeclineArticle(null);
    } catch (error) {
      toast.error("Failed to decline article");
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/articles/delete/${id}`);
      toast.success("Article Deleted");
      refetch();
    } catch (error) {
      toast.error("Failed to delete article");
      console.error(error);
    }
  };

  const handleMakePremium = async (id) => {
    try {
      await axiosInstance.patch(`/articles/premium/${id}`);
      toast.success("Marked as Premium");
      refetch();
    } catch (error) {
      toast.error("Failed to mark as premium");
      console.error(error);
    }
  };

  const toggleRowExpand = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  if (isLoading) return <Spinner />;

  return (
    <div className={`min-h-screen ${currentTheme.bg} p-4 sm:p-6`}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`${currentTheme.card} rounded-xl shadow-sm p-4 sm:p-6`}
      >
        <h2
          className={`text-xl sm:text-2xl font-bold mb-4 sm:mb-6 ${currentTheme.text}`}
        >
          All Articles
        </h2>

        <div className="overflow-x-auto">
          {/* Desktop Table */}
          <table className="hidden md:table min-w-full divide-y divide-gray-200 dark:divide-gray-700 rounded-lg overflow-hidden">
            <thead
              className={`${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}
            >
              <tr>
                <th className="p-3 text-left">#</th>
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Author</th>
                <th className="p-3 text-left">Posted</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Type</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {articles.map((article, index) => (
                <motion.tr
                  key={article._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className={`${
                    index % 2 === 0
                      ? theme === "dark"
                        ? "bg-gray-800"
                        : "bg-white"
                      : theme === "dark"
                      ? "bg-gray-700"
                      : "bg-gray-50"
                  }`}
                >
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3 max-w-xs truncate-4-chars">
                    {article.title}
                  </td>
                  <td className="p-3">
                    <div className="flex items-center">
                      <img
                        src={article.authorImage}
                        alt="Author"
                        className="w-8 h-8 rounded-full mr-2"
                      />
                      <div>
                        <div>{article.authorName}</div>
                        <div className="text-xs opacity-75">
                          {article.authorEmail}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-3">
                    {new Date(article.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-3 capitalize">
                    {article.status === "Approved" ? (
                      <span className="py-1 px-2 rounded-full bg-green-100 text-green-800 text-xs">
                        Approved
                      </span>
                    ) : article.status === "Declined" ? (
                      <span className="py-1 px-2 rounded-full bg-red-100 text-red-800 text-xs">
                        Declined
                      </span>
                    ) : (
                      <span className="py-1 px-2 rounded-full bg-yellow-100 text-yellow-800 text-xs">
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="p-3">
                    {article.isPremium ? (
                      <span className="py-1 px-2 rounded-full bg-yellow-500 text-white text-xs">
                        Premium
                      </span>
                    ) : (
                      <span className="py-1 px-2 rounded-full bg-blue-100 text-blue-800 text-xs">
                        Free
                      </span>
                    )}
                  </td>
                  <td className="p-3 space-x-1">
                    {article.status !== "Approved" && (
                      <button
                        onClick={() => handleApprove(article._id)}
                        className={`p-2 rounded text-white ${currentTheme.button.approve}`}
                        title="Approve"
                      >
                        <FaCheck size={14} />
                      </button>
                    )}
                    {article.status !== "Declined" && (
                      <button
                        onClick={() => setDeclineArticle(article._id)}
                        className={`p-2 rounded text-white ${currentTheme.button.decline}`}
                        title="Decline"
                      >
                        <FaTimes size={14} />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(article._id)}
                      className={`p-2 rounded text-white ${currentTheme.button.delete}`}
                      title="Delete"
                    >
                      <FaTrash size={14} />
                    </button>
                    {!article.isPremium && (
                      <button
                        onClick={() => handleMakePremium(article._id)}
                        className={`p-2 rounded text-white ${currentTheme.button.premium}`}
                        title="Make Premium"
                      >
                        <FaCrown size={14} />
                      </button>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>

          {/* Mobile/Tablet Cards */}
          <div className="md:hidden space-y-4">
            {articles.map((article, index) => (
              <motion.div
                key={article._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className={`${currentTheme.card} rounded-lg p-4 border ${currentTheme.border}`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className={`font-medium ${currentTheme.text}`}>
                      {article.title}
                    </h3>
                    <div className="flex items-center mt-2">
                      <img
                        src={article.authorImage}
                        alt="Author"
                        className="w-8 h-8 rounded-full mr-2"
                      />
                      <div>
                        <div className="text-sm">{article.authorName}</div>
                        <div className="text-xs opacity-75">
                          {new Date(article.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleRowExpand(article._id)}
                    className={`p-2 rounded-full ${currentTheme.hover}`}
                  >
                    <FaEllipsisV />
                  </button>
                </div>

                {expandedRow === article._id && (
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm">Status:</span>
                      {article.status === "Approved" ? (
                        <span className="py-1 px-2 rounded-full bg-green-100 text-green-800 text-xs">
                          Approved
                        </span>
                      ) : article.status === "Declined" ? (
                        <span className="py-1 px-2 rounded-full bg-red-100 text-red-800 text-xs">
                          Declined
                        </span>
                      ) : (
                        <span className="py-1 px-2 rounded-full bg-yellow-100 text-yellow-800 text-xs">
                          Pending
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm">Type:</span>
                      {article.isPremium ? (
                        <span className="py-1 px-2 rounded-full bg-yellow-500 text-white text-xs">
                          Premium
                        </span>
                      ) : (
                        <span className="py-1 px-2 rounded-full bg-blue-100 text-blue-800 text-xs">
                          Free
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {article.status !== "Approved" && (
                        <button
                          onClick={() => handleApprove(article._id)}
                          className={`px-3 py-1 rounded text-white text-sm flex items-center ${currentTheme.button.approve}`}
                        >
                          <FaCheck className="mr-1" size={12} /> Approve
                        </button>
                      )}
                      {article.status !== "Declined" && (
                        <button
                          onClick={() => setDeclineArticle(article._id)}
                          className={`px-3 py-1 rounded text-white text-sm flex items-center ${currentTheme.button.decline}`}
                        >
                          <FaTimes className="mr-1" size={12} /> Decline
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(article._id)}
                        className={`px-3 py-1 rounded text-white text-sm flex items-center ${currentTheme.button.delete}`}
                      >
                        <FaTrash className="mr-1" size={12} /> Delete
                      </button>
                      {!article.isPremium && (
                        <button
                          onClick={() => handleMakePremium(article._id)}
                          className={`px-3 py-1 rounded text-white text-sm flex items-center ${currentTheme.button.premium}`}
                        >
                          <FaCrown className="mr-1" size={12} /> Premium
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6 space-x-2">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className={`px-3 sm:px-4 py-1 sm:py-2 rounded ${
              theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-200"
            } disabled:opacity-50`}
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              onClick={() => setPage(idx + 1)}
              className={`px-3 sm:px-4 py-1 sm:py-2 rounded ${
                page === idx + 1
                  ? "bg-indigo-600 text-white"
                  : theme === "dark"
                  ? "bg-gray-700 text-white"
                  : "bg-gray-200"
              }`}
            >
              {idx + 1}
            </button>
          ))}

          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className={`px-3 sm:px-4 py-1 sm:py-2 rounded ${
              theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-200"
            } disabled:opacity-50`}
          >
            Next
          </button>
        </div>

        {/* Decline Modal */}
        {declineArticle && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div
              className={`${currentTheme.card} rounded-lg p-6 w-full max-w-md`}
            >
              <h3 className={`text-lg font-semibold mb-3 ${currentTheme.text}`}>
                Decline Reason
              </h3>
              <textarea
                className={`w-full border p-3 rounded mb-4 ${
                  currentTheme.border
                } ${theme === "dark" ? "bg-gray-700 text-white" : "bg-white"}`}
                rows="4"
                placeholder="Write reason here..."
                value={declineReason}
                onChange={(e) => setDeclineReason(e.target.value)}
              ></textarea>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setDeclineArticle(null);
                    setDeclineReason("");
                  }}
                  className={`px-4 py-2 rounded ${
                    theme === "dark"
                      ? "bg-gray-600 hover:bg-gray-500"
                      : "bg-gray-300 hover:bg-gray-400"
                  } transition-colors`}
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDecline(declineArticle, declineReason)}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
