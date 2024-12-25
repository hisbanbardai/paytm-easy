export default function SignUp() {
  return (
    <div>
      <div>
        <h2>Sign up</h2>
        <p>Enter your information to create an account</p>

        <label htmlFor="">First Name</label>
        <input type="text" placeholder="John" />
        <label htmlFor="">Last Name</label>
        <input type="text" placeholder="Doe" />
        <label htmlFor="">Email</label>
        <input type="text" placeholder="test@gmail.com" />
        <label htmlFor="">Password</label>
        <input type="text" placeholder="123456" />

        <button>Sign up</button>

        <p>Already have an account? Sign in</p>
      </div>
    </div>
  );
}
