export default function Users() {
  return (
    <section>
      <h2>Users</h2>
      <input type="text" placeholder="Search users..." />
      <div>
        <User />
      </div>
    </section>
  );
}

function User() {
  return (
    <div>
      <span>H</span>
      <p>Hisban Shiraz</p>
      <button>Send Money</button>
    </div>
  );
}
