import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import useAuth from "../hook/useAuth";
import { useTheme } from "../context/ThemeContext";
import {
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
} from "flowbite-react";
import {
  FaSun,
  FaMoon,
  FaUserCircle,
  FaTimes,
  FaBars,
  FaBell,
  FaSearch,
} from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn, slideIn, staggerContainer } from "../utils/motion";

const Navbar = () => {
  const { user, userSignOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [location]);

  // Navbar scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { path: "/", label: "Home", public: true },
    { path: "/all-articles", label: "All Articles", public: true },
    { path: "/add-article", label: "Add Articles", private: true },
    { path: "/subscription", label: "Subscription", private: true },
    { path: "/my-articles", label: "My Articles", private: true },
    {
      path: "/premium-articles",
      label: "Premium Articles",
      private: true,
      premiumOnly: true,
    },
    {
      path: "/admin/dashboard",
      label: "Dashboard",
      private: true,
      adminOnly: true,
    },
  ];

  const filteredLinks = navLinks.filter((link) => {
    if (link.public) return true;
    if (!user && link.private) return false;
    if (link.adminOnly && user?.role !== "admin") return false;
    if (link.premiumOnly && !user?.isPremiumTaken) return false;
    return true;
  });

  // Theme-based colors
  const navBg =
    theme === "dark"
      ? scrolled
        ? "bg-gray-900/95"
        : "bg-gray-900"
      : scrolled
      ? "bg-white/95"
      : "bg-white";

  const textColor = theme === "dark" ? "text-gray-100" : "text-gray-800";
  const hoverTextColor =
    theme === "dark" ? "hover:text-blue-400" : "hover:text-blue-600";
  const activeTextColor = theme === "dark" ? "text-blue-400" : "text-blue-600";
  const borderColor = theme === "dark" ? "border-gray-700" : "border-gray-200";
  const buttonBg =
    theme === "dark"
      ? "bg-gray-700 hover:bg-gray-600"
      : "bg-blue-50 hover:bg-blue-100";
  const mobileMenuBg = theme === "dark" ? "bg-gray-800" : "bg-white";
  // const searchBg = theme === "dark" ? "bg-gray-700" : "bg-gray-100";

  // const handleSearch = (e) => {
  //   e.preventDefault();
  //   // Implement search functionality
  //   console.log("Searching for:", searchQuery);
  // };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`shadow-lg sticky top-0 z-50 ${navBg} ${textColor} transition-all duration-300 backdrop-blur-sm`}
    >
      {/* Main Navigation Bar */}
      <div
        className={`max-w-8xl mx-auto px-4 py-3 flex items-center justify-between border-b ${borderColor}`}
      >
        {/* Logo and Mobile Menu Button */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/" className="flex items-center gap-2">
              <span className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
                ChronicleInk
              </span>
            </Link>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <FaTimes className="text-xl" />
            ) : (
              <FaBars className="text-xl" />
            )}
          </motion.button>
        </div>

        {/* Desktop Navigation */}
        <motion.ul
          className="hidden md:flex items-center gap-6 font-medium"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          {filteredLinks.map(({ path, label }, index) => (
            <motion.li
              key={path}
              variants={fadeIn("down", "spring", index * 0.1, 0.5)}
            >
              <NavLink
                to={path}
                className={({ isActive }) =>
                  isActive
                    ? `${activeTextColor} font-semibold relative`
                    : `${textColor} ${hoverTextColor} transition-colors relative`
                }
              >
                {label}
                {({ isActive }) =>
                  isActive && (
                    <motion.span
                      layoutId="navUnderline"
                      className="absolute left-0 -bottom-1 w-full h-0.5 bg-blue-500"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )
                }
              </NavLink>
            </motion.li>
          ))}
        </motion.ul>

        {/* Right Side Controls */}
        <div className="hidden md:flex items-center gap-4">

          {/* Notification Bell */}
          {user && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`p-2 rounded-full ${buttonBg} transition-colors relative`}
              aria-label="Notifications"
            >
              <FaBell className="text-lg" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </motion.button>
          )}

          {/* Theme Toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className={`p-2 rounded-full ${buttonBg} transition-colors`}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? (
              <FaSun className="text-yellow-400 text-xl" />
            ) : (
              <FaMoon className="text-gray-600 text-xl" />
            )}
          </motion.button>

          {/* User Controls */}
          {user ? (
            <Dropdown
              label=""
              dismissOnClick={false}
              renderTrigger={() => (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  {user.image ? (
                    <motion.img
                      src={user.image}
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-blue-500 hover:border-blue-600 transition-all"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    />
                  ) : (
                    <FaUserCircle className="text-3xl text-blue-500" />
                  )}
                </motion.div>
              )}
            >
              <DropdownHeader className={textColor}>
                <span className="block text-sm font-semibold">{user.name}</span>
                <span className="block truncate text-sm">{user.email}</span>
                {user.isPremiumTaken && (
                  <span className="block text-xs mt-1 px-2 py-1 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded-full w-fit">
                    Premium Member
                  </span>
                )}
              </DropdownHeader>
              <DropdownDivider className={borderColor} />
              <DropdownItem
                as={Link}
                to="/my-profile"
                className={`${textColor} hover:!bg-blue-50 dark:hover:!bg-gray-700`}
              >
                My Profile
              </DropdownItem>
              <DropdownItem
                as={Link}
                to="/settings"
                className={`${textColor} hover:!bg-blue-50 dark:hover:!bg-gray-700`}
              >
                Settings
              </DropdownItem>
              <DropdownItem
                onClick={userSignOut}
                className={`${textColor} hover:!bg-blue-50 dark:hover:!bg-gray-700`}
              >
                <div className="flex items-center gap-2">
                  <HiOutlineLogout />
                  <span>Sign Out</span>
                </div>
              </DropdownItem>
            </Dropdown>
          ) : (
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/login"
                  className={`px-4 py-2 rounded-md font-medium ${
                    theme === "dark"
                      ? "text-white hover:bg-gray-700"
                      : "text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  Login
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/register"
                  className={`px-4 py-2 rounded-md font-medium ${
                    theme === "dark"
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                  }`}
                >
                  Sign Up
                </Link>
              </motion.div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={`md:hidden ${mobileMenuBg} overflow-hidden`}
          >
            <div className="px-4 py-3 flex flex-col gap-4">
              {/* Theme Toggle in Mobile */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className={`p-2 rounded-full ${buttonBg} transition-colors w-fit flex items-center gap-2`}
                aria-label={`Switch to ${
                  theme === "dark" ? "light" : "dark"
                } mode`}
              >
                {theme === "dark" ? (
                  <>
                    <FaSun className="text-yellow-400 text-xl" />
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <FaMoon className="text-gray-600 text-xl" />
                    <span>Dark Mode</span>
                  </>
                )}
              </motion.button>

              {/* Mobile Navigation Links */}
              <motion.ul
                className="flex flex-col gap-4"
                variants={staggerContainer}
                initial="hidden"
                animate="show"
              >
                {filteredLinks.map(({ path, label }, index) => (
                  <motion.li
                    key={path}
                    variants={fadeIn("right", "spring", index * 0.1, 0.5)}
                  >
                    <NavLink
                      to={path}
                      className={({ isActive }) =>
                        `block py-2 px-3 rounded-md ${
                          isActive
                            ? `${activeTextColor} font-semibold bg-blue-100 dark:bg-gray-700`
                            : `${textColor} ${hoverTextColor} hover:bg-blue-50 dark:hover:bg-gray-700`
                        }`
                      }
                    >
                      {label}
                    </NavLink>
                  </motion.li>
                ))}
              </motion.ul>

              {/* Mobile Auth Buttons */}
              {user ? (
                <motion.div
                  className="flex flex-col gap-3 mt-4"
                  variants={slideIn("up", "spring", 0.2, 1)}
                >
                  <div className="flex items-center gap-3 px-3 py-2">
                    {user.image ? (
                      <motion.img
                        src={user.image}
                        alt={user.name}
                        className="w-8 h-8 rounded-full object-cover border-2 border-blue-500"
                        whileHover={{ scale: 1.1 }}
                      />
                    ) : (
                      <FaUserCircle className="text-2xl text-blue-500" />
                    )}
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm opacity-80">{user.email}</p>
                      {user.isPremiumTaken && (
                        <span className="text-xs mt-1 px-2 py-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded-full inline-block">
                          Premium
                        </span>
                      )}
                    </div>
                  </div>
                  <motion.div whileHover={{ scale: 1.01 }}>
                    <Link
                      to="/my-profile"
                      className={`px-4 py-2 rounded-md font-medium ${
                        theme === "dark"
                          ? "text-white hover:bg-gray-700"
                          : "text-blue-600 hover:bg-blue-50"
                      } text-left block`}
                    >
                      My Profile
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.01 }}>
                    <Link
                      to="/settings"
                      className={`px-4 py-2 rounded-md font-medium ${
                        theme === "dark"
                          ? "text-white hover:bg-gray-700"
                          : "text-blue-600 hover:bg-blue-50"
                      } text-left block`}
                    >
                      Settings
                    </Link>
                  </motion.div>
                  {user.role === "admin" && (
                    <motion.div whileHover={{ scale: 1.01 }}>
                      <Link
                        to="/admin/dashboard"
                        className={`px-4 py-2 rounded-md font-medium ${
                          theme === "dark"
                            ? "text-white hover:bg-gray-700"
                            : "text-blue-600 hover:bg-blue-50"
                        } text-left block`}
                      >
                        Admin Dashboard
                      </Link>
                    </motion.div>
                  )}
                  <motion.div whileHover={{ scale: 1.01 }}>
                    <button
                      onClick={() => {
                        userSignOut();
                      }}
                      className={`w-full px-4 py-2 rounded-md font-medium ${
                        theme === "dark"
                          ? "text-white hover:bg-gray-700"
                          : "text-blue-600 hover:bg-blue-50"
                      } text-left flex items-center gap-2`}
                    >
                      <HiOutlineLogout />
                      <span>Sign Out</span>
                    </button>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  className="flex flex-col gap-3 mt-4"
                  variants={slideIn("up", "spring", 0.2, 1)}
                >
                  <motion.div whileHover={{ scale: 1.02 }}>
                    <Link
                      to="/login"
                      className={`px-4 py-2 rounded-md font-medium text-center ${
                        theme === "dark"
                          ? "text-white hover:bg-gray-700"
                          : "text-blue-600 hover:bg-blue-50"
                      }`}
                    >
                      Login
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }}>
                    <Link
                      to="/register"
                      className={`px-4 py-2 rounded-md font-medium text-center ${
                        theme === "dark"
                          ? "bg-blue-600 hover:bg-blue-700 text-white"
                          : "bg-blue-500 hover:bg-blue-600 text-white"
                      }`}
                    >
                      Sign Up
                    </Link>
                  </motion.div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
