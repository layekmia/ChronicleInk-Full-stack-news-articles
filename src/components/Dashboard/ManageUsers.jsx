import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axiosInstance from "../../utils/axiosInstance";
import Spinner from "../Spinner";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

const ManageUsers = () => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const { theme } = useTheme();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["all-users", page],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/all-users?page=${page}&limit=${limit}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  const users = data?.users || [];
  const totalPages = data?.totalPages || 1;

  const themeStyles = {
    light: {
      bg: "bg-gray-50",
      card: "bg-white",
      text: "text-gray-800",
      border: "border-gray-200",
      button: "bg-indigo-600 hover:bg-indigo-700",
    },
    dark: {
      bg: "bg-gray-900",
      card: "bg-gray-800",
      text: "text-gray-100",
      border: "border-gray-700",
      button: "bg-indigo-500 hover:bg-indigo-600",
    },
  };

  const currentTheme = themeStyles[theme] || themeStyles.light;

  const handleMakeAdmin = async (id) => {
    try {
      await axiosInstance.patch(`/users/admin/${id}`);
      toast.success("User promoted to admin");
      refetch();
    } catch (err) {
      toast.error("Failed to make admin");
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <div className={`min-h-screen ${currentTheme.bg} p-6`}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`${currentTheme.card} rounded-xl ${
          theme === "dark" ? "shadow-lg" : "shadow"
        } p-6`}
      >
        <h2 className={`text-2xl font-bold mb-6 ${currentTheme.text}`}>
          All Users
        </h2>

        <div className="overflow-x-auto">
          <table
            className={`min-w-full ${currentTheme.border} rounded-lg overflow-hidden`}
          >
            <thead
              className={`${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}
            >
              <tr>
                <th className="p-3 text-left">#</th>
                <th className="p-3 text-left">Photo</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <motion.tr
                  key={user._id}
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
                  <td className="p-3">
                    <img
                      src={user.image || "/placeholder.jpg"}
                      alt="Profile"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </td>
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">
                    {user.role === "admin" ? (
                      <span className="py-1 px-3 rounded-full bg-green-100 text-green-800 text-sm">
                        Admin
                      </span>
                    ) : (
                      <button
                        onClick={() => handleMakeAdmin(user._id)}
                        className={`px-3 py-1 rounded text-white text-sm ${currentTheme.button}`}
                      >
                        Make Admin
                      </button>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6 space-x-2">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className={`px-4 py-2 rounded ${
              theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-200"
            } disabled:opacity-50`}
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              onClick={() => setPage(idx + 1)}
              className={`px-4 py-2 rounded ${
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
            className={`px-4 py-2 rounded ${
              theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-200"
            } disabled:opacity-50`}
          >
            Next
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ManageUsers;
