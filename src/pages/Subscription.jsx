import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import {
  FaCheck,
  FaNewspaper,
  FaChartLine,
  FaUsers,
  FaGem,
  FaArrowRight,
  FaCalendarAlt,
  FaGift,
  FaSearch,
  FaBookOpen,
  FaDatabase,
  FaFilePdf,
  FaUserTie,
  FaBook,
  FaChild,
  FaFilter,
  FaMobileAlt,
  FaBookReader,
  FaTicketAlt,
  FaTree,
  FaRegClock,
  FaBookmark,
  FaRegCalendarCheck,
} from "react-icons/fa";
import { FiZap } from "react-icons/fi";
import Checkout from "../components/Checkout";

const Subscription = () => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [price, setPrice] = useState(0);
  const [hoveredPlan, setHoveredPlan] = useState(null);
  const [planDuration, setPlanDuration] = useState("monthly");

  const plans = {
    monthly: [
      {
        id: 1,
        title: "Digital Reader",
        price: "FREE",
        numericPrice: 0,
        period: "FOR 1 MONTH",
        afterPrice: "then $9.99/month",
        duration: 1,
        unit: "month",
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
        numericPrice: 14.99,
        period: "PER MONTH",
        duration: 1,
        unit: "month",
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
        numericPrice: 19.99,
        period: "PER MONTH",
        duration: 1,
        unit: "month",
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
        numericPrice: 89,
        period: "PER YEAR",
        duration: 1,
        unit: "year",
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
        numericPrice: 149,
        period: "PER YEAR",
        duration: 1,
        unit: "year",
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
        numericPrice: 199,
        period: "PER YEAR",
        duration: 1,
        unit: "year",
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
    quickAccess: [
      {
        id: 4,
        title: "Trial Access",
        price: "$1",
        numericPrice: 1,
        period: "FOR 1 MINUTE",
        duration: 1,
        unit: "minute",
        icon: <FaNewspaper className="text-blue-400" size={24} />,
        badge: "Popular",
        badgeColor: "bg-blue-500 text-white",
        buttonColor:
          "bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white",
        features: [
          {
            icon: <FaCheck className="text-green-400" />,
            text: "Full access for 1 minute",
          },
          {
            icon: <FaSearch className="text-purple-400" />,
            text: "Preview premium content",
          },
          {
            icon: <FaRegCalendarCheck className="text-orange-400" />,
            text: "No commitment",
          },
          {
            icon: <FaBookmark className="text-red-400" />,
            text: "Cancel anytime",
          },
        ],
        terms: "Instant access with no long-term commitment.",
        details: [
          "Quick preview of premium features",
          "No credit card required",
          "Instant activation",
        ],
        glow: "from-blue-400/20 via-indigo-500/10 to-transparent",
      },
      {
        id: 5,
        title: "Short Term",
        price: "$5",
        numericPrice: 5,
        period: "FOR 5 DAYS",
        duration: 5,
        unit: "day",
        icon: <FaChartLine className="text-purple-400" size={24} />,
        buttonColor:
          "bg-gradient-to-r from-purple-400 to-purple-500 hover:from-purple-500 hover:to-purple-600 text-white",
        features: [
          {
            icon: <FaCheck className="text-green-400" />,
            text: "5 days unlimited access",
          },
          {
            icon: <FaDatabase className="text-blue-400" />,
            text: "All premium articles",
          },
          {
            icon: <FaFilePdf className="text-red-400" />,
            text: "Ad-free experience",
          },
          {
            icon: <FaBook className="text-yellow-400" />,
            text: "Download content",
          },
        ],
        terms: "Perfect for short-term needs.",
        details: [
          "Full feature access",
          "Ideal for weekend reading",
          "Temporary access solution",
        ],
        glow: "from-purple-400/20 via-pink-500/10 to-transparent",
      },
      {
        id: 6,
        title: "Extended Access",
        price: "$10",
        numericPrice: 10,
        period: "FOR 10 DAYS",
        duration: 10,
        unit: "day",
        icon: <FaUsers className="text-green-400" size={24} />,
        badge: "Best Value",
        badgeColor: "bg-green-500 text-white",
        buttonColor:
          "bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white",
        features: [
          {
            icon: <FaCheck className="text-green-400" />,
            text: "10 days full access",
          },
          {
            icon: <FaUserTie className="text-indigo-400" />,
            text: "Priority support",
          },
          {
            icon: <FaMobileAlt className="text-blue-400" />,
            text: "Offline reading",
          },
          {
            icon: <FaGift className="text-red-400" />,
            text: "Exclusive content",
          },
        ],
        terms: "Best option for extended trial periods.",
        details: [
          "Extended trial period",
          "Premium features included",
          "Full customer support",
        ],
        glow: "from-green-400/20 via-teal-500/10 to-transparent",
      },
    ],
  };

  const themeStyles = {
    light: {
      bg: "bg-gradient-to-b from-gray-50 to-white",
      cardBg: "bg-white",
      text: "text-gray-800",
      secondaryText: "text-gray-600",
      border: "border-gray-200",
      primary: "from-purple-500 to-indigo-500",
      primaryHover: "hover:from-purple-600 hover:to-indigo-600",
      highlight: "bg-purple-50",
      toggleBg: "bg-gray-200",
      toggleActive: "bg-white shadow-md",
    },
    dark: {
      bg: "bg-gradient-to-b from-gray-900 to-gray-950",
      cardBg: "bg-gray-800",
      text: "text-gray-100",
      secondaryText: "text-gray-400",
      border: "border-gray-700",
      primary: "from-purple-600 to-indigo-600",
      primaryHover: "hover:from-purple-700 hover:to-indigo-700",
      highlight: "bg-purple-900/30",
      toggleBg: "bg-gray-700",
      toggleActive: "bg-gray-600 shadow-md",
    },
  };

  const currentTheme = themeStyles[theme] || themeStyles.light;

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const cardItem = {
    hidden: { y: 50, opacity: 0 },
    visible: {
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
    visible: (i) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1 + 0.5,
      },
    }),
  };

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setPrice(plan.numericPrice);
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={container}
      className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 ${currentTheme.bg}`}
    >
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className={`relative rounded-xl overflow-hidden shadow-lg mb-10 bg-gradient-to-r ${currentTheme.primary}`}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <div className="px-6 py-16 md:py-20 text-center relative">
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="inline-block mb-4"
          >
            <FiZap className="text-4xl text-yellow-300" />
          </motion.div>
          <motion.h2
            className="text-3xl md:text-4xl font-extrabold text-white mb-4"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            Unlock Premium Content
          </motion.h2>
          <motion.p
            className="text-lg text-white/90 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Choose the subscription plan that works best for you
          </motion.p>
        </div>
      </motion.div>

      <div className="flex justify-center mb-8">
        <div className={`inline-flex rounded-lg p-1 ${currentTheme.toggleBg}`}>
          <button
            onClick={() => setPlanDuration("monthly")}
            className={`px-4 py-2 rounded-md ${
              planDuration === "monthly" ? currentTheme.toggleActive : ""
            } ${currentTheme.text}`}
          >
            Monthly Plans
          </button>
          <button
            onClick={() => setPlanDuration("annual")}
            className={`px-4 py-2 rounded-md ${
              planDuration === "annual" ? currentTheme.toggleActive : ""
            } ${currentTheme.text}`}
          >
            Annual Plans
          </button>
          <button
            onClick={() => setPlanDuration("quickAccess")}
            className={`px-4 py-2 rounded-md ${
              planDuration === "quickAccess" ? currentTheme.toggleActive : ""
            } ${currentTheme.text}`}
          >
            Quick Access
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans[planDuration].map((plan) => (
          <motion.div
            key={`${planDuration}-${plan.id}`}
            variants={cardItem}
            whileHover="hover"
            onClick={() => handlePlanSelect(plan)}
            onHoverStart={() => setHoveredPlan(`${planDuration}-${plan.id}`)}
            onHoverEnd={() => setHoveredPlan(null)}
            className={`relative rounded-xl p-8 ${currentTheme.cardBg} border ${
              currentTheme.border
            } shadow-lg overflow-hidden flex flex-col h-full cursor-pointer transition-all ${
              selectedPlan?.id === plan.id && selectedPlan?.title === plan.title
                ? `${currentTheme.highlight} ring-2 ring-purple-500`
                : ""
            }`}
          >
            <AnimatePresence>
              {hoveredPlan === `${planDuration}-${plan.id}` && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={`absolute inset-0 bg-gradient-to-br ${plan.glow} pointer-events-none`}
                />
              )}
            </AnimatePresence>

            {plan.badge && (
              <motion.div
                whileHover={{ scale: 1.1 }}
                className={`absolute top-4 right-4 ${plan.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full flex items-center`}
              >
                <FaGem className="mr-1" size={10} />
                {plan.badge}
              </motion.div>
            )}

            <div className="flex items-center mb-6">
              <motion.div
                animate={{
                  rotate:
                    hoveredPlan === `${planDuration}-${plan.id}`
                      ? [0, 15, -15, 0]
                      : 0,
                  scale:
                    hoveredPlan === `${planDuration}-${plan.id}`
                      ? [1, 1.1, 1]
                      : 1,
                }}
                transition={{ duration: 0.5 }}
              >
                {plan.icon}
              </motion.div>
              <h2 className={`text-2xl font-bold ml-3 ${currentTheme.text}`}>
                {plan.title}
              </h2>
            </div>

            <motion.div
              className="mb-4"
              animate={{
                scale: hoveredPlan === `${planDuration}-${plan.id}` ? 1.05 : 1,
              }}
            >
              <p className={`text-4xl font-bold mb-1 ${currentTheme.text}`}>
                {plan.price}
              </p>
              <p className={`text-sm ${currentTheme.secondaryText}`}>
                {plan.period}
              </p>
              {plan.afterPrice && (
                <p className={`text-xs mt-1 ${currentTheme.secondaryText}`}>
                  {plan.afterPrice}
                </p>
              )}
            </motion.div>

            <ul className="mb-6 space-y-3">
              {plan.features.map((feature, i) => (
                <motion.li
                  key={i}
                  custom={i}
                  variants={featureItem}
                  className="flex items-start"
                  whileHover={{ x: 5 }}
                >
                  {feature.icon || (
                    <FaCheck
                      className={`mt-1 mr-3 ${
                        theme === "dark" ? "text-green-400" : "text-green-500"
                      }`}
                    />
                  )}
                  <span className={`text-sm ${currentTheme.text}`}>
                    {feature.text || feature}
                  </span>
                </motion.li>
              ))}
            </ul>

            {plan.details && (
              <div className="mb-6">
                <h4
                  className={`text-xs font-semibold mb-2 ${currentTheme.secondaryText}`}
                >
                  INCLUDES:
                </h4>
                <ul className="space-y-1">
                  {plan.details.map((detail, i) => (
                    <li
                      key={i}
                      className={`text-xs ${currentTheme.secondaryText}`}
                    >
                      • {detail}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-auto">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow:
                    theme === "dark"
                      ? "0 10px 25px -5px rgba(59, 130, 246, 0.4)"
                      : "0 10px 25px -5px rgba(59, 130, 246, 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
                className={`w-full ${
                  plan.buttonColor || `bg-gradient-to-r ${currentTheme.primary}`
                } text-white font-bold py-4 rounded-xl flex items-center justify-center`}
              >
                {plan.price === "FREE" ? "Try Now" : "Subscribe Now"}
                <FaArrowRight className="ml-2" />
              </motion.button>
            </div>

            {plan.terms && (
              <p
                className={`text-xs mt-3 text-center ${currentTheme.secondaryText}`}
              >
                {plan.terms}
              </p>
            )}

            <AnimatePresence>
              {hoveredPlan === `${planDuration}-${plan.id}` && (
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

      <AnimatePresence>
        {selectedPlan && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`max-w-2xl mx-auto mt-8 p-6 rounded-xl ${currentTheme.cardBg} border ${currentTheme.border} shadow-md`}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h4 className={`font-bold ${currentTheme.text}`}>
                  Selected: {selectedPlan.title}
                </h4>
                <p className={`${currentTheme.secondaryText}`}>
                  {selectedPlan.price} {selectedPlan.period}
                </p>
                {selectedPlan.afterPrice && (
                  <p className={`text-xs mt-1 ${currentTheme.secondaryText}`}>
                    {selectedPlan.afterPrice}
                  </p>
                )}
              </div>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsOpen(true)}
                className={`mt-4 md:mt-0 px-6 py-3 rounded-lg ${
                  selectedPlan.buttonColor ||
                  `bg-gradient-to-r ${currentTheme.primary}`
                } text-white font-medium`}
              >
                Proceed to Payment <FaArrowRight className="inline ml-2" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isOpen && selectedPlan && (
        <Checkout
          setIsOpen={setIsOpen}
          amount={price}
          duration={selectedPlan.duration}
          unit={selectedPlan.unit}
          planName={selectedPlan.title}
        />
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className={`text-center mt-16 text-sm ${currentTheme.secondaryText}`}
      >
        <p>All plans come with a satisfaction guarantee. Cancel anytime.</p>
        <p className="mt-2">
          <a href="#" className="underline hover:text-purple-400">
            Terms and conditions
          </a>{" "}
          apply.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Subscription;
