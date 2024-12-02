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

module.exports = { createAccount };
