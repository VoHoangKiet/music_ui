import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LoginPage, RegisterPage } from "../page";
import ProtectedRoute from "./ProtectedRoute";
import LandingPage from "../page/LandingPage";

const RootRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route
        path="/login"
        element={user ? <Navigate to="/landing" /> : <LoginPage />}
      />
      <Route
        path="/signup"
        element={user ? <Navigate to="/landing" /> : <RegisterPage />}
      />

      <Route
        path="/"
        element={<LandingPage />}
      />
      <Route
        path="/landing2"
        element={<ProtectedRoute element={<LandingPage />} />}
      />

      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default RootRoutes;
