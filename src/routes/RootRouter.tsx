import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LoginPage, RegisterPage } from "../page";
import ProtectedRoute from "./ProtectedRoute";
import LandingPage from "../page/LandingPage";
import MainLayout from "../components/layout/mainLayout";
import { PlaylistPage } from "../page/PlaylistPage";

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
      </Route>

      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default RootRoutes;
