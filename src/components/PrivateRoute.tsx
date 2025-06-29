import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
}
