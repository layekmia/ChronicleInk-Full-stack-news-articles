import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { motion } from "framer-motion";
import { FaNewspaper, FaHome, FaSearch } from "react-icons/fa";
import { MdOutlineErrorOutline } from "react-icons/md";

const NotFound = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  // Theme-based styles
  const bgColor = theme === "dark" ? "bg-gray-900" : "bg-gray-50";
  const textColor = theme === "dark" ? "text-gray-100" : "text-gray-900";
  const secondaryText = theme === "dark" ? "text-gray-400" : "text-gray-600";
  const cardBg = theme === "dark" ? "bg-gray-800" : "bg-white";
  const borderColor = theme === "dark" ? "border-gray-700" : "border-gray-200";
  const buttonColor =
    theme === "dark"
      ? "bg-blue-600 hover:bg-blue-700"
      : "bg-blue-500 hover:bg-blue-600";

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      className={`min-h-screen flex items-center justify-center px-4 py-12 ${bgColor}`}
      initial="hidden"
      animate="show"
      variants={container}
    >
      <div className="max-w-md w-full text-center">
        {/* Error Icon */}
        <motion.div variants={item} className="flex justify-center mb-6">
          <div
            className={`p-6 rounded-full ${cardBg} ${borderColor} border shadow-lg`}
          >
            <MdOutlineErrorOutline
              className={`text-6xl ${
                theme === "dark" ? "text-red-500" : "text-red-600"
              }`}
            />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          variants={item}
          className={`text-4xl font-bold mb-4 ${textColor}`}
        >
          Page Not Found
        </motion.h1>

        {/* Subtitle */}
        <motion.p variants={item} className={`text-lg mb-8 ${secondaryText}`}>
          The page you're looking for doesn't exist or has been moved.
        </motion.p>

        {/* Newspaper illustration */}
        <motion.div variants={item} className="relative mb-8 mx-auto w-64 h-40">
          <div
            className={`absolute inset-0 ${cardBg} ${borderColor} border rounded-lg shadow-md`}
          >
            <div
              className={`h-4 ${
                theme === "dark" ? "bg-gray-700" : "bg-gray-200"
              } rounded-t-lg`}
            ></div>
            <div className="p-4">
              <div
                className={`h-3 ${
                  theme === "dark" ? "bg-gray-600" : "bg-gray-300"
                } mb-2 rounded`}
              ></div>
              <div
                className={`h-3 ${
                  theme === "dark" ? "bg-gray-600" : "bg-gray-300"
                } mb-2 rounded w-3/4`}
              ></div>
              <div
                className={`h-3 ${
                  theme === "dark" ? "bg-gray-600" : "bg-gray-300"
                } rounded w-1/2`}
              ></div>
            </div>
            <div
              className={`absolute bottom-0 left-0 right-0 h-8 ${
                theme === "dark" ? "bg-gray-700" : "bg-gray-200"
              } rounded-b-lg flex items-center justify-center`}
            >
              <span className={`text-xs font-mono ${secondaryText}`}>
                404 ERROR
              </span>
            </div>
          </div>
          <motion.div
            className={`absolute -top-2 -left-2 ${
              theme === "dark" ? "bg-red-600" : "bg-red-500"
            } text-white text-xs px-2 py-1 rounded-full`}
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 2,
            }}
          >
            MISSING
          </motion.div>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          variants={item}
          className="flex flex-col sm:flex-row justify-center gap-4 mt-8"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/")}
            className={`${buttonColor} text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center gap-2`}
          >
            <FaHome />
            Return Home
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/all-articles")}
            className={`${
              theme === "dark"
                ? "bg-gray-700 hover:bg-gray-600"
                : "bg-gray-200 hover:bg-gray-300"
            } ${textColor} font-medium py-3 px-6 rounded-lg flex items-center justify-center gap-2`}
          >
            <FaNewspaper />
            Browse Articles
          </motion.button>
        </motion.div>

        {/* Search suggestion */}
        <motion.div
          variants={item}
          className={`mt-8 p-4 ${cardBg} ${borderColor} border rounded-lg`}
        >
          <p className={`mb-3 ${secondaryText}`}>
            Can't find what you're looking for?
          </p>
          <div className="relative">
            <input
              type="text"
              placeholder="Search our news archive..."
              className={`w-full pl-10 pr-4 py-2 rounded-lg ${
                theme === "dark"
                  ? "bg-gray-700 text-white"
                  : "bg-gray-100 text-gray-900"
              } focus:outline-none focus:ring-2 ${
                theme === "dark" ? "focus:ring-blue-500" : "focus:ring-blue-400"
              }`}
            />
            <FaSearch className={`absolute left-3 top-3 ${secondaryText}`} />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default NotFound;
