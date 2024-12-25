import BottomNote from "../components/BottomNote";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";

export default function SignIn() {
  return (
    <main className="bg-slate-300 h-screen flex justify-center items-center">
      <section className="bg-white p-6 rounded-lg flex flex-col gap-6">
        <header className="flex flex-col justify-center items-center gap-5">
          <Heading label="Sign in" />
          <SubHeading label="Enter your credentials to access your account" />
        </header>
        <form className="flex flex-col gap-3 text-lg">
          <InputBox label={"Email"} placeholder={"john@gmail.com"} />
          <InputBox label={"Password"} placeholder={"123456"} />
          <div>
            <Button label="Sign In" />
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
