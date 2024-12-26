export default function Button({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-slate-700 text-white w-full py-3 text-xl rounded-md"
    >
      {label}
    </button>
  );
}
