const router = require("express").Router();
const { signUpSchema, signInSchema, userUpdateSchema } = require("../types");
const { hashPassword, comparePassword } = require("../db/utils/passwordUtils");
const {
  getUserByUsername,
  addUser,
  updateUser,
  searchUser,
} = require("../db/queries/user");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");
const authMiddleware = require("../middleware/authMiddleware");

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

    const hashedPassword = await hashPassword(password);
    console.log(hashedPassword);

    result = await addUser(firstname, lastname, username, hashedPassword);
    console.log(result);

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

router.post("/signin", async (req, res) => {
  const signInPayload = req.body;

  const { success } = signInSchema.safeParse(signInPayload);

  if (!success) {
    return res.status(411).json({ message: "Invalid inputs" });
  }

  const { username, password } = req.body;

  const result = await getUserByUsername(username);

  if (result.rows.length === 0) {
    return res.status(411).json({
      message: "Incorrect username or password",
    });
  }

  const dbHashedPassword = result.rows[0].password;

  if (!(await comparePassword(password, dbHashedPassword))) {
    return res.status(411).json({ message: "Incorrect username or password" });
  }

  const token = jwt.sign({ userId: result.rows[0].id }, JWT_SECRET);

  return res.status(200).json({ token: token });
});

router.put("/", authMiddleware, async (req, res) => {
  const userUpdatePayload = req.body;

  if (Object.keys(userUpdatePayload).length === 0) {
    return res.status(411).json({ message: "There are no fields to update" });
  }

  let obj = userUpdateSchema.safeParse(userUpdatePayload);

  if (!obj.success) {
    return res.status(411).json({ message: obj.error.errors });
  }

  if (obj.data.password) {
    const hashedPassword = await hashPassword(obj.data.password);
    obj.data = { ...obj.data, password: hashedPassword };
  }

  const result = await updateUser({ ...obj.data, id: req.userId });

  if (result.message) {
    return res.status(200).json(result);
  }

  return res.status(411).json(result);
});

router.get("/bulk", authMiddleware, async (req, res) => {
  const filter = req.query.filter || "";
  const result = await searchUser(filter);

  if (result.data) {
    return res.status(200).json({ users: result.data });
  }

  return res.status(404).json(result);
});

module.exports = router;
