const { getBalance } = require("../db/queries/account");
const authMiddleware = require("../middleware/authMiddleware");

const router = require("express").Router();

router.get("/balance", authMiddleware, async (req, res) => {
  const { userId } = req;

  const result = await getBalance(userId);

  if (result.rows.length === 1) {
    return res.status(200).json(result.rows[0]);
  }
});

module.exports = router;
