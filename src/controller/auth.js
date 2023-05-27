import * as argon2 from 'argon2';

import { checkIfUserExists, createUser, getUserByEmail, getUserById } from "../db/queries.js";
import { decodeToken, getSignedToken } from '../util.js';

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

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await getUserByEmail(email);
    
    if (!user) {
      return res.status(400).send({
        message: "An error has occurred"
      });
    }
    const isCorrectPassword = await argon2.verify(
      user.password,
      password,
      { secret: Buffer.from(process.env.PEPPER) }
    );

    if (!isCorrectPassword) {
      return res.status(400).send({
        message: "An error has occurred"
      });
    }

    const signedToken = getSignedToken({id: user.user_id, email: user.email });
    res.cookie('x-session-token', signedToken, { httpOnly: true, maxAge: 3600000 })
    res.status(200).send({
      message: 'Login Success', 
      token: signedToken
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: 'An error has ocurred'
    });
  }
}

export const logout = async (req, res) => {
  res.clearCookie('x-session-token');
  res.status(200).send('Logout Success');
}

export const me = async (req, res) => {
  const token = req.cookies["x-session-token"];
  const decodedToken = decodeToken(token);
  const user = await getUserById(decodedToken.id);
  
  if (!user) {
    return res.status(400).send({
      error: "No user found"
    });
  }

  res.status(200).send({
    id: user.user_id,
    email: user.email,
    username: user.username
  });
}