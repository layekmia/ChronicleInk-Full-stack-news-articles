import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import useAuth from "../hook/useAuth";
import axiosInstance from "../utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { useTheme } from "../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiUpload,
  FiType,
  FiBook,
  FiTag,
  FiUser,
  FiSend,
  FiX,
} from "react-icons/fi";
import { RiArticleLine } from "react-icons/ri";

const tagOptions = [
  { value: "tech", label: "Tech" },
  { value: "health", label: "Health" },
  { value: "politics", label: "Politics" },
  { value: "sports", label: "Sports" },
  { value: "Technology", label: "Technology" },
  { value: "Ai", label: "AI" },
  { value: "Future", label: "Future" },
  { value: "business", label: "Business" },
  { value: "science", label: "Science" },
  { value: "entertainment", label: "Entertainment" },
];

export default function AddArticleForm() {
  const { theme } = useTheme();
  const { data: publishers = [] } = useQuery({
    queryKey: ["publishers"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/publishers");
      return data || [];
    },
  });

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
    setValue,
  } = useForm();

  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);
  const titleValue = watch("title", "");

  const themeStyles = {
    light: {
      bg: "bg-gradient-to-br from-blue-50 to-purple-50",
      cardBg: "bg-white/90 backdrop-blur-md",
      text: "text-gray-800",
      secondaryText: "text-gray-600",
      border: "border-white/20",
      inputBg: "bg-white/70",
      button:
        "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700",
      buttonText: "text-white",
      focusRing: "focus:ring-4 focus:ring-blue-200",
      accent: "text-blue-600",
      shadow: "shadow-xl shadow-blue-100/50",
    },
    dark: {
      bg: "bg-gradient-to-br from-gray-900 to-gray-800",
      cardBg: "bg-gray-800/90 backdrop-blur-md",
      text: "text-gray-100",
      secondaryText: "text-gray-300",
      border: "border-gray-700/50",
      inputBg: "bg-gray-700/70",
      button:
        "bg-gradient-to-r from-blue-700 to-purple-700 hover:from-blue-800 hover:to-purple-800",
      buttonText: "text-white",
      focusRing: "focus:ring-4 focus:ring-blue-900/50",
      accent: "text-blue-400",
      shadow: "shadow-xl shadow-blue-900/20",
    },
  };

  const currentTheme = themeStyles[theme] || themeStyles.light;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
      setValue("image", [file]);
    }
  };

  const removeImage = () => {
    setPreviewImage(null);
    setValue("image", []);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmit = async (data) => {
    if (!data.image || data.image.length === 0) {
      toast.error("Please upload an image");
      return;
    }

    setLoading(true);
    try {
      const imageFile = data.image[0];
      const formData = new FormData();
      formData.append("image", imageFile);

      const imgbKey = import.meta.env.VITE_IMGB_API_KEY;
      const imgUploadRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imgbKey}`,
        formData
      );
      const imageUrl = imgUploadRes.data.data.url;

      const article = {
        title: data.title,
        image: imageUrl,
        publisher: data.publisher,
        tags: data.tags.map((tag) => tag.value),
        description: data.description,
        authorName: user.name,
        authorImage: user.image,
        authorEmail: user.email,
        status: "Pending",
        isPremium: false,
        views: 0,
      };

      await axiosInstance.post("/articles", article);
      toast.success("Article submitted for review");
      reset();
      setPreviewImage(null);
    } catch (err) {
      console.error(err);
      toast.error("Submission failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 ${currentTheme.bg}`}
    >
      <style jsx>{`
        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          20%,
          60% {
            transform: translateX(-4px);
          }
          40%,
          80% {
            transform: translateX(4px);
          }
        }
        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
      `}</style>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`relative max-w-4xl mx-auto rounded-3xl overflow-hidden ${currentTheme.cardBg} ${currentTheme.border} ${currentTheme.shadow}`}
      >
        <div className="relative z-10 p-8 md:p-10">
          <div className="flex items-center justify-center mb-10">
            <motion.div
              animate={{
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="mr-4"
            >
              <RiArticleLine className={`text-4xl ${currentTheme.accent}`} />
            </motion.div>
            <motion.h2
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className={`text-4xl font-bold ${currentTheme.text}`}
            >
              Create New Article
            </motion.h2>
          </div>

          {titleValue && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`text-lg mb-8 italic ${currentTheme.secondaryText} text-center`}
            >
              "
              {titleValue.length > 40
                ? `${titleValue.substring(0, 40)}...`
                : titleValue}
              "
            </motion.p>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Title Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center mb-2">
                <FiType className={`mr-2 ${currentTheme.accent}`} />
                <label className={`text-sm font-medium ${currentTheme.text}`}>
                  Article Title
                </label>
              </div>
              <div className="relative">
                <input
                  {...register("title", { required: true })}
                  type="text"
                  placeholder="Your compelling headline..."
                  className={`w-full ${currentTheme.border} ${currentTheme.inputBg} rounded-xl px-5 py-4 focus:outline-none ${currentTheme.focusRing} transition-all duration-300`}
                />
                {errors.title && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`absolute right-3 top-3 text-xs ${
                      theme === "dark" ? "text-red-400" : "text-red-600"
                    }`}
                  >
                    Required
                  </motion.span>
                )}
              </div>
            </motion.div>

            {/* Image Upload */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center mb-2">
                <FiUpload className={`mr-2 ${currentTheme.accent}`} />
                <label className={`text-sm font-medium ${currentTheme.text}`}>
                  Featured Image
                </label>
              </div>

              {previewImage ? (
                <div className="relative group">
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-full h-64 object-cover rounded-xl border-2 border-transparent group-hover:border-blue-400 transition-all duration-300"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className={`absolute top-2 right-2 p-2 rounded-full ${
                      theme === "dark" ? "bg-gray-800/90" : "bg-white/90"
                    } hover:bg-red-500 hover:text-white transition-all duration-300`}
                  >
                    <FiX />
                  </button>
                </div>
              ) : (
                <div
                  className={`border-2 border-dashed ${currentTheme.border} rounded-xl p-6 text-center cursor-pointer transition-all duration-300 hover:border-solid hover:border-blue-400`}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={`absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10`}
                      />
                    )}
                  </AnimatePresence>
                  <div className="relative">
                    <input
                      {...register("image", { required: true })}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      ref={fileInputRef}
                      onChange={handleImageChange}
                    />
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <FiUpload className={`text-3xl ${currentTheme.accent}`} />
                      <p className={`text-sm ${currentTheme.secondaryText}`}>
                        Click to upload or drag and drop
                      </p>
                      <p className={`text-xs ${currentTheme.secondaryText}`}>
                        Recommended size: 1200x630px (Max 5MB)
                      </p>
                    </div>
                  </div>
                </div>
              )}
              {errors.image && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`mt-2 text-xs ${
                    theme === "dark" ? "text-red-400" : "text-red-600"
                  }`}
                >
                  Please upload an image
                </motion.p>
              )}
            </motion.div>

            {/* Publisher and Tags Row */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {/* Publisher */}
              <div>
                <div className="flex items-center mb-2">
                  <FiUser className={`mr-2 ${currentTheme.accent}`} />
                  <label className={`text-sm font-medium ${currentTheme.text}`}>
                    Publisher
                  </label>
                </div>
                <select
                  {...register("publisher", { required: true })}
                  className={`w-full ${currentTheme.border} ${currentTheme.inputBg} rounded-xl px-5 py-4 focus:outline-none ${currentTheme.focusRing} appearance-none`}
                >
                  <option value="">Select publisher...</option>
                  {publishers.map((p) => (
                    <option key={p._id} value={p.name}>
                      {p.name}
                    </option>
                  ))}
                </select>
                {errors.publisher && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`mt-2 text-xs ${
                      theme === "dark" ? "text-red-400" : "text-red-600"
                    }`}
                  >
                    Please select a publisher
                  </motion.p>
                )}
              </div>

              {/* Tags - Updated UI */}
              <div>
                <div className="flex items-center mb-2">
                  <FiTag className={`mr-2 ${currentTheme.accent}`} />
                  <label className={`text-sm font-medium ${currentTheme.text}`}>
                    Tags <span className="text-red-500">*</span>
                  </label>
                </div>
                <div
                  className={`relative ${errors.tags ? "animate-shake" : ""}`}
                >
                  <Controller
                    name="tags"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={tagOptions}
                        isMulti
                        className="react-select-container"
                        classNamePrefix="react-select"
                        placeholder="Select at least one tag..."
                        noOptionsMessage={() => "No more tags available"}
                        styles={{
                          control: (base, { isFocused }) => ({
                            ...base,
                            backgroundColor:
                              theme === "dark" ? "#374151" : "white",
                            borderColor: errors.tags
                              ? "#ef4444"
                              : isFocused
                              ? theme === "dark"
                                ? "#60a5fa"
                                : "#3b82f6"
                              : theme === "dark"
                              ? "#4B5563"
                              : "#E5E7EB",
                            borderRadius: "12px",
                            padding: "6px 4px",
                            minHeight: "52px",
                            boxShadow: isFocused
                              ? theme === "dark"
                                ? "0 0 0 1px #60a5fa"
                                : "0 0 0 1px #3b82f6"
                              : "none",
                            "&:hover": {
                              borderColor: errors.tags
                                ? "#ef4444"
                                : theme === "dark"
                                ? "#6B7280"
                                : "#9CA3AF",
                            },
                          }),
                          menu: (base) => ({
                            ...base,
                            backgroundColor:
                              theme === "dark" ? "#374151" : "white",
                            borderRadius: "12px",
                            overflow: "hidden",
                          }),
                          option: (base, { isFocused }) => ({
                            ...base,
                            backgroundColor: isFocused
                              ? theme === "dark"
                                ? "#4B5563"
                                : "#E5E7EB"
                              : theme === "dark"
                              ? "#374151"
                              : "white",
                            color: theme === "dark" ? "white" : "black",
                          }),
                          multiValue: (base) => ({
                            ...base,
                            backgroundColor:
                              theme === "dark" ? "#4B5563" : "#E5E7EB",
                            borderRadius: "8px",
                          }),
                          multiValueLabel: (base) => ({
                            ...base,
                            color: theme === "dark" ? "white" : "black",
                            padding: "4px 8px",
                          }),
                        }}
                      />
                    )}
                  />
                  {errors.tags && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`absolute -bottom-5 left-0 text-xs ${
                        theme === "dark" ? "text-red-400" : "text-red-600"
                      }`}
                    >
                      Please select at least one tag
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex items-center mb-2">
                <FiBook className={`mr-2 ${currentTheme.accent}`} />
                <label className={`text-sm font-medium ${currentTheme.text}`}>
                  Article Content
                </label>
              </div>
              <textarea
                {...register("description", { required: true })}
                rows="8"
                placeholder="Write your masterpiece here..."
                className={`w-full ${currentTheme.border} ${currentTheme.inputBg} rounded-xl px-5 py-4 focus:outline-none ${currentTheme.focusRing} resize-none`}
              />
              {errors.description && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`mt-2 text-xs ${
                    theme === "dark" ? "text-red-400" : "text-red-600"
                  }`}
                >
                  Please write your article content
                </motion.p>
              )}
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="pt-4"
            >
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full ${currentTheme.button} ${currentTheme.buttonText} font-medium py-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2`}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5"
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
                    <span>Publishing...</span>
                  </>
                ) : (
                  <>
                    <FiSend className="text-lg" />
                    <span>Publish Article</span>
                  </>
                )}
              </motion.button>
            </motion.div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
