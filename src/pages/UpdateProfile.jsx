import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../hook/useAuth";
import { useTheme } from "../context/ThemeContext";
import { motion } from "framer-motion";
import { fadeIn } from "../utils/motion";
import {
  FaUserEdit,
  FaCheck,
  FaTimes,
  FaUserCircle,
  FaCamera,
} from "react-icons/fa";

const UpdateProfile = () => {
  const { user, updateUserProfile } = useAuth();
  const { theme } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.name || "",
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name || "",
      });
      setImagePreview(user.image || "");
    }
  }, [user, reset]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      await updateUserProfile(formData);
      setSuccess("Profile updated successfully!");
      setIsEditing(false);
    } catch (err) {
      setError(err.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const textColor = theme === "dark" ? "text-gray-100" : "text-gray-800";
  const bgColor = theme === "dark" ? "bg-gray-800" : "bg-white";
  const inputBg = theme === "dark" ? "bg-gray-700" : "bg-gray-50";
  const borderColor = theme === "dark" ? "border-gray-600" : "border-gray-300";
  const buttonBg =
    theme === "dark"
      ? "bg-blue-600 hover:bg-blue-700"
      : "bg-blue-500 hover:bg-blue-600";
  const cardBg = theme === "dark" ? "bg-gray-700/50" : "bg-indigo-50/50";

  return (
    <motion.div
      variants={fadeIn("up", "spring", 0.2, 1)}
      initial="hidden"
      animate="show"
      className="max-w-2xl mx-auto m-4"
    >
      <div className={`rounded-2xl shadow-xl p-6  ${bgColor} ${textColor}`}>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-600">
            My Profile
          </h2>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full ${buttonBg} text-white shadow-lg hover:shadow-xl transition-all`}
            >
              <FaUserEdit /> Edit Profile
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(false)}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-500 hover:bg-gray-600 text-white shadow-lg hover:shadow-xl transition-all"
            >
              <FaTimes /> Cancel
            </button>
          )}
        </div>

        <div className="space-y-8">
          {/* Profile Card */}
          <div
            className={`p-6 rounded-xl ${cardBg} border ${borderColor} shadow-md`}
          >
            <div className="flex flex-col items-center mb-6">
              <div className="relative group">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Profile"
                    className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 object-cover shadow-xl"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 bg-gray-200 dark:bg-gray-600 flex items-center justify-center shadow-xl">
                    <FaUserCircle className="text-6xl text-gray-400 dark:text-gray-500" />
                  </div>
                )}
                {isEditing && (
                  <label className="absolute bottom-0 right-0 p-3 bg-white dark:bg-gray-700 rounded-full shadow-lg cursor-pointer group-hover:scale-110 transition-transform">
                    <FaCamera className="text-purple-600 dark:text-purple-400" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Status Badge */}
            <div className="flex justify-center mb-6">
              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  user?.isPremiumTaken
                    ? "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white shadow-lg"
                    : "bg-gray-200 dark:bg-gray-700 shadow-md"
                }`}
              >
                {user?.isPremiumTaken ? "🌟 Premium Member" : "Free Member"}
              </span>
            </div>

            {/* Member Info */}
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b pb-2 border-gray-300 dark:border-gray-600">
                <span className="font-medium">Member Since:</span>
                <span>
                  {new Date(user?.createdAt || new Date()).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between items-center border-b pb-2 border-gray-300 dark:border-gray-600">
                <span className="font-medium">Last Active:</span>
                <span>
                  {new Date(user?.lastActive || new Date()).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center border-b pb-2 border-gray-300 dark:border-gray-600">
                <span className="font-medium">Email:</span>
                <span className="text-blue-500 dark:text-blue-400">
                  {user?.email}
                </span>
              </div>
            </div>
          </div>

          {isEditing ? (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className={`p-6 rounded-xl ${cardBg} border ${borderColor} shadow-md`}
            >
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block mb-2 font-medium">
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    {...register("name", {
                      required: "Name is required",
                      minLength: {
                        value: 2,
                        message: "Name must be at least 2 characters",
                      },
                    })}
                    className={`w-full p-4 rounded-xl border ${borderColor} ${inputBg} focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm`}
                  />
                  {errors.name && (
                    <p className="mt-2 text-sm text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl ${buttonBg} text-white font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-70`}
                  >
                    {loading ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Updating...
                      </>
                    ) : (
                      <>
                        <FaCheck /> Save Changes
                      </>
                    )}
                  </button>
                </div>

                {error && (
                  <div className="p-4 rounded-xl bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-100 border border-red-200 dark:border-red-800">
                    {error}
                  </div>
                )}
                {success && (
                  <div className="p-4 rounded-xl bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-100 border border-green-200 dark:border-green-800">
                    {success}
                  </div>
                )}
              </div>
            </form>
          ) : (
            <div
              className={`p-6 rounded-xl ${cardBg} border ${borderColor} shadow-md`}
            >
              <h3 className="text-xl font-semibold mb-4">About You</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Display Name
                  </p>
                  <p className="text-lg font-medium mt-1">
                    {user?.name || "Not provided"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default UpdateProfile;
