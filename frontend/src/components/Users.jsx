import { useEffect, useState } from "react";
import Avatar from "./Avatar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const timerId = setTimeout(async () => {
      const response = await axios.get(
        `http://localhost:3000/api/v1/user/bulk?filter=${filter}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      setUsers(response.data.users);
    }, 300);

    return () => clearTimeout(timerId);
  }, [filter]);

  return (
    <section className="flex flex-col gap-3">
      <h2 className="font-bold text-2xl">Users</h2>
      <input
        className="border-2 p-2 text-lg rounded-lg"
        type="text"
        placeholder="Search users..."
        onChange={(e) => setFilter(e.target.value)}
      />
      <div>
        {users.map((user) => (
          <User user={user} key={user.id} />
        ))}
      </div>
    </section>
  );
}

function User({ user }) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-2 items-center font-medium text-xl mt-4">
        <Avatar value={user.firstname[0].toUpperCase()} />
        <p>{user.firstname}</p>
      </div>
      <button
        onClick={() => navigate(`/send?id=${user.id}&name=${user.firstname}`)}
        className="bg-slate-700 text-white p-3 px-4 rounded-lg"
      >
        Send Money
      </button>
    </div>
  );
}
