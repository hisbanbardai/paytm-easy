import { useSearchParams } from "react-router-dom";
import Avatar from "../components/Avatar";
import axios from "axios";
import { useState } from "react";

export default function SendMoney() {
  const [searchParams] = useSearchParams();
  const [amount, setAmount] = useState(null);

  const id = searchParams.get("id");
  const name = searchParams.get("name");

  function handleClick() {
    axios.post(
      "http://localhost:3000/api/v1/account/transfer",
      {
        to: `${id}`,
        amount: parseInt(amount),
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
  }

  return (
    <main className="flex justify-center items-center h-screen bg-slate-100">
      <section className="bg-white p-12 rounded-lg shadow-md flex flex-col gap-20 w-2/4">
        <h2 className="text-black text-5xl font-bold text-center">
          Send Money
        </h2>
        <div className="text-left">
          <div className="flex items-center gap-5">
            <Avatar value={name[0].toUpperCase()} />
            <p className="text-3xl font-medium">{name}</p>
          </div>
          <div className="flex flex-col gap-3">
            <p className="font-medium">Amount (in Rs)</p>
            <input
              className="border-2 p-3 rounded-lg placeholder-slate-500"
              type="text"
              placeholder="Enter amount"
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
            />
            <button
              onClick={handleClick}
              className="w-full border-2 bg-slate-700 text-white py-2 rounded-lg text-lg"
            >
              Initiate Transfer
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
