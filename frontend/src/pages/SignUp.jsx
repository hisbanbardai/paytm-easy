import BottomNote from "../components/BottomNote";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";

export default function SignUp() {
  return (
    <div>
      <div>
        <Heading label="Sign up" />
        <SubHeading label="Enter your information to create an account" />
        <InputBox label={"First Name"} placeholder={"John"} />
        <InputBox label={"Last Name"} placeholder={"Doe"} />
        <InputBox label={"Email"} placeholder={"john@gmail.com"} />
        <InputBox label={"Password"} placeholder={"123456"} />
        <Button label="Sign up" />
        <BottomNote label="Already have an account?" linkText="Sign in" />
      </div>
    </div>
  );
}
