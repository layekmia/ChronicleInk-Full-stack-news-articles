import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaNewspaper,
  FaSearch,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
  FaRegClock,
  FaRegCalendarAlt,
} from "react-icons/fa";
import {
  MdEmail,
  MdLocationOn,
  MdPhone,
  MdOutlineContactPage,
} from "react-icons/md";
import { useTheme } from "../context/ThemeContext";

const Footer = () => {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Theme-based styles
  const bgColor = theme === "dark" ? "bg-gray-900" : "bg-[#1a1a2e]";
  const textColor = theme === "dark" ? "text-gray-300" : "text-gray-100";
  const hoverText =
    theme === "dark" ? "hover:text-blue-400" : "hover:text-blue-300";
  const borderColor = theme === "dark" ? "border-gray-700" : "border-[#2a2a40]";
  const accentColor = theme === "dark" ? "text-blue-400" : "text-blue-300";
  const cardBg = theme === "dark" ? "bg-gray-800" : "bg-[#16213e]";

  const sections = [
    { title: "News", subsections: ["Politics", "World", "Business"] },
    { title: "Opinion", subsections: ["Editorials", "Columns", "Letters"] },
    { title: "Arts", subsections: ["Books", "Movies", "Theater"] },
    { title: "Living", subsections: ["Food", "Health", "Style"] },
  ];

  const handleSubscribe = (e) => {
    e.preventDefault();
    setIsSubscribed(true);
    setTimeout(() => setIsSubscribed(false), 3000);
  };

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className={`${bgColor} ${textColor} pt-16 pb-8 transition-colors duration-500`}
    >
      {/* Breaking News Ticker - Fixed Version */}
      <motion.div
        className={`${cardBg} py-3 px-0 mb-8 overflow-hidden`}
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center">
          <motion.div
            className="flex items-center ml-4 shrink-0"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <FaNewspaper className="text-red-500 mr-2" />
            <span className="font-bold">BREAKING:</span>
          </motion.div>

          <div className="relative w-full overflow-hidden">
            {/* Left gradient fade - can remove if not needed */}
            <div className="absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-[#1a1a2e] to-transparent"></div>

            <motion.div
              className="whitespace-nowrap inline-block pl-4"
              animate={{ x: ["0%", "-100%"] }}
              transition={{
                x: {
                  duration: 40,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
            >
              {[
                "• Global climate summit reaches historic agreement •",
                "• Tech giant unveils revolutionary AI system •",
                "• Markets rally on positive economic indicators •",
                "• Healthcare providers warn of seasonal virus surge •",
                "• Transportation dept announces high-speed rail projects •",
                "• Space agency reveals lunar base construction plans •",
              ].map((headline, index) => (
                <span
                  key={index}
                  className="mx-4 inline-block px-2 py-1 rounded-full bg-opacity-20 bg-gray-500"
                >
                  <motion.span
                    whileHover={{
                      scale: 1.05,
                      color: "#3b82f6",
                    }}
                    className="text-sm font-medium cursor-pointer transition-colors"
                  >
                    {headline}
                  </motion.span>
                </span>
              ))}
            </motion.div>

            {/* Right gradient fade - can remove if not needed */}
            <div className="absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-[#1a1a2e] to-transparent"></div>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto px-4">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Column */}
          <motion.div className="space-y-4" whileHover={{ y: -5 }}>
            <Link to="/" className="flex items-center group">
              <motion.div
                whileHover={{ rotate: -15 }}
                className="h-12 w-12 bg-white rounded-full flex items-center justify-center mr-3"
              >
                <FaNewspaper className="text-blue-900 text-2xl" />
              </motion.div>
              <motion.span
                className="text-3xl font-serif font-bold tracking-tight"
                whileHover={{ scale: 1.05 }}
              >
                ChronicleInk
              </motion.span>
            </Link>
            <p className="italic text-sm opacity-80">
              "Delivering truth with precision since 1892."
            </p>

            {/* Search Bar */}
            <motion.div className="relative" whileHover={{ scale: 1.02 }}>
              <input
                type="text"
                placeholder="Search archives..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full py-2 px-4 pr-10 rounded-full ${cardBg} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              <FaSearch className="absolute right-3 top-2.5 opacity-70" />
            </motion.div>

            {/* Social Links */}
            <div className="flex space-x-4 pt-2">
              {[
                { icon: FaTwitter, color: "#1DA1F2" },
                { icon: FaLinkedin, color: "#0077B5" },
                { icon: FaYoutube, color: "#FF0000" },
              ].map(({ icon: Icon, color }, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="transition"
                  style={{ color }}
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Newspaper Sections */}
          {sections.map((section, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <h3
                className={`text-lg font-bold mb-4 pb-2 ${borderColor} border-b uppercase tracking-wider`}
              >
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.subsections.map((item, j) => (
                  <motion.li key={j} whileHover={{ x: 5 }}>
                    <Link
                      to={`/${section.title.toLowerCase()}/${item.toLowerCase()}`}
                      className={`${hoverText} transition flex items-center text-sm`}
                    >
                      <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
                      {item}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Premium Subscription */}
        <motion.div
          className={`${cardBg} rounded-xl p-8 mb-12 overflow-hidden relative`}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600 opacity-10 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-800 opacity-5 rounded-full -ml-32 -mb-32"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-2">
                Premium Digital Access
              </h3>
              <p className="opacity-90 mb-4">
                Unlimited articles, exclusive content, and ad-free experience.
              </p>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center">
                  <FaRegClock className="mr-2" />
                  <span>24/7 Access</span>
                </div>
                <div className="flex items-center">
                  <FaRegCalendarAlt className="mr-2" />
                  <span>Daily Editions</span>
                </div>
              </div>
            </div>

            <AnimatePresence>
              {isSubscribed ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-green-600 text-white p-4 rounded-lg"
                >
                  Thank you for subscribing!
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubscribe}
                  className="flex flex-col sm:flex-row gap-2"
                >
                  <input
                    type="email"
                    placeholder="Your email address"
                    required
                    className={`flex-grow px-4 py-3 rounded-lg ${
                      theme === "dark" ? "bg-gray-700" : "bg-gray-100"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition"
                  >
                    Subscribe Now
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Bottom Footer */}
        <div className={`border-t ${borderColor} pt-8`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
            {/* Contact Info */}
            <div>
              <h4 className="font-bold mb-4 uppercase tracking-wider text-sm">
                Contact Us
              </h4>
              <ul className="space-y-3">
                <motion.li className="flex items-start" whileHover={{ x: 5 }}>
                  <MdLocationOn
                    className={`${accentColor} mt-1 mr-2`}
                    size={18}
                  />
                  <span>123 Press Avenue, Media District, NY 10001</span>
                </motion.li>
                <motion.li className="flex items-center" whileHover={{ x: 5 }}>
                  <MdPhone className={`${accentColor} mr-2`} size={18} />
                  <a
                    href="tel:+12125551234"
                    className={`${hoverText} transition`}
                  >
                    +1 (212) 555-1234
                  </a>
                </motion.li>
                <motion.li className="flex items-center" whileHover={{ x: 5 }}>
                  <MdEmail className={`${accentColor} mr-2`} size={18} />
                  <a
                    href="mailto:newsroom@chronicleink.com"
                    className={`${hoverText} transition`}
                  >
                    newsroom@chronicleink.com
                  </a>
                </motion.li>
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold mb-4 uppercase tracking-wider text-sm">
                Quick Links
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {[
                  "About Us",
                  "Careers",
                  "Advertise",
                  "Archive",
                  "Corrections",
                  "Ethics Policy",
                ].map((item, i) => (
                  <motion.div key={i} whileHover={{ x: 5 }}>
                    <Link
                      to={`/${item.toLowerCase().replace(" ", "-")}`}
                      className={`${hoverText} transition text-sm flex items-center`}
                    >
                      <MdOutlineContactPage
                        className="mr-2 opacity-70"
                        size={14}
                      />
                      {item}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-bold mb-4 uppercase tracking-wider text-sm">
                Legal
              </h4>
              <ul className="space-y-2 text-sm">
                {[
                  "Terms of Service",
                  "Privacy Policy",
                  "Cookie Policy",
                  "GDPR",
                ].map((item, i) => (
                  <motion.li key={i} whileHover={{ x: 5 }}>
                    <Link
                      to={`/${item.toLowerCase().replace(" ", "-")}`}
                      className={`${hoverText} transition`}
                    >
                      {item}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-gray-800">
            <p className="text-xs opacity-70 mb-3 md:mb-0">
              © {new Date().getFullYear()} ChronicleInk Media. All rights
              reserved.
            </p>
            <div className="flex space-x-4 text-xs">
              <span>ISSN 1234-5678</span>
              <span>USPS 123-456</span>
              <span>Member: The Associated Press</span>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
