import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";
import { useTheme } from "../../context/ThemeContext";
import { motion } from "framer-motion";
import { FaNewspaper, FaGlobe, FaRegStar, FaStar } from "react-icons/fa";
import Spinner from "../Spinner";

const AllPublishers = () => {
  const { theme } = useTheme();
  const { data: publishers = [], isLoading } = useQuery({
    queryKey: ["publishers"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/publishers");
      return data || [];
    },
  });

  const themeStyles = {
    light: {
      bg: "bg-gray-50",
      card: "bg-white",
      text: "text-gray-800",
      border: "border-gray-200",
      hover: "hover:bg-gray-100",
      heading: "text-blue-700",
      shadow: "shadow-md hover:shadow-lg",
    },
    dark: {
      bg: "bg-gray-900",
      card: "bg-gray-800",
      text: "text-gray-100",
      border: "border-gray-700",
      hover: "hover:bg-gray-700",
      heading: "text-blue-400",
      shadow: "shadow-lg hover:shadow-xl",
    },
  };

  const currentTheme = themeStyles[theme] || themeStyles.light;

  if (isLoading) return <Spinner />;

  return (
    <section className={`min-h-screen py-8 px-4 sm:px-6 ${currentTheme.bg}`}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4"
        >
          <div className="flex items-center gap-3">
            <div
              className={`p-3 rounded-lg ${
                theme === "dark" ? "bg-blue-900" : "bg-blue-100"
              }`}
            >
              <FaNewspaper className={`text-2xl ${currentTheme.heading}`} />
            </div>
            <h2
              className={`text-2xl md:text-3xl font-bold ${currentTheme.heading}`}
            >
              All Publishers
            </h2>
          </div>
          <div
            className={`px-4 py-2 rounded-full ${
              theme === "dark" ? "bg-gray-700" : "bg-gray-200"
            } text-sm`}
          >
            {publishers.length} Publishers
          </div>
        </motion.div>

        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {publishers.map((pub, index) => (
            <motion.div
              key={pub.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              className={`flex flex-col items-center p-4 rounded-xl ${currentTheme.card} ${currentTheme.shadow} ${currentTheme.border} transition-all`}
            >
              <div className="relative mb-4">
                <div
                  className={`w-20 h-20 rounded-full ${
                    theme === "dark" ? "bg-gray-700" : "bg-gray-100"
                  } flex items-center justify-center mb-2 overflow-hidden`}
                >
                  {pub.logo ? (
                    <img
                      src={pub.logo}
                      alt={pub.name}
                      className="h-16 w-16 object-contain"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/80";
                      }}
                    />
                  ) : (
                    <FaGlobe className="text-3xl text-gray-400" />
                  )}
                </div>
                {pub.isPremium && (
                  <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-800 p-1 rounded-full">
                    <FaStar className="text-xs" />
                  </div>
                )}
              </div>

              <h3 className={`font-bold text-center mb-1 ${currentTheme.text}`}>
                {pub.name}
              </h3>

              <div className="mt-3 w-full">
                <div
                  className={`h-1 rounded-full ${
                    theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                  } overflow-hidden`}
                >
                  <div
                    className="h-full bg-blue-500"
                    style={{
                      width: `${Math.min((pub.articleCount || 0) * 10, 100)}%`,
                    }}
                  ></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {publishers.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`rounded-xl p-8 text-center ${currentTheme.card} ${currentTheme.border}`}
          >
            <FaNewspaper
              className={`mx-auto text-4xl mb-4 ${currentTheme.heading}`}
            />
            <h3 className={`text-xl font-medium mb-2 ${currentTheme.text}`}>
              No Publishers Found
            </h3>
            <p
              className={`${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              There are currently no publishers available.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default AllPublishers;
