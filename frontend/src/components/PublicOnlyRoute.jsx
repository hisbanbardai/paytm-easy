import { Navigate, Outlet } from "react-router-dom";

export default function PublicOnlyRoute({ isAuthenticated }) {
  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return !isAuthenticated ? <Outlet /> : <Navigate to={"/dashboard"} replace />;
}
