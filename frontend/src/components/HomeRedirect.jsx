import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthentication } from "../hooks/useAuthentication";

export default function HomeRedirect() {
  const isAuthenticated = useAuthentication();
  const navigate = useNavigate();

  useEffect(() => {
    isAuthenticated ? navigate("/dashboard") : navigate("/signin");
  }, [isAuthenticated, navigate]);

  return null;
}
