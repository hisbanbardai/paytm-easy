import { useEffect, useState } from "react";
import Balance from "../components/Balance";
import TopBar from "../components/TopBar";
import Users from "../components/Users";
import axios from "axios";

export default function Dashboard() {
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    async function getBalance() {
      const response = await axios.get(
        "http://localhost:3000/api/v1/account/balance",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      setBalance(response.data.balance);
    }

    getBalance();
  }, []);

  return (
    <div className="flex flex-col gap-10">
      <TopBar />
      <main className="px-9 flex flex-col gap-6">
        <Balance value={balance} />
        <Users />
      </main>
    </div>
  );
}
