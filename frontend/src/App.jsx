import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/Signin";
import SendMoney from "./pages/SendMoney";
import { useEffect, useState } from "react";
import axios from "axios";
import PublicOnlyRoute from "./components/PublicOnlyRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import HomeRedirect from "./components/HomeRedirect";
import TopBar from "./components/TopBar";

function App() {
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

  return (
    <>
      <TopBar isAuthenticated={isAuthenticated} />
      <Routes>
        <Route
          path="/"
          element={<HomeRedirect isAuthenticated={isAuthenticated} />}
        />
        <Route element={<PublicOnlyRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
        </Route>
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/send" element={<SendMoney />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
