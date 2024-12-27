import { useSearchParams } from "react-router-dom";
import Avatar from "../components/Avatar";
import axios from "axios";
import { useState } from "react";
import Error from "../components/Error";

export default function SendMoney() {
  const [searchParams] = useSearchParams();
  const [amount, setAmount] = useState(null);
  const [showError, setShowError] = useState(false);

  const id = searchParams.get("id");
  const name = searchParams.get("name");

  function handleClick() {
    if (amount === 0 || amount < 0) {
      setShowError(true);
      return;
    }

    axios.post(
      "http://localhost:3000/api/v1/account/transfer",
      {
        to: `${id}`,
        amount: amount,
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
              type="number"
              placeholder="Enter amount"
              onChange={(e) => {
                setShowError(false);
                setAmount(Number(e.target.value));
              }}
              value={amount}
            />
            <button
              onClick={handleClick}
              className="w-full border-2 bg-slate-700 text-white py-2 rounded-lg text-lg disabled:bg-slate-400"
              disabled={amount === 0 || amount < 0}
            >
              Initiate Transfer
            </button>
            {showError && (
              <Error>
                <p className="text-red-700 font-semibold">
                  Amount cannot be zero or less than zero
                </p>
              </Error>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
