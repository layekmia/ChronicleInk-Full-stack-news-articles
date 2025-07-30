import { useLocation, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SearchResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) {
      navigate("/");
      return;
    }

    const fetchResults = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get("/api/articles/approved");
        const filtered = response.data.filter(
          (article) =>
            article.title.toLowerCase().includes(query.toLowerCase()) ||
            (article.content &&
              article.content.toLowerCase().includes(query.toLowerCase()))
        );
        setResults(filtered);
      } catch (err) {
        setError("Failed to load search results. Please try again.");
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query, navigate]);

  if (!query) return null;

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Search Results for: "{query}"</h1>

      {error ? (
        <div
          className={`p-4 rounded-md ${
            theme === "dark"
              ? "bg-red-900/30 text-red-300"
              : "bg-red-100 text-red-700"
          }`}
        >
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 text-blue-600 hover:underline"
          >
            Try Again
          </button>
        </div>
      ) : loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : results.length > 0 ? (
        <div className="grid gap-6">
          {results.map((article) => (
            <article
              key={article._id}
              className="border rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
              <p className="text-gray-600 mb-4">
                {article.content?.substring(0, 200)}...
              </p>
              <Link
                to={`/articles/${article._id}`}
                className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Read Article
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-lg text-gray-500">
            No articles found matching your search criteria.
          </p>
          <Link
            to="/"
            className="text-blue-500 hover:underline mt-4 inline-block"
          >
            Back to Home
          </Link>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
