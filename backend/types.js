const z = require("zod");

const signUpSchema = z.object({
  username: z.string().email({ message: "Please enter a valid email address" }),
  firstname: z.string(),
  lastname: z.string(),
  password: z
    .string()
    .min(6, { message: "Password must be 6 or more characters long" }),
});

const signInSchema = z.object({
  username: z.string().email(),
  password: z.string(),
});

const userUpdateSchema = z.object({
  firstname: z
    .string()
    .transform((val) => val.trim())
    .optional()
    .refine((val) => val !== "", { message: "Firstname cannot be empty" }),
  lastname: z
    .string()
    .transform((val) => val.trim())
    .optional()
    .refine((val) => val !== "", { message: "Lastname cannot be empty" }),
  password: z
    .string()
    .min(6, { message: "Password must be 6 or more characters long" })
    .transform((val) => val.trim())
    .optional()
    .refine((val) => val !== "", { message: "Password cannot be empty" }),
});
module.exports = { signUpSchema, signInSchema, userUpdateSchema };
