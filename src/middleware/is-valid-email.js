/**
 * Check if email is valid
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
export const isValidEmail = (req, res, next) => {
  const email = req.body.email;
  if (!email || email.length < 1) {
    return res.status(400).send({ message: "An error has occurred" });
  }

  if (!email.includes('@')) {
    return res.status(400).send({ message: "An error has occurred" });
  }
  next();
}