import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hook/useAuth";
import Spinner from "./Spinner";

export default function RoleRoute({ children, allowedRoles = [] }) {
  const { user, isAuthChecking } = useAuth();
  const location = useLocation();
  if (isAuthChecking) return <Spinner />;

  if (!user) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
