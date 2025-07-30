import { useQuery } from "@tanstack/react-query";
import { Lock } from "lucide-react";
import axiosInstance from "../utils/axiosInstance";
import Spinner from "../components/Spinner";

export default function PremiumArticles() {
  const fetchPremiumArticles = async () => {
    const res = await axiosInstance.get("/user/premium/articles");
    return res.data;
  };

  const {
    data: articles = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["premium-articles"],
    queryFn: fetchPremiumArticles,
  });

  if (isLoading) return <Spinner />;
  if (isError)
    return (
      <p className="text-center mt-20 text-red-500">Failed to load articles.</p>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-8 text-center text-yellow-600">
        Premium Articles
      </h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => (
          <div
            key={article._id}
            className="relative border border-yellow-400 bg-white  rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300"
          >
            <div className="absolute top-3 right-3 text-yellow-500">
              <Lock className="w-5 h-5" />
            </div>

            <img
              src={article.image}
              alt={article.title}
              className="w-full h-48 object-cover rounded-t-xl"
            />
            <div className="p-5">
              <h2 className="text-xl font-semibold mb-2 text-gray-800 ">
                {article.title}
              </h2>
              <p className="text-sm text-gray-500 mb-1">
                Publisher: {article.publisher}
              </p>

              <div className="flex flex-wrap gap-2 my-2">
                {article.tags?.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <p className="text-gray-600  mb-4 line-clamp-3">
                {article.description}
              </p>

              <button
                onClick={() =>
                  (window.location.href = `/article/${article._id}`)
                }
                className="w-full py-2 rounded-md font-medium bg-yellow-500 text-white hover:bg-yellow-600 transition"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
