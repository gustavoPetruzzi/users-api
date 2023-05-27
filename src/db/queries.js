import pool from "./db.js";

/** 
 * User
 * @typedef {Object} User
 * @property {number} user_id
 * @property {string} username
 * @property {string} email
 * @property {string} password
*/


/**
 * Get an user by email
 *
 * @param {string} email user's email
 * @return {Promise<User>} A promise of a user 
 */
export const getUserByEmail = (email) => {
  return pool.query('SELECT * FROM users WHERE email = $1', [email])
    .then(results => {
      return results.rows[0];
    });
}

/**
 * Get an user by id
 * @param {string} id 
 * @returns {promise<User>} A promise of a user
 */
export const getUserById = (id) => {
  return pool.query('SELECT * FROM users WHERE user_id = $1', [id])
    .then(results => results.rows[0]);
}


/**
 * Create an user
 * @param {string} email 
 * @param {string} username
 * @param {string} password 
 * @returns {Promise<number>} new user's id
 */
export const createUser = (email, username, password) => {
  return pool.query('INSERT INTO users (email, username, password) VALUES ($1, $2, $3) RETURNING *', [email, username, password])
    .then(results => results.rows[0].user_id);
}

/**
 * Search a User by column and value
 * @param {string} value - the value that going to be use in the WHERE
 * @param {string} column - Database's column that going to be use in the WHERE 
 * @returns 
 */
export const checkIfUserExists = (value, column) => {
  return pool.query(`SELECT * from users WHERE ${column} = $1`, [value])
    .then(results => {
      return results.rowCount > 0;
    });
}

