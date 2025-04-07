import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { DashBoardPage, LoginPage, RegisterPage } from "../page";
import { JSX } from "react";

const RootRoutes = () => {
  const { user } = useAuth();

  const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
    if (!user) {
      return <Navigate to="/login" />;
    }
    return element;
  };

  return (
    <Routes>
      <Route
        path="/login"
        element={user ? <Navigate to="/dashboard" /> : <LoginPage />}
      />
      <Route
        path="/signup"
        element={user ? <Navigate to="/dashboard" /> : <RegisterPage />}
      />

      <Route
        path="/dashboard"
        element={<ProtectedRoute element={<DashBoardPage />} />}
      />

      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default RootRoutes;
