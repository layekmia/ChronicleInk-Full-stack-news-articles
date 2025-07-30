import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAuth from "../hook/useAuth";
import axiosInstance from "../utils/axiosInstance";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import EditArticle from "../components/EditArticle";
import { useTheme } from "../context/ThemeContext";
import { FiEdit, FiTrash2, FiEye, FiX, FiInfo } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function MyArticles() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const [modalReason, setModalReason] = useState(null);
  const navigate = useNavigate();
  const [editArticle, setEditArticle] = useState(null);
  const [updatedData, setUpdatedData] = useState({
    title: "",
    description: "",
  });

  // Theme configuration
  const themeClasses = {
    light: {
      bg: "bg-gray-50",
      text: "text-gray-800",
      card: "bg-white",
      border: "border-gray-200",
      header: "bg-gray-100",
      button: {
        primary: "bg-blue-600 hover:bg-blue-700 text-white",
        danger: "bg-red-600 hover:bg-red-700 text-white",
        warning: "bg-yellow-500 hover:bg-yellow-600 text-white",
      },
      status: {
        approved: "text-green-700 bg-green-100",
        declined: "text-red-700 bg-red-100",
        pending: "text-yellow-700 bg-yellow-100",
      },
    },
    dark: {
      bg: "bg-gray-900",
      text: "text-gray-100",
      card: "bg-gray-800",
      border: "border-gray-700",
      header: "bg-gray-700",
      button: {
        primary: "bg-blue-700 hover:bg-blue-800 text-white",
        danger: "bg-red-700 hover:bg-red-800 text-white",
        warning: "bg-yellow-600 hover:bg-yellow-700 text-white",
      },
      status: {
        approved: "text-green-300 bg-green-900/50",
        declined: "text-red-300 bg-red-900/50",
        pending: "text-yellow-300 bg-yellow-900/50",
      },
    },
  };

  const currentTheme = themeClasses[theme] || themeClasses.light;

  const {
    data: articles = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myArticles", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosInstance.get(`/user/articles?email=${user.email}`);
      return res.data;
    },
  });

  async function handleDelete(id) {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      background: theme === "dark" ? "#1f2937" : "#fff",
      color: theme === "dark" ? "#fff" : "#000",
    });

    if (!result.isConfirmed) return;

    try {
      await axiosInstance.delete(`/article/delete/${id}`);
      Swal.fire({
        title: "Deleted!",
        text: "Your article has been deleted.",
        icon: "success",
        background: theme === "dark" ? "#1f2937" : "#fff",
        color: theme === "dark" ? "#fff" : "#000",
      });
      refetch();
    } catch (err) {
      console.error("Delete failed:", err);
      Swal.fire({
        title: "Error",
        text: "Failed to delete article.",
        icon: "error",
        background: theme === "dark" ? "#1f2937" : "#fff",
        color: theme === "dark" ? "#fff" : "#000",
      });
    }
  }

  if (isLoading) return <Spinner />;

  return (
    <div
      className={`min-h-screen p-4 md:p-8 ${currentTheme.bg} ${currentTheme.text}`}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
            My Articles
          </h1>
          <span className="text-sm px-3 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
            {articles.length} Articles
          </span>
        </div>

        <div
          className={`rounded-xl shadow-lg overflow-hidden ${currentTheme.border} border`}
        >
          {/* Table for desktop */}
          <div className="hidden md:block">
            <table className="w-full">
              <thead>
                <tr className={`${currentTheme.header}`}>
                  <th className="p-4 text-left">#</th>
                  <th className="p-4 text-left">Title</th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-left">Premium</th>
                  <th className="p-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {articles.map((article, index) => (
                  <motion.tr
                    key={article._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className={`border-t ${
                      currentTheme.border
                    } hover:bg-opacity-50 ${
                      theme === "dark"
                        ? "hover:bg-gray-700"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <td className="p-4">{index + 1}</td>
                    <td className="p-4 font-medium">{article.title}</td>
                    <td className="p-4">
                      <div className="flex items-center">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            article.status === "Approved"
                              ? currentTheme.status.approved
                              : article.status === "Declined"
                              ? currentTheme.status.declined
                              : currentTheme.status.pending
                          }`}
                        >
                          {article.status}
                        </span>
                        {article.status === "Declined" &&
                          article.declineReason && (
                            <button
                              className="ml-2 text-blue-500 hover:text-blue-700 dark:hover:text-blue-400"
                              onClick={() =>
                                setModalReason(article.declineReason)
                              }
                            >
                              <FiInfo className="w-4 h-4" />
                            </button>
                          )}
                      </div>
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          article.isPremium
                            ? "text-indigo-600 bg-indigo-100 dark:text-indigo-300 dark:bg-indigo-900/50"
                            : "text-gray-500 dark:text-gray-400"
                        }`}
                      >
                        {article.isPremium ? "Premium" : "Regular"}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => navigate(`/article/${article._id}`)}
                          className={`p-2 rounded-lg ${currentTheme.button.primary}`}
                          title="View Details"
                        >
                          <FiEye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setEditArticle(article);
                            setUpdatedData({
                              title: article.title,
                              description: article.description,
                              image: article.image,
                            });
                          }}
                          className={`p-2 rounded-lg ${currentTheme.button.warning}`}
                          title="Edit Article"
                        >
                          <FiEdit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(article._id)}
                          className={`p-2 rounded-lg ${currentTheme.button.danger}`}
                          title="Delete Article"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cards for mobile */}
          <div className="md:hidden space-y-4 p-4">
            {articles.map((article, index) => (
              <motion.div
                key={article._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className={`p-4 rounded-lg ${currentTheme.card} ${currentTheme.border} border shadow`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium">{article.title}</h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    #{index + 1}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      article.status === "Approved"
                        ? currentTheme.status.approved
                        : article.status === "Declined"
                        ? currentTheme.status.declined
                        : currentTheme.status.pending
                    }`}
                  >
                    {article.status}
                  </span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      article.isPremium
                        ? "text-indigo-600 bg-indigo-100 dark:text-indigo-300 dark:bg-indigo-900/50"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {article.isPremium ? "Premium" : "Regular"}
                  </span>
                </div>

                <div className="flex justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => navigate(`/article/${article._id}`)}
                    className={`px-3 py-1 text-sm rounded-lg flex items-center gap-1 ${currentTheme.button.primary}`}
                  >
                    <FiEye className="w-3 h-3" />
                    View
                  </button>
                  <button
                    onClick={() => {
                      setEditArticle(article);
                      setUpdatedData({
                        title: article.title,
                        description: article.description,
                        image: article.image,
                      });
                    }}
                    className={`px-3 py-1 text-sm rounded-lg flex items-center gap-1 ${currentTheme.button.warning}`}
                  >
                    <FiEdit className="w-3 h-3" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(article._id)}
                    className={`px-3 py-1 text-sm rounded-lg flex items-center gap-1 ${currentTheme.button.danger}`}
                  >
                    <FiTrash2 className="w-3 h-3" />
                    Delete
                  </button>
                </div>

                {article.status === "Declined" && article.declineReason && (
                  <button
                    className="mt-2 w-full text-sm text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 flex items-center justify-center gap-1"
                    onClick={() => setModalReason(article.declineReason)}
                  >
                    <FiInfo className="w-3 h-3" />
                    View Decline Reason
                  </button>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Empty state */}
        {articles.length === 0 && (
          <div
            className={`text-center py-12 rounded-xl ${currentTheme.card} ${currentTheme.border} border`}
          >
            <div className="text-gray-500 dark:text-gray-400 mb-4">
              You haven't created any articles yet
            </div>
            <button
              onClick={() => navigate("/add-article")}
              className={`px-6 py-2 rounded-lg ${currentTheme.button.primary}`}
            >
              Create Your First Article
            </button>
          </div>
        )}
      </motion.div>

      {/* Decline Reason Modal */}
      <AnimatePresence>
        {modalReason && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className={`rounded-xl shadow-2xl max-w-md w-full ${currentTheme.card} ${currentTheme.border} border`}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Decline Reason</h2>
                  <button
                    onClick={() => setModalReason(null)}
                    className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </div>
                <div
                  className={`p-4 rounded-lg bg-gray-100 dark:bg-gray-700 mb-4`}
                >
                  <p className="whitespace-pre-wrap">{modalReason}</p>
                </div>
                <button
                  className={`w-full py-2 rounded-lg ${currentTheme.button.primary}`}
                  onClick={() => setModalReason(null)}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Article Modal */}
      {editArticle && (
        <EditArticle
          updatedData={updatedData}
          setUpdatedData={setUpdatedData}
          editArticle={editArticle}
          setEditArticle={setEditArticle}
          refetch={refetch}
          theme={theme}
        />
      )}
    </div>
  );
}
