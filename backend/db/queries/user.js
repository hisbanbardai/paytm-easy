const client = require("../../connection");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../../config");

const getUserByUsername = async function (username) {
  try {
    const query = `SELECT * from users WHERE username = $1`;
    const value = [username];

    return await client.query(query, value);
  } catch (error) {
    return {
      message: "An error occurred while fetching a user by username",
      error: error.message,
    };
  }
};

const addUser = async function (firstName, lastName, username, password) {
  try {
    const query = `INSERT INTO users (firstname, lastname, username, password) VALUES($1, $2, $3, $4) RETURNING *`;
    const values = [firstName, lastName, username, password];

    const result = await client.query(query, values);

    if (result.rows.length === 1) {
      const userId = result.rows[0].id;

      const token = jwt.sign({ userId: userId }, JWT_SECRET);
      return { token: token };
    }
    return { message: "Unable to add a user." };
  } catch (error) {
    return {
      message: "An error occurred while adding the user.",
      error: error.message,
    };
  }
};

const updateUser = async function (userObj) {
  let setClause = `SET `;
  const values = Object.values(userObj);
  let count = 1;

  for (const key of Object.keys(userObj).slice(
    0,
    Object.keys(userObj).length - 1
  )) {
    setClause += `${key} = $${count}, `;
    count += 1;
  }

  setClause = setClause.slice(0, setClause.length - 2);

  try {
    const query = `UPDATE USERS ${setClause} WHERE id = $${values.length} RETURNING *`;
    const result = await client.query(query, values);

    if (result.rows.length === 1) {
      return { message: "User updated successfully" };
    }

    return { error: "Error while updating information" };
  } catch (error) {
    console.error(error.message);
    return { error: error.message };
  }
};

module.exports = { getUserByUsername, addUser, updateUser };
