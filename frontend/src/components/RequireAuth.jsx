import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { terminal } from "virtual:terminal";

const RequireAuth = () => {
  const { auth } = useAuth();

  terminal.log(auth, "auth")
  
  if (auth !== null) {
    return auth ? <Outlet /> : <Navigate to="/login" />;
  }
};

export default RequireAuth;
