import { Link } from "react-router-dom";

export default function BottomNote({ label, linkText, to }) {
  return (
    <>
      <p>{label}</p>
      <Link className="text-decoration-line: underline" to={to}>
        {linkText}
      </Link>
    </>
  );
}
