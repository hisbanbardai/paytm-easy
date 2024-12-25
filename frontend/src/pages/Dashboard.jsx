import Balance from "../components/Balance";
import TopBar from "../components/TopBar";
import Users from "../components/Users";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-10">
      <TopBar />
      <main className="px-9 flex flex-col gap-6">
        <Balance value={"10,000"} />
        <Users />
      </main>
    </div>
  );
}
