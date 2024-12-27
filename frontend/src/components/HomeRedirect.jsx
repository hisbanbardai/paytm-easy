import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function HomeRedirect({ isAuthenticated }) {
  const navigate = useNavigate();

  useEffect(() => {
    isAuthenticated ? navigate("/dashboard") : navigate("/signin");
  }, [isAuthenticated, navigate]);

  return null;
}
