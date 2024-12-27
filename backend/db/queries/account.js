const client = require("../../connection");

const createAccount = async function (userId) {
  try {
    const query = `INSERT INTO accounts (user_id, balance) VALUES($1, $2) RETURNING *`;
    const values = [userId, Math.floor(Math.random() * 10000) + 1];

    const result = await client.query(query, values);
    return result;
  } catch (error) {
    return {
      message: "An error occurred while adding the balance",
      error: error,
    };
  }
};

const getBalance = async function (userId) {
  try {
    const query = `SELECT balance FROM accounts WHERE user_id = $1`;
    const values = [userId];

    return await client.query(query, values);
  } catch (error) {
    return {
      message: "An error occurred while fetching the balance of this user",
      error: error,
    };
  }
};

const transferAmount = async function (senderId, receiverId, amount) {
  try {
    if (amount < 0 || amount === 0) {
      throw new Error("Amount cannot be zero or less than zero");
    }

    await client.query(`BEGIN`);

    const { rows } = await getBalance(senderId);

    const senderBalance = rows[0].balance;

    if (senderBalance < amount) {
      throw new Error("Insufficient funds");
    }

    await client.query(
      `UPDATE accounts SET balance = balance - $1 WHERE user_id = $2`,
      [amount, senderId]
    );

    await client.query(
      `UPDATE accounts SET balance = balance + $1 WHERE user_id = $2`,
      [amount, receiverId]
    );

    await client.query(`COMMIT`);

    return {
      message: "Transfer successful",
    };
  } catch (error) {
    await client.query(`ROLLBACK`);

    return {
      message: "Transaction failed due to an error",
      error: error.message,
    };
  }
};

module.exports = { createAccount, getBalance, transferAmount };
