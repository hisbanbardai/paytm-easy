import { Link } from "react-router-dom";

export default function BottomNote({ label, linkText }) {
  return (
    <p>
      {label}
      <Link to={"/signin"}>{linkText}</Link>
    </p>
  );
}
