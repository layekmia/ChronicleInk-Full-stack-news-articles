// import React, { useState } from "react";
// import { NavLink } from "react-router-dom";
// import { motion } from "framer-motion";
// import {
//   FaChartPie,
//   FaNewspaper,
//   FaUsers,
//   FaBuilding,
//   FaHome,
//   FaSignOutAlt,
//   FaChevronLeft,
//   FaSun,
//   FaMoon,
// } from "react-icons/fa";
// import { useTheme } from "../../context/ThemeContext";
// import useAuth from "../../hook/useAuth";

// const AdminSidebar = ({ isCollapsed, toggleCollapse }) => {
//   const { user, logout } = useAuth();
//   const { theme, toggleTheme } = useTheme();
//   const userName = user?.name || "Admin";

//   const navItems = [
//     {
//       path: "/admin/dashboard",
//       name: "Dashboard",
//       icon: <FaHome className="text-lg" />,
//       color: "from-blue-400 to-indigo-500",
//     },
//     {
//       path: "/admin/manage-articles",
//       name: "Manage Articles",
//       icon: <FaNewspaper className="text-lg" />,
//       color: "from-emerald-400 to-teal-500",
//     },
//     {
//       path: "/admin/manage-users",
//       name: "Manage Users",
//       icon: <FaUsers className="text-lg" />,
//       color: "from-purple-400 to-fuchsia-500",
//     },
//     {
//       path: "/admin/publisher",
//       name: "Add Publisher",
//       icon: <FaBuilding className="text-lg" />,
//       color: "from-amber-400 to-orange-500",
//     },
//   ];

//   return (
//     <motion.div
//       initial={{ x: -20, opacity: 0 }}
//       animate={{ x: 0, opacity: 1 }}
//       transition={{ duration: 0.3 }}
//       className={`p-6 h-full flex flex-col transition-all duration-300 ${
//         isCollapsed ? "w-20" : "w-64"
//       } ${
//         theme === "dark"
//           ? "bg-gray-900 border-r border-gray-700"
//           : "bg-indigo-900 border-r border-indigo-200"
//       }`}
//     >
//       {/* Logo/Branding */}
//       <div
//         className={`mb-10 flex items-center ${
//           isCollapsed ? "justify-center" : "justify-between"
//         }`}
//       >
//         {!isCollapsed && (
//           <div className="flex items-center gap-3">
//             <div
//               className={`p-2 rounded-lg ${
//                 theme === "dark" ? "bg-gray-700" : "bg-white bg-opacity-20"
//               }`}
//             >
//               <FaChartPie className="text-lg text-white" />
//             </div>
//             <h2 className="text-xl font-bold text-white">Admin Panel</h2>
//           </div>
//         )}
//         {isCollapsed && (
//           <div
//             className={`p-2 rounded-lg ${
//               theme === "dark" ? "bg-gray-700" : "bg-white bg-opacity-20"
//             }`}
//           >
//             <FaChartPie className="text-lg text-white" />
//           </div>
//         )}
//         <motion.button
//           whileHover={{ scale: 1.1 }}
//           whileTap={{ scale: 0.95 }}
//           onClick={toggleCollapse}
//           className={`p-1 rounded-full ${
//             theme === "dark" ? "hover:bg-gray-700" : "hover:bg-white/20"
//           } ${isCollapsed ? "mx-auto" : ""}`}
//         >
//           <FaChevronLeft
//             className={`text-white transition-transform duration-300 ${
//               isCollapsed ? "rotate-180" : ""
//             }`}
//           />
//         </motion.button>
//       </div>

//       {/* Navigation */}
//       <nav className="flex-1 space-y-2">
//         {navItems.map((item, index) => (
//           <motion.div
//             key={index}
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: index * 0.1 }}
//           >
//             <NavLink
//               to={item.path}
//               className={({ isActive }) =>
//                 `group flex items-center gap-3 p-3 rounded-lg transition-all relative overflow-hidden ${
//                   isActive
//                     ? `bg-gradient-to-r ${item.color} text-white shadow-lg`
//                     : `${
//                         theme === "dark"
//                           ? "hover:bg-gray-800 text-gray-300"
//                           : "hover:bg-indigo-800 text-indigo-200"
//                       }`
//                 } ${isCollapsed ? "justify-center" : ""}`
//               }
//             >
//               <div
//                 className={`p-2 rounded-lg ${
//                   theme === "dark" ? "bg-gray-700" : "bg-white/20"
//                 }`}
//               >
//                 {item.icon}
//               </div>
//               {!isCollapsed && (
//                 <span className="relative z-10 font-medium">{item.name}</span>
//               )}
//             </NavLink>
//           </motion.div>
//         ))}
//       </nav>

//       {/* User Profile and Settings */}
//       <div
//         className={`mt-auto pt-4 border-t ${
//           theme === "dark" ? "border-gray-700" : "border-indigo-700"
//         }`}
//       >
//         <div
//           className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
//             theme === "dark" ? "hover:bg-gray-800" : "hover:bg-indigo-800"
//           } ${isCollapsed ? "justify-center" : ""}`}
//         >
//           <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold shadow-md">
//             {userName.charAt(0)}
//           </div>

//           {!isCollapsed && (
//             <div className="flex-1">
//               <p className="font-medium text-white truncate">{userName}</p>
//               <p className="text-xs text-indigo-200 truncate">Super Admin</p>
//             </div>
//           )}

//           {!isCollapsed && (
//             <div className="flex gap-2">
//               <motion.button
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={toggleTheme}
//                 className="p-2 rounded-full hover:bg-white/10 text-white"
//               >
//                 {theme === "dark" ? <FaSun /> : <FaMoon />}
//               </motion.button>
//               <motion.button
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={logout}
//                 className="p-2 rounded-full hover:bg-white/10 text-white"
//               >
//                 <FaSignOutAlt />
//               </motion.button>
//             </div>
//           )}
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default AdminSidebar;
