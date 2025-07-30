import { useForm } from "react-hook-form";
import useAuth from "../hook/useAuth";
import { toast } from "react-toastify";
import { getIdToken, updateProfile } from "firebase/auth";
import axios from "axios";
import SocialLogin from "../components/SocialLogin";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const { createUser } = useAuth();

  const onSubmit = async (data) => {
    try {
      const { user } = await createUser({
        email: data.email,
        password: data.password,
      });

      if (!user) throw new Error("Something went wrong while creating user.");

      await updateProfile(user, {
        displayName: data.name,
        photoURL: data.image || "",
      });

      const userData = {
        name: user.displayName,
        email: user.email,
        image: user.photoURL,
        uid: user.uid,
      };
      // Redirect to home after successful registration
      try {
        await axios.post(
          "http://localhost:3000/web/api/users/register",
          userData
        );
      } catch (erorr) {
        toast.error("User saved failed to backend!", erorr);
      }

      const firebaseToken = await getIdToken(user);

      if (!firebaseToken) throw new Error("Failed to get Firebase ID token");

      try {
        const jwtRes = await axios.post(
          "http://localhost:3000/web/api/auth",
          {},
          {
            headers: {
              Authorization: `Bearer ${firebaseToken}`,
            },
          }
        );

        localStorage.setItem("token", jwtRes.data.token);
      } catch (jwtErr) {
        toast.error("Failed to get JWT token from server.");
      }

      toast.success("Registration successful!");
      navigate(location?.state ? location.state : "/");
      window.location.reload();
    } catch (err) {
      const msg = err?.message || "Registration failed.";
      if (msg.includes("email-already-in-use")) {
        toast.error("Email already in use.");
      } else if (msg.includes("weak-password")) {
        toast.error("Password should be at least 6 characters.");
      } else {
        toast.error(msg);
      }
    }
  };

  // Password validation pattern
  const passwordPattern =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{6,}$/;

  return (
    <div className="min-h-screen py-10 flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 px-4">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-extrabold mb-8 text-center text-indigo-700">
          Create Your Account
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Full Name */}
          <label className="block mb-1 font-semibold text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            placeholder="John Doe"
            {...register("name", { required: "Full name is required" })}
            className={`w-full mb-3 p-3 border rounded ${
              errors.name ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-indigo-400`}
          />
          {errors.name && (
            <p className="text-red-600 mb-3">{errors.name.message}</p>
          )}

          {/* Email */}
          <label className="block mb-1 font-semibold text-gray-700">
            Email
          </label>
          <input
            type="email"
            placeholder="john@example.com"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "Enter a valid email address",
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
            placeholder="At least 6 characters"
            {...register("password", {
              required: "Password is required",
              pattern: {
                value: passwordPattern,
                message:
                  "Password must have 6+ chars, uppercase, number & special char",
              },
            })}
            className={`w-full mb-3 p-3 border rounded ${
              errors.password ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-indigo-400`}
          />
          {errors.password && (
            <p className="text-red-600 mb-3">{errors.password.message}</p>
          )}

          <label className="block mb-1 font-semibold text-gray-700">
            Profile Photo URL
          </label>
          <input
            type="url"
            placeholder="https://example.com/photo.jpg"
            {...register("image", { required: true })}
            className="w-full mb-6 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          {errors.profilePhotoUrl && (
            <p className="text-red-600 mb-3">{errors.password.message}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-indigo-600 text-white py-3 rounded font-semibold hover:bg-indigo-700 transition"
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </form>

        <SocialLogin />
        <p>
          Already you have an account ?{" "}
          <Link to="/login" className="text-blue-600 underline">
            {" "}
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
