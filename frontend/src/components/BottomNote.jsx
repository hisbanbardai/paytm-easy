import { Link } from "react-router-dom";

export default function BottomNote({ label, linkText }) {
  return (
    <>
      <p>{label}</p>
      <Link className="text-decoration-line: underline" to={"/signin"}>
        {linkText}
      </Link>
    </>
  );
}
