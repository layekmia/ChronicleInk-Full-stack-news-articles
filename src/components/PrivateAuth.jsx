import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hook/useAuth";

export default function PrivateAuth({ children }) {
  const { user } = useAuth();

  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  if (user) {
    return <Navigate to={from} replace />;
  }
  return children;
}
