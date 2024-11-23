const z = require("zod");

const signUpSchema = z.object({
  username: z.string().email({ message: "Please enter a valid email address" }),
  firstname: z.string(),
  lastname: z.string(),
  password: z
    .string()
    .min(6, { message: "Password must be 6 or more characters long" }),
});

module.exports = { signUpSchema };
