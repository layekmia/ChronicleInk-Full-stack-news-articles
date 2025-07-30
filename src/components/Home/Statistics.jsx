import { useRef, useState } from "react";
import { useInView, motion } from "framer-motion";
import CountUp from "react-countup";
import { useTheme } from "../../context/ThemeContext";
import {
  FaUsers,
  FaNewspaper,
  FaCrown,
  FaPenAlt,
  FaChartLine,
} from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";

const Statistics = () => {
  const { theme } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const [hoveredCard, setHoveredCard] = useState(null);

  const statsData = {
    totalUsers: 12547,
    normalUsers: 9342,
    premiumUsers: 3205,
    articlesPublished: 18463,
    dailyReaders: 8721,
  };

  const containerBg =
    theme === "dark"
      ? "bg-gradient-to-br from-gray-900 to-gray-800"
      : "bg-gradient-to-br from-blue-50 to-indigo-50";
  const cardBg =
    theme === "dark"
      ? "bg-gradient-to-br from-gray-800 to-gray-700"
      : "bg-gradient-to-br from-white to-gray-50";
  const textColor = theme === "dark" ? "text-gray-100" : "text-gray-800";
  const highlightColor = theme === "dark" ? "text-blue-300" : "text-blue-600";

  const statConfigs = [
    {
      title: "Total Readers",
      value: statsData.totalUsers,
      icon: <FaUsers className="text-3xl" />,
      color: "from-blue-400 to-blue-600",
      hoverGlow:
        "bg-gradient-to-br from-blue-400/10 via-blue-600/5 to-transparent",
      suffix: "+",
      description: "Daily active subscribers",
    },
    {
      title: "Free Members",
      value: statsData.normalUsers,
      icon: <FaNewspaper className="text-3xl" />,
      color: "from-green-400 to-green-600",
      hoverGlow:
        "bg-gradient-to-br from-green-400/10 via-green-600/5 to-transparent",
      description: "Engaged with our free content",
    },
    {
      title: "Premium Subscribers",
      value: statsData.premiumUsers,
      icon: <FaCrown className="text-3xl" />,
      color: "from-purple-400 to-purple-600",
      hoverGlow:
        "bg-gradient-to-br from-purple-400/10 via-purple-600/5 to-transparent",
      description: "Enjoying exclusive benefits",
    },
    {
      title: "Articles Published",
      value: statsData.articlesPublished,
      icon: <FaPenAlt className="text-3xl" />,
      color: "from-yellow-400 to-yellow-600",
      hoverGlow:
        "bg-gradient-to-br from-yellow-400/10 via-yellow-600/5 to-transparent",
      description: "In-depth stories and reports",
    },
    {
      title: "Daily Readers",
      value: statsData.dailyReaders,
      icon: <FaChartLine className="text-3xl" />,
      color: "from-pink-400 to-pink-600",
      hoverGlow:
        "bg-gradient-to-br from-pink-400/10 via-pink-600/5 to-transparent",
      description: "Regularly consuming content",
    },
  ];

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`relative py-16 px-4 overflow-hidden ${containerBg}`}
    >
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -left-20 -top-20 w-64 h-64 rounded-full bg-blue-400/10 blur-xl"
      />
      <motion.div
        animate={{
          x: [0, -100, 0],
          y: [0, 50, 0],
          rotate: [0, -180, -360],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -right-20 -bottom-20 w-72 h-72 rounded-full bg-purple-400/10 blur-xl"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-block mb-4"
          >
            <div
              className={`text-5xl font-bold mb-3 bg-clip-text text-transparent ${
                theme === "dark"
                  ? "bg-gradient-to-r from-blue-300 to-purple-400"
                  : "bg-gradient-to-r from-blue-600 to-purple-600"
              }`}
            >
              ChronicleInk By The Numbers
            </div>
          </motion.div>
          <p className={`text-xl max-w-2xl mx-auto ${textColor}`}>
            Our growing community of readers and contributors powering quality
            journalism
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {statConfigs.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: index * 0.1,
                type: "spring",
                stiffness: 100,
              }}
              whileHover={{ y: -10 }}
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
              className={`relative rounded-2xl p-6 ${cardBg} shadow-lg border ${
                theme === "dark" ? "border-gray-700" : "border-gray-200"
              } transition-all duration-300`}
              style={{
                transformStyle: "preserve-3d",
                zIndex: hoveredCard === index ? 10 : 1,
              }}
            >
              {hoveredCard === index && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={`absolute inset-0 rounded-2xl pointer-events-none ${stat.hoverGlow}`}
                />
              )}

              <motion.div
                animate={{
                  rotate: hoveredCard === index ? [0, 10, -10, 0] : 0,
                  scale: hoveredCard === index ? [1, 1.1, 1] : 1,
                }}
                className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 bg-gradient-to-br ${stat.color} text-white shadow-md`}
              >
                {stat.icon}
              </motion.div>

              <div className="flex items-end mb-2">
                <motion.p
                  className={`text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-br ${stat.color}`}
                >
                  {isInView ? (
                    <CountUp
                      end={stat.value}
                      duration={2.5}
                      separator=","
                      delay={index * 0.15}
                    />
                  ) : (
                    "0"
                  )}
                  {stat.suffix}
                </motion.p>
              </div>

              <h3 className={`text-lg font-semibold mb-1 ${textColor}`}>
                {stat.title}
              </h3>
              <p
                className={`text-sm ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {stat.description}
              </p>

              <motion.div
                className="mt-4 h-1.5 bg-gray-200 rounded-full overflow-hidden"
                initial={{ width: 0 }}
                animate={isInView ? { width: "100%" } : {}}
                transition={{ delay: index * 0.2 + 0.5, duration: 1.5 }}
              >
                <div
                  className={`h-full bg-gradient-to-r ${stat.color}`}
                  style={{
                    width: `${
                      (stat.value /
                        Math.max(...statConfigs.map((s) => s.value))) *
                      100
                    }%`,
                  }}
                />
              </motion.div>

              <motion.button
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
                className={`mt-4 flex items-center text-sm font-medium ${
                  theme === "dark"
                    ? "text-blue-300 hover:text-blue-200"
                    : "text-blue-600 hover:text-blue-800"
                }`}
              >
                Learn more <FiArrowRight className="ml-1" />
              </motion.button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2 }}
          className="mt-16 text-center"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className={`inline-block px-6 py-3 rounded-full ${
              theme === "dark"
                ? "bg-gray-700 hover:bg-gray-600"
                : "bg-white hover:bg-gray-100"
            } shadow-md transition-all`}
          >
            <p className={`font-medium ${textColor}`}>
              <span className="font-bold">
                {Math.round(
                  (statsData.premiumUsers / statsData.totalUsers) * 100
                )}
                %
              </span>{" "}
              of readers upgrade to premium within 3 months
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Statistics;
