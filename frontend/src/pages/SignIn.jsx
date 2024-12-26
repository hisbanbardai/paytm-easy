import { useState } from "react";
import BottomNote from "../components/BottomNote";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import axios from "axios";

export default function SignIn() {
  const [formData, setFormData] = useState({ username: "", password: "" });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await axios.post(
      "http://localhost:3000/api/v1/user/signin",
      {
        username: formData.username,
        password: formData.password,
      }
    );

    localStorage.setItem("token", response.data.token);
  }

  return (
    <main className="bg-slate-300 h-screen flex justify-center items-center">
      <section className="bg-white p-6 rounded-lg flex flex-col gap-6">
        <header className="flex flex-col justify-center items-center gap-5">
          <Heading label="Sign in" />
          <SubHeading label="Enter your credentials to access your account" />
        </header>
        <form className="flex flex-col gap-3 text-lg">
          <InputBox
            label={"Email"}
            placeholder={"john@gmail.com"}
            name={"username"}
            value={formData.username}
            onChange={handleChange}
          />
          <InputBox
            label={"Password"}
            placeholder={"123456"}
            name={"password"}
            value={formData.password}
            onChange={handleChange}
          />
          <div>
            <Button label="Sign In" onClick={handleSubmit} />
          </div>
        </form>
        <footer className="flex justify-center gap-1 text-lg text-slate-700">
          <BottomNote
            label="Don't have an account?"
            linkText="Sign Up"
            to="/signup"
          />
        </footer>
      </section>
    </main>
  );
}
