const router = require("express").Router();
const userRouter = require("./user");
const accountRouter = require("./account");
const authMiddleware = require("../middleware/authMiddleware");

router.use("/user", userRouter);
router.use("/account", accountRouter);

router.get("/auth/validate", authMiddleware, (req, res) => {
  if (req.userId) {
    return res.status(200).json({ message: "Token is valid" });
  }
});

module.exports = router;
