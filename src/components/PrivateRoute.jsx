import useAuth from "../hook/useAuth";
import { Navigate, useLocation } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const { user } = useAuth();

  const location = useLocation();

  return user ? (
    children
  ) : (
    <Navigate state={{ from: location }} to="/login" replace />
  );
}
