import { useNavigate } from "react-router-dom";
import Avatar from "./Avatar";
import { useAuthentication } from "../hooks/useAuthentication";

export default function TopBar() {
  const isAuthenticated = useAuthentication();

  const navigate = useNavigate();

  function handleClick() {
    localStorage.removeItem("token");
    navigate("/signin");
  }

  return (
    <header className="flex justify-between px-4 py-2 shadow-md items-center text-xl h-16">
      <button onClick={() => navigate("/")} className="font-semibold">
        PayTM App
      </button>
      <div className="flex gap-9">
        {isAuthenticated && (
          <p className="font-medium flex gap-3 items-center">
            Hello <Avatar value={"U"} />
          </p>
        )}

        {isAuthenticated && (
          <button onClick={handleClick} className="font-medium">
            Log out
          </button>
        )}
      </div>
    </header>
  );
}
