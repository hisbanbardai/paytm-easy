import Avatar from "../components/Avatar";
import Heading from "../components/Heading";

export default function SendMoney() {
  return (
    <main>
      <section>
        <Heading label={"Send Money"} />
        <div>
          <Avatar value={"A"} />
          <p>Friend's name</p>
          <p>Amount in Rs.</p>
          <input type="text" placeholder="Enter amount" />
          <button>Initiate Transfer</button>
        </div>
      </section>
    </main>
  );
}
