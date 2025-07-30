import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";
import axios from "axios";

export default function EditArticle({updatedData, setUpdatedData, setEditArticle, refetch, editArticle}) {
  const [isImageUploading, setIsImageUPloading] = useState(false);
  const [loading, setIsLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axiosInstance.put(
        `/update/article/${editArticle._id}`,
        updatedData
      );
      setEditArticle(null);
      setIsLoading(false);
      refetch();
      toast.success("Article updated successfully");
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  const handleOnChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    const imgbbAPI = import.meta.env.VITE_IMGB_API_KEY;

    setIsImageUPloading(true);

    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imgbbAPI}`,
        formData
      );

      const imageUrl = res.data.data.url;

      setUpdatedData((prev) => ({ ...prev, image: imageUrl }));
      setIsImageUPloading(false);
    } catch (error) {
      console.error("Image upload failed:", error);
      toast.error("Failed to upload image");
    }
  };

  return (
    <div className="fixed inset-0  z-20 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-lg font-semibold mb-4">Update Article</h2>
        <form onSubmit={handleUpdate}>
          <div className="mb-3">
            <label className="block mb-2">
              <img
                className="w-full h-24 object-cover"
                src={updatedData.image}
                alt="news Image"
              />
              <input
                type="file"
                accept="image/*"
                className="w-full mt-1"
                onChange={handleOnChange}
              />
            </label>
          </div>

          <div className="mb-3">
            <label className="block mb-1">Title</label>
            <input
              type="text"
              className="w-full border px-2 py-1 rounded"
              value={updatedData.title}
              onChange={(e) =>
                setUpdatedData({ ...updatedData, title: e.target.value })
              }
              required
            />
          </div>
          <div className="mb-3">
            <label className="block mb-1">Description</label>
            <textarea
              className="w-full border px-2 py-1 rounded"
              rows="4"
              value={updatedData.description}
              onChange={(e) =>
                setUpdatedData({
                  ...updatedData,
                  description: e.target.value,
                })
              }
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 rounded"
              onClick={() => setEditArticle(null)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              {isImageUploading
                ? "uploading..."
                : loading
                ? "updating..."
                : " Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
