import Avatar from "./Avatar";

export default function Users() {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="font-bold text-2xl">Users</h2>
      <input
        className="border-2 p-2 text-lg rounded-lg"
        type="text"
        placeholder="Search users..."
      />
      <div>
        <User />
      </div>
    </section>
  );
}

function User() {
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-2 items-center font-medium text-xl">
        <Avatar value={"H"} />
        <p>Hisban Shiraz</p>
      </div>
      <button className="bg-slate-700 text-white p-3 px-4 rounded-lg">
        Send Money
      </button>
    </div>
  );
}
