const { getBalance, transferAmount } = require("../db/queries/account");
const { getUserByUserId } = require("../db/queries/user");
const authMiddleware = require("../middleware/authMiddleware");

const router = require("express").Router();

router.get("/balance", authMiddleware, async (req, res) => {
  const { userId } = req;

  const result = await getBalance(userId);

  if (result.rows.length === 1) {
    return res.status(200).json(result.rows[0]);
  }
});

router.post("/transfer", authMiddleware, async (req, res) => {
  const senderId = req.userId;
  const receiverId = req.body.to;
  const amount = req.body.amount;

  const result = await getUserByUserId(receiverId);

  if (result.rows.length === 1) {
    const result = await transferAmount(senderId, receiverId, amount);

    if (!result.error) {
      return res.status(200).json(result);
    }

    return res.status(400).json(result);
  }

  return res.status(400).json({
    message: "Invalid account",
  });
});

module.exports = router;
