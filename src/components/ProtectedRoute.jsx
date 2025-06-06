// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function ProtectedRoute({ children }) {
  const { user, isLoading } = useAuthStore();

  if (isLoading) {
    return <div>Loading...</div>; // Or a spinner
  }

  return user ? children : <Navigate to="/login" replace />;
}
