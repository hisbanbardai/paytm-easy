import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export function useAuthentication() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const location = useLocation();

  useEffect(() => {
    async function checkAuthentication() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/auth/validate",
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );

        if (response.status === 200) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          localStorage.removeItem("token");
        }
      } catch (error) {
        setIsAuthenticated(false);
        localStorage.removeItem("token");
      }
    }

    checkAuthentication();
  }, [location.pathname]);

  return isAuthenticated;
}
