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

const getUserByUserId = async function (userId) {
  try {
    const query = `SELECT * from users where id = $1`;
    const values = [userId];

    return await client.query(query, values);
  } catch (error) {
    return {
      message: "An error occurred while fetching a user by user id",
      error: error,
    };
  }
};

const addUser = async function (firstName, lastName, username, password) {
  try {
    const query = `INSERT INTO users (firstname, lastname, username, password) VALUES($1, $2, $3, $4) RETURNING *`;
    const values = [firstName, lastName, username, password];

    const result = await client.query(query, values);

    return result;
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

const searchUser = async function (filter, loggedInUserId) {
  try {
    const values = [`%${filter}%`, loggedInUserId];
    const query = `SELECT id, firstname, lastname from users WHERE (firstname ILIKE $1 OR lastname ILIKE $1) AND id <> $2`;

    const result = await client.query(query, values);

    return { data: result.rows };
  } catch (error) {
    console.error(error.message);
    return { error: error.message };
  }
};

module.exports = {
  getUserByUsername,
  addUser,
  updateUser,
  searchUser,
  getUserByUserId,
};
