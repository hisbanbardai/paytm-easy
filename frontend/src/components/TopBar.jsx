import { Link, useNavigate } from "react-router-dom";
import Avatar from "./Avatar";

export default function TopBar() {
  const navigate = useNavigate();

  return (
    <header className="flex justify-between px-4 py-2 shadow-md items-center text-xl">
      <button onClick={() => navigate("/")} className="font-semibold">
        PayTM App
      </button>
      <p className="font-medium flex gap-3 items-center">
        Hello <Avatar value={"U"} />
      </p>
    </header>
  );
}
