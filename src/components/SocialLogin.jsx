import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import axios from "axios";
import { toast } from "react-toastify";
import auth from "../config/firebase";
import axiosInstance from "../utils/axiosInstance";

export default function SocialLogin() {
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const token = await user.getIdToken();

      const res = await axios.get(
        `http://localhost:3000/web/api/users/${user.uid}/check-exist`
      );

      const userExists = res.data.exists;

      console.log(userExists);

      if (!userExists) {
        const userInfo = {
          name: user.displayName || "Anonymous",
          email: user.email,
          uid: user.uid,
          image: user.photoURL,
        };

        await axios.post(
          "http://localhost:3000/web/api/users/register",
          userInfo
        );
      } else {
        await axiosInstance.patch(`/users/${user.uid}/last-login`);
      }

      const { data } = await axios.post(
        "http://localhost:3000/web/api/auth",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      localStorage.setItem("token", data.token);

      toast.success("Successfully logged in");
      window.location.reload();
    } catch (error) {
      toast.error("login failed");
    }
  };

  return (
    <div className="text-center w-full mt-5">
      <button
        onClick={handleGoogleLogin}
        className="flex items-center justify-center gap-2 w-full  py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-100  transition-colors"
      >
        <img
          src="http://www.svgrepo.com/show/475656/google-color.svg"
          alt="Google"
          className="w-5 h-5"
        />
        <span className="text-gray-700 font-medium ">Continue with Google</span>
      </button>
    </div>
  );
}
