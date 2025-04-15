import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LoginPage, RegisterPage } from "../pages";
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";
import LandingPage from "../pages/LandingPage";
import MainLayout from "../components/layout/mainLayout";
import { PlaylistPage } from "../pages/PlaylistPage";
import AdminPage from "../pages/admin/AdminPage";

const RootRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/" /> : <LoginPage />} />
      <Route path="/signup" element={user ? <Navigate to="/" /> : <RegisterPage />} />

      <Route element={<MainLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/landing2" element={<ProtectedRoute element={<LandingPage />} />} />
          <Route path="/playlist/:playlistId" element={<ProtectedRoute element={<PlaylistPage />} />} />
          <Route path="/admin" element={<AdminRoute element={<AdminPage />} />} />
      </Route>

      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default RootRoutes;
