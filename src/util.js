import jsonwebtoken from "jsonwebtoken";

/**
 * 
 * @param {Object} user         User's data that is going to be use in the JWT
 * @param {string} user.id      User's id
 * @param {string} user.email   User's email
 * @returns {string}            A signed jwt
 */
export const getSignedToken = (user) => {
  return jsonwebtoken.sign(user, process.env.JWT_KEY);
}

export const decodeToken = (token) => {
  return jsonwebtoken.verify(token, process.env.JWT_KEY);
}