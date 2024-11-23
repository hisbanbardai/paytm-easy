const router = require("express").Router();
const { signUpSchema } = require("../types");
const { hashPassword } = require("../db/utils/passwordUtils");
const { getUserByUsername, addUser } = require("../db/queries/user");

router.post("/signup", async (req, res) => {
  try {
    const signUpPayload = req.body;
    const parsedPayload = signUpSchema.safeParse(signUpPayload);

    if (!parsedPayload.success) {
      return res
        .status(411)
        .json({ message: JSON.parse(parsedPayload.error.message) });
    }

    const { username, firstname, lastname, password } = req.body;

    let result = await getUserByUsername(username);

    if (result.rows.length > 0) {
      return res.status(409).json({
        message:
          "User already exists. Please use a different email or username.",
      });
    }

    const hashedPassword = hashPassword(password);

    result = await addUser(firstname, lastname, username, hashedPassword);

    if (result.message) {
      return res.status(400).json({ error: result.message });
    }

    return res
      .status(200)
      .json({ message: "User created successfully", token: result.token });
  } catch (error) {
    console.error("Error in user registration:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
