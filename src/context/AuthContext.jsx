import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../config/firebase";
import axiosInstance from "../utils/axiosInstance";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);

  const [isAuthChecking, setAuthChecking] = useState(true);

  const createUser = ({ email, password }) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = ({ email, password }) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const userSignOut = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("token");
      toast.success("Logged out successfully!");
    } catch (err) {
      console.error("Logout error:", err);
      toast.error("Failed to log out.");
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const { displayName: name, photoURL: image, uid, email } = currentUser;

        const token = await currentUser.getIdToken();

        try {
          const { data } = await axiosInstance.get(`/users/user-data`);

          setUser({
            name,
            image,
            email,
            token,
            uid,
            role: data.user.role,
            isPremiumTaken: data.user.premiumTaken,
          });
          console.log(name, image);
        } catch (err) {
          console.log(err.message);
        }
      } else {
        setUser(null);
      }
      setAuthChecking(false);
    });

    return () => unsubscribe();
  }, []);

  if (isAuthChecking) return <Spinner />;

  return (
    <AuthContext.Provider
      value={{ createUser, signInUser, user, isAuthChecking, userSignOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}
