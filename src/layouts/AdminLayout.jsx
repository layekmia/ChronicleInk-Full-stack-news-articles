import React, { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import useAuth from "../hook/useAuth";
import {
  FaHome,
  FaUsers,
  FaNewspaper,
  FaBuilding,
  FaUser,
  FaSun,
  FaMoon,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaChartPie,
  FaChevronLeft,
} from "react-icons/fa";

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const userName = user?.name || "Admin";
  const { theme, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    {
      path: "",
      name: "Dashboard",
      icon: <FaChartPie size={18} />,
      color: "from-blue-400 to-indigo-500",
    },
    {
      path: "manage-articles",
      name: "Manage Articles",
      icon: <FaNewspaper size={18} />,
      color: "from-emerald-400 to-teal-500",
    },
    {
      path: "manage-users",
      name: "Manage Users",
      icon: <FaUsers size={18} />,
      color: "from-purple-400 to-fuchsia-500",
    },
    {
      path: "publisher",
      name: "Add Publisher",
      icon: <FaBuilding size={18} />,
      color: "from-amber-400 to-orange-500",
    },
  ];

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);
      await logout(); // Using the logout function from useAuth
      navigate("/");
      setSidebarOpen(false);
      setMobileSidebarOpen(false); // Close mobile sidebar if open
    } catch (error) {
      console.error("Sign out error:", error);
    } finally {
      setIsSigningOut(false);
    }
  };

  const sidebarVariants = {
    open: { width: 280 },
    closed: { width: 80 },
  };

  const mobileSidebarVariants = {
    open: { x: 0 },
    closed: { x: "-100%" },
  };
  // className={`flex h-screen ${
  //         theme === "dark" ? "dark bg-gray-900" : "bg-gray-50"
  //         }`
  return (
    <div
      className={`flex h-screen  min-h-screen bg-gray-100  font-inter rounded-lg ${
        theme === "dark" ? "dark bg-gray-900" : "bg-gray-50"
      }`}
    >
      {/* Mobile Sidebar Toggle Button */}
      <button
        onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        className={`md:hidden fixed top-4 left-4 z-30 p-2 rounded-full ${
          theme === "dark"
            ? "bg-gray-700 hover:bg-gray-600 text-white"
            : "bg-white hover:bg-gray-100 text-gray-600"
        } transition-colors shadow-lg`}
      >
        {mobileSidebarOpen ? <FaTimes /> : <FaBars />}
      </button>
      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}
      {/* Animated Sidebar - Desktop */}
      <motion.div
        initial="open"
        animate={sidebarOpen ? "open" : "closed"}
        variants={sidebarVariants}
        className={`hidden md:flex ${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        } shadow-xl flex-col justify-between transition-all duration-300 z-10`}
      >
        <div>
          {/* Logo/Brand */}
          <div className="p-4 flex items-center justify-between">
            {sidebarOpen ? (
              <Link to="/admin" className="flex items-center">
                <div className="p-2 rounded-lg bg-gradient-to-r from-blue-400 to-indigo-500">
                  <FaChartPie className="text-white text-lg" />
                </div>
                <h1
                  className={`text-xl font-bold ml-3 ${
                    theme === "dark" ? "text-white" : "text-gray-800"
                  }`}
                >
                  Admin Panel
                </h1>
              </Link>
            ) : (
              <Link to="/admin">
                <div className="p-2 rounded-lg bg-gradient-to-r from-blue-400 to-indigo-500 mx-auto">
                  <FaChartPie className="text-white text-lg" />
                </div>
              </Link>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`p-2 rounded-full ${
                theme === "dark"
                  ? "hover:bg-gray-700 text-white"
                  : "hover:bg-gray-100 text-gray-600"
              } transition-colors`}
            >
              <FaChevronLeft
                className={`transition-transform duration-300 ${
                  sidebarOpen ? "" : "rotate-180"
                }`}
              />
            </button>
          </div>

          {/* User Profile */}
          <div
            className={`p-4 border-b ${
              theme === "dark" ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold shadow-md">
                {userName.charAt(0) || "A"}
              </div>
              {sidebarOpen && (
                <div>
                  <p
                    className={`font-medium ${
                      theme === "dark" ? "text-white" : "text-gray-800"
                    }`}
                  >
                    {userName || "Admin"}
                  </p>
                  <p
                    className={`text-sm ${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Super Admin
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 mt-2">
            <ul className="space-y-1 px-2">
              {navItems.map((item) => (
                <motion.li
                  key={item.path}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <NavLink
                    to={`/admin/${item.path}`}
                    className={({ isActive }) =>
                      `flex items-center p-3 rounded-lg transition-all ${
                        isActive
                          ? `bg-gradient-to-r ${item.color} text-white shadow-lg`
                          : theme === "dark"
                          ? "hover:bg-gray-700 text-gray-200"
                          : "hover:bg-gray-100 text-gray-700"
                      }`
                    }
                  >
                    <div
                      className={`p-2 rounded-lg ${
                        theme === "dark" ? "bg-gray-700" : "bg-white/20"
                      }`}
                    >
                      {item.icon}
                    </div>
                    {sidebarOpen && <span className="ml-3">{item.name}</span>}
                  </NavLink>
                </motion.li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom buttons */}
        <div className="p-4 space-y-3">
          {/* Theme toggle */}
          {/* <button
            onClick={toggleTheme}
            className={`p-3 rounded-lg flex items-center justify-center w-full ${
              theme === "dark"
                ? "bg-gray-700 hover:bg-gray-600 text-white"
                : "bg-gray-200 hover:bg-gray-300 text-gray-700"
            } transition-colors`}
          >
            {theme === "dark" ? (
              <FaSun className="mr-2" />
            ) : (
              <FaMoon className="mr-2" />
            )}
            {sidebarOpen && (
              <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
            )}
          </button> */}

          {/* Sign Out button */}
          <button
            onClick={handleSignOut}
            disabled={isSigningOut}
            className={`p-3 rounded-lg flex items-center justify-center w-full ${
              theme === "dark"
                ? "bg-red-800 hover:bg-red-700 text-white"
                : "bg-red-100 hover:bg-red-200 text-red-700"
            } transition-colors ${
              isSigningOut ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            <FaSignOutAlt
              className={`mr-2 ${isSigningOut ? "animate-pulse" : ""}`}
            />
            {sidebarOpen && (
              <span>{isSigningOut ? "Signing Out..." : "Sign Out"}</span>
            )}
          </button>

          {/* Home button */}
          <Link
            to="/"
            className={`p-3 rounded-lg flex items-center justify-center w-full ${
              theme === "dark"
                ? "bg-blue-800 hover:bg-blue-700 text-white"
                : "bg-blue-100 hover:bg-blue-200 text-blue-700"
            } transition-colors`}
          >
            <FaHome className="mr-2" />
            {sidebarOpen && <span>Home</span>}
          </Link>
        </div>
      </motion.div>
      {/* Mobile Sidebar */}
      <motion.div
        initial="closed"
        animate={mobileSidebarOpen ? "open" : "closed"}
        variants={mobileSidebarVariants}
        className={`fixed md:hidden ${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        } shadow-xl flex flex-col justify-between w-64 h-full z-20 transition-all duration-300`}
      >
        <div>
          {/* Logo/Brand */}
          <div className="p-4 flex items-center justify-between">
            <Link to="/admin" className="flex items-center">
              <div className="p-2 rounded-lg bg-gradient-to-r from-blue-400 to-indigo-500">
                <FaChartPie className="text-white text-lg" />
              </div>
              <h1
                className={`text-xl font-bold ml-3 ${
                  theme === "dark" ? "text-white" : "text-gray-800"
                }`}
              >
                Admin Panel
              </h1>
            </Link>
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className={`p-2 rounded-full ${
                theme === "dark"
                  ? "hover:bg-gray-700 text-white"
                  : "hover:bg-gray-100 text-gray-600"
              } transition-colors`}
            >
              <FaTimes />
            </button>
          </div>

          {/* User Profile */}
          <div
            className={`p-4 border-b ${
              theme === "dark" ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold shadow-md">
                {user?.displayName?.charAt(0) || "A"}
              </div>
              <div>
                <p
                  className={`font-medium ${
                    theme === "dark" ? "text-white" : "text-gray-800"
                  }`}
                >
                  {user?.displayName || "Admin"}
                </p>
                <p
                  className={`text-sm ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Super Admin
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 mt-2">
            <ul className="space-y-1 px-2">
              {navItems.map((item) => (
                <motion.li
                  key={item.path}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <NavLink
                    to={`/admin/${item.path}`}
                    onClick={() => setMobileSidebarOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center p-3 rounded-lg transition-all ${
                        isActive
                          ? `bg-gradient-to-r ${item.color} text-white shadow-lg`
                          : theme === "dark"
                          ? "hover:bg-gray-700 text-gray-200"
                          : "hover:bg-gray-100 text-gray-700"
                      }`
                    }
                  >
                    <div
                      className={`p-2 rounded-lg ${
                        theme === "dark" ? "bg-gray-700" : "bg-white/20"
                      }`}
                    >
                      {item.icon}
                    </div>
                    <span className="ml-3">{item.name}</span>
                  </NavLink>
                </motion.li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom buttons */}
        <div className="p-4 space-y-3">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className={`p-3 rounded-lg flex items-center w-full ${
              theme === "dark"
                ? "bg-gray-700 hover:bg-gray-600 text-white"
                : "bg-gray-200 hover:bg-gray-300 text-gray-700"
            } transition-colors`}
          >
            {theme === "dark" ? (
              <FaSun className="mr-2" />
            ) : (
              <FaMoon className="mr-2" />
            )}
            <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
          </button>

          {/* Sign Out button */}
          <button
            onClick={handleSignOut}
            disabled={isSigningOut}
            className={`p-3 rounded-lg flex items-center w-full ${
              theme === "dark"
                ? "bg-red-800 hover:bg-red-700 text-white"
                : "bg-red-100 hover:bg-red-200 text-red-700"
            } transition-colors ${
              isSigningOut ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            <FaSignOutAlt
              className={`mr-2 ${isSigningOut ? "animate-pulse" : ""}`}
            />
            <span>{isSigningOut ? "Signing Out..." : "Sign Out"}</span>
          </button>

          {/* Home button */}
          <Link
            to="/"
            className={`p-3 rounded-lg flex items-center w-full ${
              theme === "dark"
                ? "bg-blue-800 hover:bg-blue-700 text-white"
                : "bg-blue-100 hover:bg-blue-200 text-blue-700"
            } transition-colors`}
          >
            <FaHome className="mr-2" />
            <span>Home</span>
          </Link>
        </div>
      </motion.div>
      {/* className="flex-1 overflow-auto md:ml-20 */}
      {/* Main content area */}
      <main className="flex-1 h-screen  flex flex-col">
        {/* Header */}
        <header
          className={`sticky top-0 z-10 p-4 shadow-sm ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          }`}
        >
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold">
              {location.pathname.split("/").pop() || "Dashboard"}
            </h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full ${
                  theme === "dark"
                    ? "bg-gray-700 hover:bg-gray-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                } transition-colors`}
              >
                {theme === "dark" ? <FaSun /> : <FaMoon />}
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-6 flex-1  overflow-auto h-min-screen ">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
