import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Chart } from "react-google-charts";
import axiosInstance from "../../utils/axiosInstance";
import Spinner from "../Spinner";
// import AdminSidebar from "./AdminSidebar";
import { useTheme } from "../../context/ThemeContext";
import { motion } from "framer-motion";

export default function DashboardOverview() {
  const { theme } = useTheme();
  const { data: pieData, isLoading } = useQuery({
    queryKey: ["pieData"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        "/calculate/article/distribution"
      );
      return data;
    },
  });

  const themeStyles = {
    light: {
      bg: "bg-gray-50",
      card: "bg-white",
      text: "text-gray-800",
      border: "border-gray-200",
      shadow: "shadow",
      hover: "hover:bg-gray-100",
    },
    dark: {
      bg: "bg-gray-900",
      card: "bg-gray-800",
      text: "text-gray-100",
      border: "border-gray-700",
      shadow: "shadow-lg",
      hover: "hover:bg-gray-700",
    },
  };

  const currentTheme = themeStyles[theme] || themeStyles.light;

  if (isLoading) return <Spinner />;

  return (
    <div className={`flex  ${currentTheme.bg}`}>
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className={`${currentTheme.card} ${currentTheme.shadow}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-2xl font-bold ${currentTheme.text}`}
            >
              Dashboard Overview
            </motion.h1>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          >
            {[
              {
                title: "Total Articles",
                value: "1,245",
                change: "+12%",
                icon: "📰",
                color: "from-blue-500 to-indigo-600",
              },
              {
                title: "Active Users",
                value: "563",
                change: "+5%",
                icon: "👥",
                color: "from-green-500 to-emerald-600",
              },
              {
                title: "Publishers",
                value: "42",
                change: "+3",
                icon: "🏢",
                color: "from-purple-500 to-fuchsia-600",
              },
              {
                title: "Engagement",
                value: "4.7",
                change: "+0.2",
                icon: "💬",
                color: "from-amber-500 to-orange-600",
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                className={`bg-gradient-to-r ${stat.color} text-white p-6 rounded-xl shadow-lg overflow-hidden relative`}
              >
                <div className="absolute -right-4 -bottom-4 opacity-20 text-6xl">
                  {stat.icon}
                </div>
                <div className="relative z-10">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium opacity-90">
                        {stat.title}
                      </p>
                      <p className="text-3xl font-bold mt-1">{stat.value}</p>
                    </div>
                  </div>
                  <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full mt-2 inline-block">
                    {stat.change}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Pie Chart */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className={`${currentTheme.card} rounded-xl ${currentTheme.shadow} p-6 mb-8 border ${currentTheme.border}`}
          >
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className={`text-xl font-semibold ${currentTheme.text}`}>
                  Article Distribution
                </h2>
                <p
                  className={`text-sm ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  By publisher sources
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`text-sm font-medium ${
                  theme === "dark"
                    ? "text-indigo-400 hover:text-indigo-300"
                    : "text-indigo-600 hover:text-indigo-800"
                }`}
              >
                View Details
              </motion.button>
            </div>
            <div className="h-[400px]">
              <Chart
                chartType="PieChart"
                width="100%"
                height="100%"
                data={pieData}
                options={{
                  is3D: true,
                  pieHole: 0.4,
                  colors: [
                    "#4F46E5",
                    "#10B981",
                    "#F59E0B",
                    "#EF4444",
                    "#8B5CF6",
                  ],
                  chartArea: { width: "90%", height: "90%" },
                  legend: {
                    position: "right",
                    textStyle: {
                      color: theme === "dark" ? "#E5E7EB" : "#6B7280",
                      fontSize: 12,
                    },
                  },
                  pieSliceText: "value",
                  tooltip: { showColorCode: true },
                  backgroundColor: "transparent",
                }}
              />
            </div>
          </motion.div>

          {/* Bar and Area Charts */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
          >
            {/* Bar Chart */}
            <div
              className={`${currentTheme.card} rounded-xl ${currentTheme.shadow} p-6 border ${currentTheme.border}`}
            >
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className={`text-xl font-semibold ${currentTheme.text}`}>
                    Monthly Visitors
                  </h2>
                  <p
                    className={`text-sm ${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Last 4 months trend
                  </p>
                </div>
                <select
                  className={`text-sm border rounded-md px-3 py-1 focus:outline-none focus:ring-2 ${
                    theme === "dark"
                      ? "border-gray-600 bg-gray-700 text-gray-100 focus:ring-indigo-500"
                      : "border-gray-200 bg-white focus:ring-indigo-300"
                  }`}
                >
                  <option>Last 4 Months</option>
                  <option>Last 6 Months</option>
                  <option>This Year</option>
                </select>
              </div>
              <div className="h-[300px]">
                <Chart
                  chartType="BarChart"
                  width="100%"
                  height="100%"
                  data={[
                    ["Month", "Visitors"],
                    ["Jan", 1000],
                    ["Feb", 1170],
                    ["Mar", 660],
                    ["Apr", 1030],
                  ]}
                  options={{
                    title: "",
                    chartArea: { width: "70%", height: "80%" },
                    colors: ["#4F46E5"],
                    hAxis: {
                      title: "Visitors",
                      minValue: 0,
                      titleTextStyle: {
                        color: theme === "dark" ? "#E5E7EB" : "#6B7280",
                        fontSize: 12,
                      },
                      textStyle: {
                        color: theme === "dark" ? "#E5E7EB" : "#6B7280",
                        fontSize: 11,
                      },
                    },
                    vAxis: {
                      title: "Month",
                      titleTextStyle: {
                        color: theme === "dark" ? "#E5E7EB" : "#6B7280",
                        fontSize: 12,
                      },
                      textStyle: {
                        color: theme === "dark" ? "#E5E7EB" : "#6B7280",
                        fontSize: 11,
                      },
                    },
                    legend: { position: "none" },
                    backgroundColor: "transparent",
                  }}
                />
              </div>
            </div>

            {/* Area Chart */}
            <div
              className={`${currentTheme.card} rounded-xl ${currentTheme.shadow} p-6 border ${currentTheme.border}`}
            >
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className={`text-xl font-semibold ${currentTheme.text}`}>
                    Performance
                  </h2>
                  <p
                    className={`text-sm ${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Sales vs Expenses
                  </p>
                </div>
                <select
                  className={`text-sm border rounded-md px-3 py-1 focus:outline-none focus:ring-2 ${
                    theme === "dark"
                      ? "border-gray-600 bg-gray-700 text-gray-100 focus:ring-indigo-500"
                      : "border-gray-200 bg-white focus:ring-indigo-300"
                  }`}
                >
                  <option>2019-2022</option>
                  <option>2020-2023</option>
                </select>
              </div>
              <div className="h-[300px]">
                <Chart
                  chartType="AreaChart"
                  width="100%"
                  height="100%"
                  data={[
                    ["Year", "Sales", "Expenses"],
                    ["2019", 1000, 400],
                    ["2020", 1170, 460],
                    ["2021", 660, 1120],
                    ["2022", 1030, 540],
                  ]}
                  options={{
                    title: "",
                    colors: ["#10B981", "#EF4444"],
                    hAxis: {
                      title: "Year",
                      titleTextStyle: {
                        color: theme === "dark" ? "#E5E7EB" : "#6B7280",
                        fontSize: 12,
                      },
                      textStyle: {
                        color: theme === "dark" ? "#E5E7EB" : "#6B7280",
                        fontSize: 11,
                      },
                    },
                    vAxis: {
                      minValue: 0,
                      titleTextStyle: {
                        color: theme === "dark" ? "#E5E7EB" : "#6B7280",
                        fontSize: 12,
                      },
                      textStyle: {
                        color: theme === "dark" ? "#E5E7EB" : "#6B7280",
                        fontSize: 11,
                      },
                    },
                    legend: {
                      position: "top",
                      alignment: "center",
                      textStyle: {
                        color: theme === "dark" ? "#E5E7EB" : "#6B7280",
                        fontSize: 12,
                      },
                    },
                    backgroundColor: "transparent",
                    areaOpacity: 0.1,
                  }}
                />
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
