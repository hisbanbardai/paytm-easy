import { useState } from "react";
import BottomNote from "../components/BottomNote";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import axios from "axios";

export default function SignUp() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleChangeFirstName(e) {
    setFirstName(e.target.value);
  }

  function handleChangeLastName(e) {
    setLastName(e.target.value);
  }

  function handleChangeUsername(e) {
    setUsername(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    axios.post("http://localhost:3000/api/v1/user/signup", {
      firstname,
      lastname,
      username,
      password,
    });
  }

  return (
    <main className="bg-slate-300 h-screen flex justify-center items-center">
      <section className="bg-white p-6 rounded-lg flex flex-col gap-6">
        <header className="flex flex-col justify-center items-center gap-5">
          <Heading label="Sign up" />
          <SubHeading label="Enter your information to create an account" />
        </header>
        <form className="flex flex-col gap-3 text-lg">
          <InputBox
            label={"First Name"}
            placeholder={"John"}
            name={"firstname"}
            value={firstname}
            onChange={handleChangeFirstName}
          />
          <InputBox
            label={"Last Name"}
            placeholder={"Doe"}
            name={"lastname"}
            value={lastname}
            onChange={handleChangeLastName}
          />
          <InputBox
            label={"Email"}
            placeholder={"john@gmail.com"}
            name={"username"}
            value={username}
            onChange={handleChangeUsername}
          />
          <InputBox
            label={"Password"}
            placeholder={"123456"}
            name={"password"}
            value={password}
            onChange={handleChangePassword}
          />
          <div>
            <Button label="Sign Up" onClick={handleSubmit} />
          </div>
        </form>
        <footer className="flex justify-center gap-1 text-lg text-slate-700">
          <BottomNote
            label="Already have an account?"
            linkText="Sign in"
            to="/signin"
          />
        </footer>
      </section>
    </main>
  );
}
