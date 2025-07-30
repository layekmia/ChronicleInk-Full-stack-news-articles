import React, { useState } from "react";
import axios from "axios";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import useAuth from "../../hook/useAuth";
import { useTheme } from "../../context/ThemeContext";
import { motion } from "framer-motion";

const AddPublisher = () => {
  const [publisherName, setPublisherName] = useState("");
  const [logoFile, setLogoFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { theme } = useTheme();

  const themeStyles = {
    light: {
      bg: "bg-gray-50",
      card: "bg-white",
      text: "text-gray-800",
      input: "bg-white border-gray-300",
      button: "bg-indigo-600 hover:bg-indigo-700",
      upload: "border-gray-300 hover:border-indigo-500",
    },
    dark: {
      bg: "bg-gray-900",
      card: "bg-gray-800",
      text: "text-gray-100",
      input: "bg-gray-700 border-gray-600",
      button: "bg-indigo-500 hover:bg-indigo-600",
      upload: "border-gray-600 hover:border-indigo-500",
    },
  };

  const currentTheme = themeStyles[theme] || themeStyles.light;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!publisherName || !logoFile) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", logoFile);

      const imgbbKey = import.meta.env.VITE_IMGB_API_KEY;
      const uploadRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imgbbKey}`,
        formData
      );

      const imageUrl = uploadRes.data.data.display_url;

      const publisherInfo = {
        name: publisherName,
        logo: imageUrl,
        author: {
          name: user.name,
          email: user.email,
          image: user.image,
        },
      };

      await axiosInstance.post("/admin/add-publisher", publisherInfo);

      setPublisherName("");
      setLogoFile(null);
      setPreviewImage(null);
      toast.success("Publisher Added Successfully!");
    } catch (error) {
      toast.error("Failed to add publisher");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen ${currentTheme.bg} py-12 px-4 sm:px-6 lg:px-8`}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`max-w-3xl mx-auto ${currentTheme.card} rounded-xl shadow-lg overflow-hidden ${currentTheme.text}`}
      >
        <div className="p-6 sm:p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold">Add New Publisher</h2>
            <p className="mt-2 text-sm opacity-80">
              Fill in the details below to register a new publisher
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Publisher Name Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Publisher Name
                </label>
                <input
                  type="text"
                  value={publisherName}
                  onChange={(e) => setPublisherName(e.target.value)}
                  placeholder="Enter publisher name"
                  required
                  className={`w-full px-4 py-3 rounded-lg border ${currentTheme.input} focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
                />
              </div>

              {/* Logo Upload Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Publisher Logo
                </label>
                <div className="flex items-center justify-center w-full">
                  <label
                    className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer ${
                      previewImage ? "border-transparent" : currentTheme.upload
                    } transition-colors`}
                  >
                    {previewImage ? (
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="h-full w-full object-contain p-2"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-8 h-8 mb-3 opacity-60"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          ></path>
                        </svg>
                        <p className="text-sm">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs">PNG, JPG, GIF (MAX. 5MB)</p>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                      required
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${currentTheme.button} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors`}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  "Add Publisher"
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Form Footer */}
        <div
          className={`px-6 py-4 ${
            theme === "dark" ? "bg-gray-700" : "bg-gray-50"
          } text-center`}
        >
          <p className="text-xs opacity-70">
            All publishers will be reviewed before being published on the
            platform.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AddPublisher;
