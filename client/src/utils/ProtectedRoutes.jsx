import { Navigate, Outlet } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext.jsx";

export default function ProtectedRoutes() {
  const { user } = useAuthContext();
  return user ? <Outlet /> : <Navigate to="/login" />;
}
