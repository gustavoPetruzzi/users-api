import * as argon2 from 'argon2';

import { checkIfUserExists, createUser } from "../db/queries.js";

export const signUp = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    const usernameExists = await checkIfUserExists(username, 'username');
    if (usernameExists) {
      return res.status(400).send({
        error: "Username already taken"
      });
    }

    const emailExists = await checkIfUserExists(email, 'email');

    if (emailExists) {
      return res.status(400).send({
        error: "Email already taken"
      });
    }

    const hashedPassword = await argon2.hash(password, { secret: Buffer.from(process.env.PEPPER)} );

    const newUserid = await createUser(email, username, hashedPassword);
    res.status(201).send({
      message: `User created with id ${newUserid}`
    })
  } catch(error) {
    console.log(error)
    res.status(500).send({
      error: "An error has occurred"
    });
  }
}