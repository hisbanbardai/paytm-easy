export default function Button({ label }) {
  return (
    <button className="bg-slate-700 text-white w-full py-3 text-xl rounded-md">
      {label}
    </button>
  );
}
