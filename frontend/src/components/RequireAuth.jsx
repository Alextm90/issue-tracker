import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = () => {
  const { auth } = useAuth();

  if (auth !== null) {
    return auth ? <Outlet /> : <Navigate to="/login" />;
  }
};

export default RequireAuth;


