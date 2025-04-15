import { JSX } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Spin } from "antd";

const AdminRoute = ({ element }: { element: JSX.Element }) => {
  const { user, isLoading, isAdmin } = useAuth();

  if (isLoading) {
    return (
      <>
        <Spin size="large" />
      </>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!isAdmin) {
    return <Navigate to="/" />;
  }

  return element;
};

export default AdminRoute; 