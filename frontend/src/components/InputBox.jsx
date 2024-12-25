export default function InputBox({ label, placeholder }) {
  return (
    <div className="flex flex-col gap-3">
      <label className="text-black font-semibold">{label}</label>
      <input
        className="border-2 p-3 rounded-md"
        type="text"
        placeholder={placeholder}
      />
    </div>
  );
}
