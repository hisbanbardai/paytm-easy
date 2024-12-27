import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ isAuthenticated }) {
  console.log(isAuthenticated);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to={"/signin"} replace />;
}
