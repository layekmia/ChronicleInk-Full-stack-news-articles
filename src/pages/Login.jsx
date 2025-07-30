import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useAuth from "../hook/useAuth";
import { getIdToken } from "firebase/auth";
import axios from "axios";
import SocialLogin from "../components/SocialLogin";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const { signInUser } = useAuth();

  const onSubmit = async (data) => {
    try {
      const { user } = await signInUser({
        email: data.email,
        password: data.password,
      });

      const firebaseToken = await getIdToken(user);

      // 5. Request your custom JWT
      try {
        const jwtRes = await axiosInstance.post(
          "/auth",
          {},
          {
            headers: {
              Authorization: `Bearer ${firebaseToken}`,
            },
          }
        );
        // Redirect to home after successful login
        localStorage.setItem("token", jwtRes.data.token);
      } catch (jwtErr) {
        toast.error("Failed to get JWT token from server.");
      }

      await axiosInstance.patch(`/users/${user.uid}/last-login`);

      toast.success("Login successful!");
      navigate(location?.state ? location.state : "/");
      window.location.reload();
    } catch (error) {
      toast.error("Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-blue-200 px-4">
      <div className="bg-white p-10 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-3xl font-extrabold mb-8 text-center text-indigo-700">
          Welcome Back 👋
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <label className="block mb-1 font-semibold text-gray-700">
            Email
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email format",
              },
            })}
            className={`w-full mb-3 p-3 border rounded ${
              errors.email ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-indigo-400`}
          />
          {errors.email && (
            <p className="text-red-600 mb-3">{errors.email.message}</p>
          )}
          <label className="block mb-1 font-semibold text-gray-700">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            {...register("password", {
              required: "Password is required",
            })}
            className={`w-full mb-4 p-3 border rounded ${
              errors.password ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-indigo-400`}
          />
          {errors.password && (
            <p className="text-red-600 mb-3">{errors.password.message}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-indigo-600 text-white py-3 rounded font-semibold hover:bg-indigo-700 transition"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        <p>or</p>
        <SocialLogin />

        <p className="text-sm text-gray-600 mt-4 text-center">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 hover:underline font-medium"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
