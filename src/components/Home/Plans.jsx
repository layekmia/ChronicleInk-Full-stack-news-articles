import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import {
  motion,
  useMotionValue,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  FaCheck,
  FaNewspaper,
  FaUsers,
  FaChartLine,
  FaGem,
  FaArrowRight,
  FaRegClock,
  FaSearch,
  FaBookmark,
  FaRegCalendarCheck,
  FaDatabase,
  FaFilePdf,
  FaUserTie,
  FaChild,
  FaFilter,
  FaMobileAlt,
  FaGift,
  FaCalendarAlt,
  FaBookOpen,
  FaBook,
  FaBookReader,
  FaTicketAlt,
  FaTree,
} from "react-icons/fa";
import { FiZap } from "react-icons/fi";

const PricingPlans = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [hoveredPlan, setHoveredPlan] = useState(null);
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [expandedPlan, setExpandedPlan] = useState(null);

  // 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  // Theme-based colors
  const cardBg =
    theme === "dark"
      ? "bg-gradient-to-br from-gray-900 to-gray-800"
      : "bg-gradient-to-br from-white to-gray-50";
  const highlightBg =
    theme === "dark"
      ? "bg-gradient-to-r from-blue-600 to-indigo-600"
      : "bg-gradient-to-r from-blue-500 to-indigo-500";
  const textColor = theme === "dark" ? "text-gray-100" : "text-gray-900";
  const secondaryText = theme === "dark" ? "text-gray-400" : "text-gray-600";
  const toggleBg = theme === "dark" ? "bg-gray-800" : "bg-gray-200";

  const plans = {
    monthly: [
      {
        id: 1,
        title: "Digital Reader",
        price: "FREE",
        period: "FOR 1 MONTH",
        afterPrice: "then $9.99/month",
        icon: <FaNewspaper className="text-blue-400" size={24} />,
        badge: "Most Popular",
        badgeColor: "bg-blue-500 text-white",
        buttonColor:
          "bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white",
        features: [
          {
            icon: <FaCheck className="text-green-400" />,
            text: "Access to all digital articles",
          },
          {
            icon: <FaRegClock className="text-blue-400" />,
            text: "Daily e-paper delivery",
          },
          {
            icon: <FaSearch className="text-purple-400" />,
            text: "Advanced search archive (30 days)",
          },
          {
            icon: <FaBookmark className="text-red-400" />,
            text: "Save up to 20 articles",
          },
          {
            icon: <FaRegCalendarCheck className="text-orange-400" />,
            text: "Cancel anytime",
          },
        ],
        terms: "Limited time offer for new subscribers only.",
        details: [
          "Unlimited access to current news",
          "Morning briefing newsletter",
          "Personalized news feed",
          "Basic article sharing",
        ],
        glow: "from-blue-400/20 via-indigo-500/10 to-transparent",
      },
      {
        id: 2,
        title: "Premium Analyst",
        price: "$14.99",
        period: "PER MONTH",
        icon: <FaChartLine className="text-purple-400" size={24} />,
        buttonColor:
          "bg-gradient-to-r from-purple-400 to-purple-500 hover:from-purple-500 hover:to-purple-600 text-white",
        features: [
          {
            icon: <FaCheck className="text-green-400" />,
            text: "All Digital Reader benefits",
          },
          {
            icon: <FaDatabase className="text-blue-400" />,
            text: "Full historical archive access",
          },
          {
            icon: <FaFilePdf className="text-red-400" />,
            text: "PDF edition downloads",
          },
          {
            icon: <FaBookmark className="text-yellow-400" />,
            text: "Unlimited saved articles",
          },
          {
            icon: <FaUserTie className="text-indigo-400" />,
            text: "Exclusive columnist access",
          },
        ],
        terms: "For professionals and news enthusiasts.",
        details: [
          "In-depth investigative reports",
          "Market analysis reports",
          "Extended article comments",
          "Ad-free reading experience",
          "Premium newsletters",
        ],
        glow: "from-purple-400/20 via-pink-500/10 to-transparent",
      },
      {
        id: 3,
        title: "Family Edition",
        price: "$19.99",
        period: "PER MONTH",
        icon: <FaUsers className="text-green-400" size={24} />,
        badge: "Best Value",
        badgeColor: "bg-green-500 text-white",
        buttonColor:
          "bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white",
        features: [
          {
            icon: <FaCheck className="text-green-400" />,
            text: "Up to 5 user accounts",
          },
          {
            icon: <FaChild className="text-pink-400" />,
            text: "Kids news section",
          },
          {
            icon: <FaFilter className="text-purple-400" />,
            text: "Content filters",
          },
          {
            icon: <FaMobileAlt className="text-blue-400" />,
            text: "Simultaneous device access",
          },
          {
            icon: <FaGift className="text-red-400" />,
            text: "Weekly print edition",
          },
        ],
        terms: "For households with multiple readers.",
        details: [
          "Personalized profiles for each member",
          "Educational resources",
          "Family sharing features",
          "Sunday magazine supplement",
          "Priority customer support",
        ],
        glow: "from-green-400/20 via-teal-500/10 to-transparent",
      },
    ],
    annual: [
      {
        id: 1,
        title: "Digital Reader",
        price: "$89",
        period: "PER YEAR",
        afterPrice: "Save $30.88 vs monthly",
        icon: <FaNewspaper className="text-blue-400" size={24} />,
        badge: "Editor's Choice",
        badgeColor: "bg-blue-600 text-white",
        buttonColor:
          "bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white",
        features: [
          {
            icon: <FaCheck className="text-green-400" />,
            text: "All monthly Digital Reader benefits",
          },
          {
            icon: <FaCalendarAlt className="text-orange-400" />,
            text: "12 months for the price of 9",
          },
          {
            icon: <FaGift className="text-red-400" />,
            text: "Free commemorative edition",
          },
          {
            icon: <FaSearch className="text-purple-400" />,
            text: "Extended 90-day archive access",
          },
          {
            icon: <FaBookOpen className="text-indigo-400" />,
            text: "Annual digital yearbook",
          },
        ],
        terms: "Limited time annual subscription offer.",
        details: [
          "All standard digital features",
          "Special anniversary content",
          "Priority customer service",
          "Exclusive annual subscriber events",
          "Digital access to special editions",
        ],
        glow: "from-blue-400/20 via-indigo-500/10 to-transparent",
      },
      {
        id: 2,
        title: "Premium Analyst",
        price: "$149",
        period: "PER YEAR",
        afterPrice: "Save $30.88 vs monthly",
        icon: <FaChartLine className="text-purple-400" size={24} />,
        buttonColor:
          "bg-gradient-to-r from-purple-400 to-purple-500 hover:from-purple-500 hover:to-purple-600 text-white",
        features: [
          {
            icon: <FaCheck className="text-green-400" />,
            text: "All monthly Premium Analyst benefits",
          },
          {
            icon: <FaDatabase className="text-blue-400" />,
            text: "Unlimited archive access",
          },
          {
            icon: <FaFilePdf className="text-red-400" />,
            text: "Complete PDF edition library",
          },
          {
            icon: <FaUserTie className="text-indigo-400" />,
            text: "Invitation to annual summit",
          },
          {
            icon: <FaBook className="text-yellow-400" />,
            text: "Hardcover annual review",
          },
        ],
        terms: "For dedicated news professionals and analysts.",
        details: [
          "Complete digital access",
          "Professional research tools",
          "Data visualization tools",
          "Analyst briefings",
          "Premium subscriber webinars",
        ],
        glow: "from-purple-400/20 via-pink-500/10 to-transparent",
      },
      {
        id: 3,
        title: "Family Edition",
        price: "$199",
        period: "PER YEAR",
        afterPrice: "Save $40.88 vs monthly",
        icon: <FaUsers className="text-green-400" size={24} />,
        badge: "Family Favorite",
        badgeColor: "bg-green-600 text-white",
        buttonColor:
          "bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white",
        features: [
          {
            icon: <FaCheck className="text-green-400" />,
            text: "All monthly Family Edition benefits",
          },
          {
            icon: <FaCalendarAlt className="text-orange-400" />,
            text: "Annual family planner",
          },
          {
            icon: <FaBookReader className="text-indigo-400" />,
            text: "Educational supplements",
          },
          {
            icon: <FaTicketAlt className="text-red-400" />,
            text: "Discounts on events",
          },
          {
            icon: <FaTree className="text-blue-400" />,
            text: "Holiday special editions",
          },
        ],
        terms: "Perfect for households that value news literacy.",
        details: [
          "Complete family access",
          "Educational resources",
          "Family reading challenges",
          "Weekly print edition included",
          "Parental control dashboard",
        ],
        glow: "from-green-400/20 via-teal-500/10 to-transparent",
      },
    ],
  };

  const toggleBillingCycle = () => {
    setBillingCycle(billingCycle === "monthly" ? "annual" : "monthly");
  };

  const toggleExpandPlan = (planId) => {
    setExpandedPlan(expandedPlan === planId ? null : planId);
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const cardItem = {
    hidden: { y: 50, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
    hover: {
      y: -10,
      transition: { type: "spring", stiffness: 300 },
    },
  };

  const featureItem = {
    hidden: { x: -20, opacity: 0 },
    show: (i) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1 + 0.5,
        type: "spring",
        stiffness: 100,
      },
    }),
  };

  return (
    <motion.div
      className={`min-h-screen flex flex-col items-center justify-center px-4 py-12 ${
        theme === "dark"
          ? "bg-gray-950"
          : "bg-gradient-to-b from-gray-50 to-white"
      }`}
      initial="hidden"
      animate="show"
      variants={container}
      onPointerMove={(e) => {
        const bounds = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - bounds.x - bounds.width / 2) / 10);
        y.set((e.clientY - bounds.y - bounds.height / 2) / 10);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      <div className="max-w-7xl w-full">
        {/* Animated header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, 2, -2, 0],
            }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 8,
            }}
            className="inline-block mb-4"
          >
            <FiZap
              className={`text-4xl ${
                theme === "dark" ? "text-blue-400" : "text-blue-500"
              }`}
            />
          </motion.div>
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${textColor}`}>
            Stay Informed with Our Premium Plans
          </h1>
          <p className={`max-w-2xl mx-auto text-lg ${secondaryText}`}>
            Choose the subscription that fits your news consumption needs
          </p>

          {/* Billing Cycle Toggle */}
          <div className="flex justify-center items-center mt-8 mb-6">
            <span className={`mr-4 font-medium ${textColor}`}>Monthly</span>
            <button
              onClick={toggleBillingCycle}
              className={`relative w-16 h-8 rounded-full ${toggleBg} transition-colors duration-300`}
            >
              <motion.div
                className={`absolute top-1 w-6 h-6 rounded-full ${highlightBg} shadow-md`}
                animate={{
                  left: billingCycle === "monthly" ? "0.25rem" : "2.25rem",
                }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </button>
            <span className={`ml-4 font-medium ${textColor}`}>
              Annual (Save 15-20%)
            </span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Animated background element */}
          <motion.div
            animate={{
              x: ["0%", "20%", "0%"],
              y: ["0%", "-10%", "0%"],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -z-10 inset-0 opacity-20"
            style={{
              background:
                theme === "dark"
                  ? "radial-gradient(circle at center, #3b82f6 0%, transparent 50%)"
                  : "radial-gradient(circle at center, #3b82f6 0%, transparent 50%)",
            }}
          />

          {plans[billingCycle].map((plan) => (
            <motion.div
              key={plan.id}
              variants={cardItem}
              whileHover="hover"
              onHoverStart={() => setHoveredPlan(plan.id)}
              onHoverEnd={() => setHoveredPlan(null)}
              className={`relative rounded-2xl p-8 ${cardBg} border ${
                theme === "dark" ? "border-gray-800" : "border-gray-200"
              } shadow-xl overflow-hidden flex flex-col h-full`}
              style={{
                transformStyle: "preserve-3d",
                rotateX: hoveredPlan === plan.id ? rotateX : 0,
                rotateY: hoveredPlan === plan.id ? rotateY : 0,
                zIndex: hoveredPlan === plan.id ? 10 : 1,
              }}
            >
              {/* Glow effect */}
              <AnimatePresence>
                {hoveredPlan === plan.id && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={`absolute inset-0 bg-gradient-to-br ${plan.glow} pointer-events-none`}
                  />
                )}
              </AnimatePresence>

              {/* Badge */}
              {plan.badge && (
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={`absolute top-4 right-4 ${plan.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full flex items-center`}
                >
                  <FaGem className="mr-1" size={10} />
                  {plan.badge}
                </motion.div>
              )}

              {/* Plan header */}
              <div className="flex items-center mb-6">
                <motion.div
                  animate={{
                    rotate: hoveredPlan === plan.id ? [0, 15, -15, 0] : 0,
                    scale: hoveredPlan === plan.id ? [1, 1.1, 1] : 1,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  {plan.icon}
                </motion.div>
                <h2 className={`text-2xl font-bold ml-3 ${textColor}`}>
                  {plan.title}
                </h2>
              </div>

              {/* Price */}
              <motion.div
                className="mb-8"
                animate={{
                  scale: hoveredPlan === plan.id ? 1.05 : 1,
                }}
              >
                <p className={`text-4xl font-bold mb-1 ${textColor}`}>
                  {plan.price}
                </p>
                <p
                  className={`text-sm uppercase tracking-wider ${secondaryText}`}
                >
                  {plan.period}
                </p>
                {plan.afterPrice && (
                  <p className={`text-sm ${secondaryText} mt-2`}>
                    {plan.afterPrice}
                  </p>
                )}
              </motion.div>

              {/* Features list */}
              <ul className="mb-6 space-y-3">
                {plan.features.map((feature, i) => (
                  <motion.li
                    key={i}
                    custom={i}
                    variants={featureItem}
                    className="flex items-start"
                    whileHover={{ x: 5 }}
                  >
                    <span className="mt-1 mr-3">{feature.icon}</span>
                    <span className={`text-sm ${textColor}`}>
                      {feature.text}
                    </span>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-auto">
                {/* CTA button */}
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow:
                      theme === "dark"
                        ? "0 10px 25px -5px rgba(59, 130, 246, 0.4)"
                        : "0 10px 25px -5px rgba(59, 130, 246, 0.4)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/subscription")}
                  className={`w-full ${plan.buttonColor} text-white font-bold py-4 rounded-xl flex items-center justify-center mb-4`}
                >
                  {plan.id === 1 && billingCycle === "monthly"
                    ? "Try free for 1 month"
                    : `Get ${plan.title}`}
                  <FaArrowRight className="ml-2" />
                </motion.button>

                {/* Expandable details */}
                <div className="text-center">
                  <button
                    onClick={() => toggleExpandPlan(plan.id)}
                    className={`text-xs ${secondaryText} flex items-center justify-center w-full`}
                  >
                    {expandedPlan === plan.id ? (
                      <>
                        <span>Show less</span>
                      </>
                    ) : (
                      <>
                        <span>See all features</span>
                      </>
                    )}
                  </button>
                </div>

                <AnimatePresence>
                  {expandedPlan === plan.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
                        <h4
                          className={`text-sm font-semibold mb-2 ${textColor}`}
                        >
                          All Features Included:
                        </h4>
                        <ul className={`space-y-2 text-sm ${secondaryText}`}>
                          {plan.details.map((detail, index) => (
                            <li key={index} className="flex items-start">
                              <FaCheck
                                className={`mt-1 mr-2 ${
                                  theme === "dark"
                                    ? "text-blue-400"
                                    : "text-blue-600"
                                }`}
                                size={12}
                              />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <p className={`text-xs mt-4 ${secondaryText}`}>
                  {plan.terms}{" "}
                  <a href="#" className="underline hover:text-blue-400">
                    Terms apply
                  </a>
                  .
                </p>
              </div>

              {/* Floating particles (visible on hover) */}
              <AnimatePresence>
                {hoveredPlan === plan.id && (
                  <>
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                          opacity: [0, 1, 0],
                          scale: [0, 1, 0],
                          x: Math.random() * 100 - 50,
                          y: Math.random() * 100 - 50,
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                        className={`absolute w-2 h-2 rounded-full ${
                          theme === "dark" ? "bg-blue-400" : "bg-blue-500"
                        }`}
                        style={{
                          top: `${Math.random() * 80 + 10}%`,
                          left: `${Math.random() * 80 + 10}%`,
                        }}
                      />
                    ))}
                  </>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Enterprise/Contact Option */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className={`mt-12 border rounded-xl p-8 ${cardBg} ${
            theme === "dark" ? "border-gray-800" : "border-gray-200"
          } shadow-lg text-center`}
        >
          <h2 className={`text-2xl font-bold mb-2 ${textColor}`}>
            Need institutional access?
          </h2>
          <p className={`max-w-2xl mx-auto mb-6 ${secondaryText}`}>
            We offer custom solutions for schools, libraries and businesses.
          </p>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={`px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-semibold shadow-md`}
          >
            Contact Our Institutional Team
          </motion.button>
        </motion.div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className={`text-center mt-16 text-sm ${secondaryText}`}
        >
          <p>
            All plans come with a 30-day money-back guarantee. Cancel anytime.
          </p>
          <p className="mt-2">
            <a href="#" className="underline hover:text-blue-400">
              Terms and conditions
            </a>{" "}
            apply.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PricingPlans;
