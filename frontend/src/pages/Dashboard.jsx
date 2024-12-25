import Balance from "../components/Balance";
import TopBar from "../components/TopBar";
import Users from "../components/Users";

export default function Dashboard() {
  return (
    <div>
      <TopBar />
      <main>
        <Balance value={"10,000"} />
        <Users />
      </main>
    </div>
  );
}
