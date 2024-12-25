import Avatar from "./Avatar";

export default function TopBar() {
  return (
    <header className="flex justify-between px-4 py-2 shadow-md items-center text-xl">
      <h1 className="font-semibold ">PayTM App</h1>
      <p className="font-medium flex gap-3 items-center">
        Hello <Avatar value={"U"} />
      </p>
    </header>
  );
}
