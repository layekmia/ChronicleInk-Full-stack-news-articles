import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { useEffect } from "react";

export default function NewsDetails() {
  // scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: news,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["news", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/articles/${id}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-600 text-lg">
          Failed to load news. Try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        ← Back
      </button>

      <div className="w-full h-72 overflow-hidden rounded-lg shadow-md mb-6">
        <img
          src={news.image}
          alt={news.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      <h1 className="text-3xl font-bold text-gray-800 mb-2">{news.title}</h1>

      {/* Publisher */}
      <p className="text-sm text-gray-500 mb-4">
        Published by:{" "}
        <span className="font-semibold text-blue-600">{news.publisher}</span>
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {news.tags.map((tag, idx) => (
          <span
            key={idx}
            className="bg-blue-100 text-blue-600 text-sm px-3 py-1 rounded-full"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Description */}
      <p className="text-gray-700 text-lg leading-8">{news.description}</p>
    </div>
  );
}
