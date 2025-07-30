import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hook/useAuth";
import axiosInstance from "../utils/axiosInstance";
import { motion } from "framer-motion";
import {
  FiUser,
  FiMail,
  FiCalendar,
  FiEdit2,
  FiClock,
  FiAward,
  FiBookmark,
  FiRefreshCw,
} from "react-icons/fi";
import { RiVipCrownLine } from "react-icons/ri";
import { BsGraphUp } from "react-icons/bs";

export default function MyProfile() {
  const { user: authUser } = useAuth(); // Get real-time auth data
  const [additionalUserData, setAdditionalUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchAdditionalData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/users/additional-data");
      setAdditionalUserData(response.data);

      // Update last login
      if (authUser?.uid) {
        await axiosInstance.patch(`/users/${authUser.uid}/last-login`);
      }
    } catch (err) {
      console.error("Failed to fetch user data:", err);
      setError("Failed to load profile data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authUser?.uid) {
      fetchAdditionalData();
    }
  }, [authUser?.uid]); // Refetch when authUser changes

  const formatDate = (dateString) => {
    if (!dateString) return "Never logged in";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Combine auth user data with additional data
  const userData = {
    ...authUser,
    ...additionalUserData,
  };

  if (!authUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="p-8 rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 shadow-xl max-w-md w-full text-center">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
            Please Sign In
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            You need to be logged in to view this page
          </p>
        </div>
      </div>
    );
  }

  if (loading && !additionalUserData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 py-10 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-3xl overflow-hidden shadow-2xl border border-gray-200/50 dark:border-gray-700/50">
          {/* Profile Header */}
          <div className="relative h-40 bg-gradient-to-r from-purple-500 to-indigo-600">
            <div className="absolute -bottom-16 left-6">
              <div className="relative">
                <img
                  src={
                    userData.image ||
                    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
                  }
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 object-cover shadow-lg"
                />
                <div className="absolute bottom-0 right-0 flex gap-2">
                  <button
                    onClick={() => navigate("/update-profile")}
                    className="p-2 bg-white dark:bg-gray-700 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-all"
                  >
                    <FiEdit2 className="text-purple-600 dark:text-purple-400" />
                  </button>
                  <button
                    onClick={fetchAdditionalData}
                    disabled={loading}
                    className="p-2 bg-white dark:bg-gray-700 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-all"
                  >
                    <FiRefreshCw
                      className={`text-purple-600 dark:text-purple-400 ${
                        loading ? "animate-spin" : ""
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="pt-20 px-6 pb-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                  {userData.name || "Anonymous User"}
                </h1>
                <div className="flex items-center mt-2 text-gray-600 dark:text-gray-300">
                  <FiMail className="mr-2" />
                  <span>{userData.email}</span>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-indigo-50/50 dark:bg-indigo-900/20 p-4 rounded-xl border border-indigo-100 dark:border-indigo-900/30">
                <div className="flex items-center">
                  <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg mr-3">
                    <FiClock className="text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Last Active
                    </p>
                    <p className="font-medium text-gray-800 dark:text-white">
                      {formatDate(
                        userData.lastLogin || new Date().toISOString()
                      )}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50/50 dark:bg-purple-900/20 p-4 rounded-xl border border-purple-100 dark:border-purple-900/30">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg mr-3">
                    <FiCalendar className="text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Member Since
                    </p>
                    <p className="font-medium text-gray-800 dark:text-white">
                      {formatDate(userData.createdAt)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-900/30">
                <div className="flex items-center">
                  <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg mr-3">
                    <RiVipCrownLine className="text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Status
                    </p>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-gray-800 dark:text-white">
                        {userData.isPremiumTaken
                          ? "Premium Member"
                          : "Free Member"}
                      </p>
                      {userData.isPremiumTaken && (
                        <span className="text-xs px-2 py-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded-full">
                          PRO
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
